<template>
  <div>
    <div id="scene"></div>
    <!-- <div class="backControl" @click="backControl">返回视角</div>
    <div class="backControl" @click="logout">{{ dtList.length }}</div> -->
    <div class="backControl" :class="imgLeft">
      <img :ref="setImgRef" src="../assets/zhizhen.png" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onBeforeUnmount,
  onMounted,
  watch,
  inject,
  Ref,
} from 'vue';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { useStore } from 'vuex';
import {
  createRenderer,
  createCamera,
  createWater,
  mapLoader,
  createControls,
  animateCamera,
  cameraPosition,
  cameraControls,
  createBoxGeometry,
  width,
  height,
  radarLoader,
  sonarLoader,
} from '@/map/utils/auth';
import { Sky } from 'three/examples/jsm/objects/Sky';
import TWEEN from '@tweenjs/tween.js';
import { Radar, Wall } from '@/map/effect/index.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import * as dat from 'dat.gui';

const imgRef = ref();
const setImgRef = (el) => {
  imgRef.value = el;
};
const fullScreen = inject('fullScreen') as Ref<boolean>;
watch(fullScreen, (v: boolean) => {
  imgLeft.value = v ? 'img-left' : '';
})
const imgLeft = ref('');

let selectModal: any = null;
const store = useStore();
const scene = new THREE.Scene();
const camera = createCamera();
const renderer = createRenderer();
const controls = createControls(camera, renderer);
const water = createWater();
const sun = new THREE.Vector3();
const stats = Stats();
const transformControl = new TransformControls(camera, renderer.domElement);
// const gui = new dat.GUI();

const dtList = computed(() => store.getters.dtList);
const sonarList = computed(() => store.getters.sonarList);
const radarList = computed(() => store.getters.radarList);
console.log(dtList.value);

const wallGroup = new THREE.Group();
const sonarGroup = new THREE.Group();
const radarGroup = new THREE.Group();
watch(radarList, (data: Array<any>) => {
  radarList.value.forEach((v) => {
    const position = v.coordinate.split(',');
    radarLoader(position).then((mesh) => {
      mesh.name = 'radar';
      radarGroup.add(mesh);
    });
  });
});
watch(dtList, (data: Array<any>) => {
  if (wallGroup.children.length > 0) {
    wallGroup.children.forEach((item) => {
      const eq = data.filter(v => v.id === item['eqId']);
      if (eq[0].status !== item['status']) {
        item['status'] = eq[0].status;
        item['material'].uniforms.u_color.value = new THREE.Color(eq[0].status === 0 ? '#efad35' : '#ff0000');
        var pos = new THREE.Vector3(item['cameraPos'].x, item['cameraPos'].y, item['cameraPos'].z);
        var pos2 = new THREE.Vector3(item['controlsPos'].x, item['controlsPos'].y, item['controlsPos'].z);
        animateCamera(camera, pos, controls, pos2, item);
      }
    });
    return;
  }
  dtList.value.forEach((v) => {
    const position = v.coordinate.split(',');
    const mesh = Wall({
      position: {
        x: position[0],
        y: position[1],
        z: position[2]
      },
      speed: 0.5,
      color: v.status === 0 ? '#efad35' : '#ff0000',
      opacity: 0.6,
      radius: 10,
      height: 5,
      renderOrder: 5
    });
    mesh.eqId = v.id;
    mesh.status = v.status;
    mesh['cameraPos'] = {
      x: 0,
      y: 400,
      z: 600,
    };
    mesh['controlsPos'] = {
      x: position[0],
      y: position[1],
      z: position[2],
    };
    wallGroup.add(mesh);
  });
});
watch(sonarList, (data: Array<any>) => {
  if (sonarGroup.children.length > 0) {
    sonarGroup.children.forEach((item) => {
      const eq = data.filter(v => v.id === item['eqId'])
      if (eq[0].status !== item['status']) {
        item['status'] = eq[0].status;
        item['material'].uniforms.u_color.value = new THREE.Color(eq[0].status === 0 ? '#efad35' : '#ff0000');
        var pos = new THREE.Vector3(item['cameraPos'].x, item['cameraPos'].y, item['cameraPos'].z);
        var pos2 = new THREE.Vector3(item['controlsPos'].x, item['controlsPos'].y, item['controlsPos'].z);
        animateCamera(camera, pos, controls, pos2, item);
      }
    });
    return;
  }
  sonarList.value.forEach((v) => {
    const position = v.coordinate.split(',');
    sonarLoader(position).then((mesh) => {
      scene.add(mesh);
    });
    const mesh = Radar({
      position: {
        x: position[0],
        y: position[1],
        z: position[2],
      },
      color: v.status === 0 ? '#efad35' : '#ff0000',
    });
    mesh.eqId = v.id;
    mesh.status = v.status;
    mesh['cameraPos'] = {
      x: 0,
      y: 400,
      z: 600,
    };
    mesh['controlsPos'] = {
      x: position[0],
      y: position[1],
      z: position[2],
    };
    sonarGroup.add(mesh);
  });
});

const boxGroup = new THREE.Group();
const boxData = store.getters.boxData;
watch(boxData, () => {
  boxGroup.traverse((item) => {
    disposeChild(item);
  });
  groupAdd(boxData, boxGroup, createBoxGeometry);
});

onMounted(() => {
  init();
  // groupAdd(boxData, boxGroup, createBoxGeometry);
  // groupAdd(wallData, wallGroup, Wall);
  // groupAdd(radarData, sonarGroup, Radar);
  // setTimeout(() => {
  //   store.dispatch('addBox');
  // }, 1000);
});

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
};

