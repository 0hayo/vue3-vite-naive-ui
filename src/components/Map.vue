<template>
  <div>
    <div id='scene'></div>
    <div class='backControl' @click="backControl">返回视角</div>
    <div class='backControl' @click="logout">登录</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, watch } from 'vue';
import * as THREE from 'three';
import { useStore } from 'vuex';
import { createRenderer, createCamera, createWater, mapLoader, createControls, animateCamera, cameraPosition, cameraControls, createBoxGeometry, width, height } from '@/map/utils/auth';
import { Sky } from 'three/examples/jsm/objects/Sky';
import TWEEN from '@tweenjs/tween.js';
import { Radar, Wall } from '@/map/effect/index.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import * as dat from 'dat.gui';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'map',
  setup() {
    const router = useRouter()
    const store = useStore();
    const scene = new THREE.Scene();
    const camera = createCamera();
    const renderer = createRenderer();
    const controls = createControls(camera, renderer);
    const water = createWater();
    const sun = new THREE.Vector3();
    const stats = Stats();
    const transformControl = new TransformControls( camera, renderer.domElement );
    // const gui = new dat.GUI();

    const boxGroup = new THREE.Group();
    const boxData = store.getters.boxData;
    watch(
      boxData,
      () => {
        boxGroup.traverse(item => {
          disposeChild(item);
        });
        groupAdd(boxData, boxGroup, createBoxGeometry);
      }
    )

    const wallGroup = new THREE.Group();
    const wallData = store.getters.wallData;
    watch(
      wallData,
      () => {
        wallGroup.traverse(item => {
          disposeChild(item);
        });
        groupAdd(wallData, wallGroup, Wall);
      }
    )

    const radarGroup = new THREE.Group();
    const radarData = store.getters.radarData;
    watch(
      radarData,
      () => {
        radarGroup.traverse(item => {
          disposeChild(item);
        });
        groupAdd(radarData, radarGroup, Radar);
      }
    )

    onMounted(() => {
      init();
      groupAdd(boxData, boxGroup, createBoxGeometry);
      groupAdd(wallData, wallGroup, Wall);
      groupAdd(radarData, radarGroup, Radar);
      setTimeout(() => {
        store.dispatch('addBox');
      }, 1000);
    })

    const disposeChild = (mesh) => {
      if (mesh instanceof THREE.Mesh) {
        if (mesh.geometry?.dispose) {
          mesh.geometry.dispose(); //删除几何体
        }
        if (mesh.material?.dispose) {
          mesh.material.dispose(); //删除材质
        }
        if (mesh.material?.texture?.dispose) {
          mesh.material.texture.dispose();
        }
      }
      if (mesh instanceof THREE.Group) {
        mesh.clear();
      }
      if (mesh instanceof THREE.Object3D) {
        mesh.clear();
      }
    }

    const groupAdd = (dada, group, cb) => {
      dada.forEach(item => {
        const mesh = cb(item);
        // group.name = 'box';
        group.add(mesh)
      })
    }

    const init = () => {
      //  初始化
      // THREE.Cache.clear();
      // scene.clear();
      // renderer.dispose();
      // renderer.forceContextLoss();
      // scene.traverse(item => {
      //   disposeChild(item);
      // });

      const container = document.getElementById('scene') as HTMLElement;
      container.appendChild(renderer.domElement);
      // Skybox
      const sky = new Sky();
      sky.scale.setScalar(20000);
      scene.add(sky);

      const skyUniforms = sky.material.uniforms;
      skyUniforms['turbidity'].value = 10;
      skyUniforms['rayleigh'].value = 2;                                                                                        
      skyUniforms['mieCoefficient'].value = 0.005;
      skyUniforms['mieDirectionalG'].value = 0.8;
      const parameters = {
        elevation: 5,
        azimuth: 180,
				exportSpline: exportSpline
      };
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      function updateSun() {
        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);
        sun.setFromSphericalCoords(1, phi, theta);
        sky.material.uniforms['sunPosition'].value.copy(sun);
        water.material.uniforms['sunDirection'].value.copy(sun).normalize();
        scene.environment = pmremGenerator.fromScene(sky as any).texture;
      }
      updateSun();

      controls.update();
      controls.addEventListener( 'change', render );
      transformControl.addEventListener( 'change', render );
      transformControl.addEventListener( 'dragging-changed', function ( event ) {

        controls.enabled = ! event.value;

      } );
      scene.add( transformControl );

      // Water
      scene.add(water);

      mapLoader().then((mesh) => {
        scene.add(mesh);
      })

      // box
      scene.add(boxGroup);

      scene.add(wallGroup);

      scene.add(radarGroup);

      //点光源
      var point = new THREE.PointLight(0xadadad);
      point.position.set(0, 100, 1000); //点光源位置
      // 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
      scene.add(point); //点光源添加到场景中
      //  环境光
      const light = new THREE.AmbientLight(0xadadad); // soft white light
      scene.add(light);
      // 平行光
      // const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      // directionalLight.position.set(0, 100, 100);
      // scene.add(directionalLight);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      window.addEventListener("click", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(boxGroup.children, true);
        if (intersects.length > 0) {
          var obj = intersects[0].object;
          
          transformControl.attach(obj);

          obj['material'].color.set("#ff0000");
          obj['material'].needsUpdate = true;

          var pos = new THREE.Vector3(obj['cameraPos'].x, obj['cameraPos'].y, obj['cameraPos'].z);
          var pos2 = new THREE.Vector3(obj['controlsPos'].x, obj['controlsPos'].y, obj['controlsPos'].z);
          animateCamera(camera, pos, controls, pos2, obj);
        }
        render();
      })

      // GUI

      // const folderSky = gui.addFolder('Sky');
      // folderSky.add(parameters, 'elevation', 0, 90, 0.1).onChange(updateSun);
      // folderSky.add(parameters, 'azimuth', - 180, 180, 0.1).onChange(updateSun);
      // // folderSky.open();

      // const waterUniforms = water.material.uniforms;

      // const folderWater = gui.addFolder('Water');
      // folderWater.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
      // folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');
      // folderWater.open();
      // gui.add( parameters, 'exportSpline' );
      // gui.open();

      const material = new THREE.LineBasicMaterial({color:'#fff'})
      //这里用这个构造
      const geometry = new THREE.BufferGeometry()
      let pointArr = [
        new THREE.Vector3(350, 20, 90),
        new THREE.Vector3(390, 40, 40),
        new THREE.Vector3(300, 10, 0),
        new THREE.Vector3(320, 60, 0),
        new THREE.Vector3(370, 10, 80)
      ];
      const pointsArray = new THREE.CatmullRomCurve3(pointArr);
      //用这个api传入顶点数组
      var points = pointsArray.getPoints(pointArr.length*10);
      geometry.setFromPoints(points)
      //下述基本一样
      const mesh = new THREE.Line(geometry,material)
      scene.add(mesh)
      // let i = 1;
      // setInterval(() => {
      //   pointArr.push(new THREE.Vector3(370+i*(Math.random() * 10 -5), 10, 80+i*(Math.random() * 10 -5)))
      //   mesh.geometry.setFromPoints(new THREE.CatmullRomCurve3([...pointArr]).getPoints(pointArr.length*100))
      // }, 1000);

      // 动画帧数显示
      stats.setMode(0);
      container.appendChild(stats.dom);

      window.addEventListener('resize', onWindowResize);
      animate();
    }

    const animate = () => {
      TWEEN.update()
      requestAnimationFrame(animate);
      render();
      stats.update();
    }

    const render = () => {
      radarGroup.children.forEach(radar => {
        radar['material'].uniforms['time'].value += 0.5 / 60.0;
      })
      wallGroup.children.forEach(wall => {
        wall['material'].uniforms['time'].value += 0.5 / 60.0;
      })

      water.material.uniforms['time'].value += 0.5 / 60.0;
      renderer.render(scene, camera);
    }

    const onWindowResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    const exportSpline = () => {

      const strplace: Array<string> = [];

      for ( let i = 0; i < boxGroup.children.length; i ++ ) {

        const p = boxGroup.children[ i ].position;
        strplace.push( `new THREE.Vector3(${p.x}, ${p.y}, ${p.z})` );

      }

      console.log( strplace.join( ',\n' ) );
      // const code = '[' + ( strplace.join( ',\n\t' ) ) + ']';
      // prompt( 'copy and paste code', code );

    }

    const backControl = () => {
      var pos = new THREE.Vector3(...cameraPosition);
      var pos2 = new THREE.Vector3(...cameraControls);
      animateCamera(camera, pos, controls, pos2, { time: 2000 });
    }

    const logout = () => {
      store.dispatch('logout');
    }

    onBeforeUnmount(() => {
      // gui.destroy();
      THREE.Cache.clear();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      scene.traverse(item => {
        disposeChild(item);
      });
    })

    return { backControl, logout };
  }
})
</script>

<style scoped>
.backControl {
  position: fixed;
  left: 150px;
  top: 50px;
}
#scene {
	position: absolute;
	left: 0;
	top: 0;
  width: 1920px;
  height: 1080px;
}
</style>