const groupAdd = (dada, group, cb) => {
  dada.forEach((item) => {
    const mesh = cb(item);
    // group.name = 'box';
    group.add(mesh);
  });
};

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
    exportSpline: exportSpline,
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
  controls.addEventListener('change', render);
  transformControl.addEventListener('change', render);
  transformControl.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value;
  });
  scene.add(transformControl);

  // Water
  scene.add(water);

  mapLoader().then((mesh) => {
    scene.add(mesh);
  });

  // box
  // scene.add(boxGroup);

  scene.add(wallGroup);
  scene.add(sonarGroup);
  scene.add(radarGroup);

  //点光源
  var point = new THREE.PointLight(0xffffff);
  point.position.set(0, 100, 100); //点光源位置
  // 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
  scene.add(point); //点光源添加到场景中
  //  环境光
  const light = new THREE.AmbientLight(0xadadad); // soft white light
  scene.add(light);
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(0, 100, 100);
  scene.add(directionalLight);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // const radar = scene.children.filter(v => v.name === 'radar')
    const list = [...boxGroup.children];
    var intersects = raycaster.intersectObjects(list, true);
    if (intersects.length > 0) {
      var obj = intersects[0].object;
      selectModal = intersects[0].object;
      transformControl.attach(obj);

      obj['material'].color.set('#ff0000');
      obj['material'].needsUpdate = true;

      // var pos = new THREE.Vector3(obj['cameraPos'].x, obj['cameraPos'].y, obj['cameraPos'].z);
      // var pos2 = new THREE.Vector3(obj['controlsPos'].x, obj['controlsPos'].y, obj['controlsPos'].z);
      // animateCamera(camera, pos, controls, pos2, obj);
    }
    render();
  });

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
  // gui.add(parameters, 'exportSpline');
  // gui.open();

  // const material = new THREE.LineBasicMaterial({color:'#fff'})
  // //这里用这个构造
  // const geometry = new THREE.BufferGeometry()
  // let pointArr = [
  //   new THREE.Vector3(150, 3, 0),
  //   new THREE.Vector3(190, 3, 10),
  //   new THREE.Vector3(100, 3, 30),
  //   new THREE.Vector3(120, 3, 20),
  //   new THREE.Vector3(170, 3, 50)
  // ];
  // const pointsArray = new THREE.CatmullRomCurve3(pointArr);
  // //用这个api传入顶点数组
  // var points = pointsArray.getPoints(pointArr.length*10);
  // geometry.setFromPoints(points)
  // //下述基本一样
  // const mesh = new THREE.Line(geometry,material)
  // scene.add(mesh)
  // let i = 1;
  // setInterval(() => {
  //   pointArr.push(new THREE.Vector3(170+i*(Math.random() * 30), 3, 80+i*(Math.random() * 50 -5)))
  //   mesh.geometry.setFromPoints(new THREE.CatmullRomCurve3([...pointArr]).getPoints(pointArr.length*100))
  // }, 1000);

  // 动画帧数显示
  stats.setMode(0);
  container.appendChild(stats.dom);

  window.addEventListener('resize', onWindowResize);
  animate();
};

const animate = () => {
  TWEEN.update();
  requestAnimationFrame(animate);
  render();
  stats.update();
};

const render = () => {

  var dir = new THREE.Vector3(-camera.position.x, 0, -camera.position.z).normalize();
  var theta = Math.atan2(-dir.x, -dir.z);
  if (imgRef.value) imgRef.value.style.transform = `rotate(${MathUtils.radToDeg(theta)}deg)`;

  sonarGroup.children.forEach((sonar) => {
    sonar['material'].uniforms['time'].value += 0.5 / 60.0;
  });
  wallGroup.children.forEach((wall) => {
    wall['material'].uniforms['time'].value += 0.5 / 60.0;
  });
  radarGroup.children.forEach((radar) => {
    radar.children.forEach((r) => {
      r.children.forEach((s) => {
        s.children.forEach((a) => {
          a.rotation.y -= 0.005;
        });
      });
    });
  });

  water.material.uniforms['time'].value += 0.5 / 60.0;
  renderer.render(scene, camera);
};

const onWindowResize = () => {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};
const exportSpline = () => {
  const strplace: Array<string> = [];

  // for ( let i = 0; i < boxGroup.children.length; i ++ ) {

  //   const p = boxGroup.children[ i ].position;
  //   strplace.push( `new THREE.Vector3(${p.x}, ${p.y}, ${p.z})` );

  // }

  const p = selectModal.position;
  strplace.push(`new THREE.Vector3(${p.x}, ${p.y}, ${p.z})`);

  console.log(strplace.join(',\n'));
};

const backControl = () => {
  var pos = new THREE.Vector3(...cameraPosition);
  var pos2 = new THREE.Vector3(...cameraControls);
  animateCamera(camera, pos, controls, pos2, { time: 2000 });
};

const logout = () => {
  store.dispatch('logout');
};

onBeforeUnmount(() => {
  // gui.destroy();
  THREE.Cache.clear();
  scene.clear();
  renderer.dispose();
  renderer.forceContextLoss();
  scene.traverse((item) => {
    disposeChild(item);
  });
});
</script>

<style scoped lang="scss">
.backControl {
  width: 108px;
  height: 108px;
  position: fixed;
  left: 420px;
  top: 75px;
  z-index: 9;
  background: url("../assets/znz.png") no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s left ease;
  transform: scale(0.8);
}

.img-left {
  left: 0px;
}

#scene {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920px;
  height: 1080px;
}
</style>
