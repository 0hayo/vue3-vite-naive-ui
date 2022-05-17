import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Radar, Wall } from '../effect/index.js'
import { radarData, wallData } from '../data.js';
import TWEEN from '@tweenjs/tween.js'
import Shader from './shader'
// import store from '../../store';
import { useStore } from 'vuex';
const store = useStore();

export const width = 1920;
export const height = 1080;

export const cameraPosition = [0, 400, 600];
export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(55, width / height, 10, 20000);
  camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
  return camera;
}

export const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    // logarithmicDepthBuffer: true,
    // precision: 'highp'
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  return renderer;
}

export const cameraControls = [0, 0, 0];
export const createControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  //最大仰视角和俯视角
  controls.maxPolarAngle = Math.PI * 0.45;
  controls.minPolarAngle = 0;
  controls.target.set(cameraControls[0], cameraControls[1], cameraControls[2]);
  controls.minDistance = 50.0;
  controls.maxDistance = 800.0;
  controls.enablePan = false;
  //惯性滑动，滑动大小默认0.25
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  // controls.autoRotate = true;
  return controls;
}

export const createWater = () => {
  const waterGeometry = new THREE.PlaneGeometry(20000, 20000);
  const water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('/assets/waternormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x112E3B,
      distortionScale: 1,
      fog: false
    }
  );
  water.rotation.x = - Math.PI / 2;
  return water;
}

// 地图
export const mapLoader = (): any => {
  return new Promise((resovle, reject) => {
    var loader = new GLTFLoader();
    loader.load('/assets/moxing.gltf', (obj) => {
      // obj.scene.scale.set(0.1,0.1,0.1);//网格模型缩放
      // obj.children[0].geometry.center();//网格模型的几何体居中
      // obj.children[0].material.color.set(0xffffff);//设置材质颜色
      // obj.scene.traverse(function (child) {
      //   if (child['isMesh']) {
      //     // child.frustumCulled = false;
      //     // child.castShadow = true;
      //     child['material'].emissive = child['material'].color;
      //     child['material'].emissiveMap = child['material'].map;
      //   }
      // });
      obj.scene.position.y = 15;
      resovle(obj.scene);
    })
  })
}

// 雷达
export const radarLoader = ([x, y, z]): any => {
  return new Promise((resovle, reject) => {
    var loader = new GLTFLoader();
    loader.load('/assets/radar.gltf', (obj) => {
      obj.scene.scale.set(0.1,0.1,0.1);//网格模型缩放
      obj.scene.position.set(x, y, z)
      // obj.scene.position.set(40, 20, 30)
      resovle(obj.scene);
    })
  })
}

// 声纳
export const sonarLoader = ([x, y, z]): any => {
  return new Promise((resovle, reject) => {
    var loader = new GLTFLoader();
    loader.load('/assets/sonar.gltf', (obj) => {
      obj.scene.scale.set(0.1,0.1,0.1);//网格模型缩放
      obj.scene.position.set(x, y, z)
      resovle(obj.scene);
    })
  })
}

export const createWall = () => {
  const wallGroup = new THREE.Group();
  wallData.forEach(item => {
    const mesh = Wall(item);
    wallGroup.add(mesh);
  })
  return wallGroup;
}

export const createRadar = () => {
  const radarGroup = new THREE.Group();
  radarData.forEach(item => {
    const mesh = Radar(item);
    radarGroup.add(mesh);
  })
  return radarGroup;
}

export const createBox = () => {
  const boxData = store.getters.boxData;
  const group = new THREE.Group();
  boxData.forEach(item => {
    const mesh = createBoxGeometry(item);
    group.name = 'box';
    group.add(mesh);
  })
  return group;
}
export const createBoxGeometry = (item) => {
  const geometry = new THREE.BoxGeometry(item.x, item.y, item.z);
  const material = new THREE.MeshStandardMaterial({ roughness: 0 });
  const mesh = new THREE.Mesh(geometry, material);
  const position = item.position;
  mesh.position.set(position.x, position.y, position.z);
  mesh['cameraPos'] = item.cameraPos;
  mesh['controlsPos'] = item.controlsPos;
  mesh['callback'] = () => {
    alert('你点击了这个盒子!');
  };
  mesh['time'] = item.time;
  mesh.name = item.name;
  return mesh;
}

// current1 相机当前的位置
// target1 相机的目标位置
// current2 当前的controls的target
// target2 新的controls的target
export let twFlag = true;
export const animateCamera = (camera, target1, controls, target2, obj) => {
  if (!twFlag) return;
  twFlag = false;
  const current1 = camera.position;
  const current2 = controls.target;
  var tween = new TWEEN.Tween({
    x1: current1.x, // 相机当前位置x
    y1: current1.y, // 相机当前位置y
    z1: current1.z, // 相机当前位置z
    x2: current2.x, // 控制当前的中心点x
    y2: current2.y, // 控制当前的中心点y
    z2: current2.z // 控制当前的中心点z
  });
  tween.to({
    x1: target1.x, // 新的相机位置x
    y1: target1.y, // 新的相机位置y
    z1: target1.z, // 新的相机位置z
    x2: target2.x, // 新的控制中心点位置x
    y2: target2.y, // 新的控制中心点位置x
    z2: target2.z // 新的控制中心点位置x
  }, obj.time);
  tween.onUpdate(function (obj) {
    camera.position.x = obj.x1;
    camera.position.y = obj.y1;
    camera.position.z = obj.z1;
    controls.target.x = obj.x2;
    controls.target.y = obj.y2;
    controls.target.z = obj.z2;
    controls.update();
  })
  tween.easing(TWEEN.Easing.Cubic.InOut);
  tween.start();
  tween.onComplete(() => {
    obj.callback && obj.callback();
    twFlag = true;
  })
}

// 获取到包围的线条
function surroundLineGeometry(object) {
  return new THREE.EdgesGeometry(object.geometry);
}
/**
     * 创建包围线条材质
     */
function createSurroundLineMaterial({
  max,
  min,
  size, time, uStartTime
}) {
  // if (this.surroundLineMaterial) return surroundLineMaterial;
  let surroundLineMaterial;

  surroundLineMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uColor: {
        value: new THREE.Color("#4C8BF5")
      },
      uActive: {
        value: new THREE.Color("#fff")
      },
      time: time,
      uOpacity: {
        value: 0.6
      },
      uMax: {
        value: max,
      },
      uMin: {
        value: min,
      },
      uRange: {
        value: 200
      },
      uSpeed: {
        value: 0.2
      },
      uStartTime: uStartTime
    },
    vertexShader: Shader.surroundLine.vertexShader,
    fragmentShader: Shader.surroundLine.fragmentShader
  });

  return surroundLineMaterial;
}
// Line
/**
 * 获取包围线条效果
 */
export const surroundLine = (object, time, uStartTime) => {
  // 获取线条geometry
  const geometry = surroundLineGeometry(object);
  // 获取物体的世界坐标 旋转等
  const worldPosition = new THREE.Vector3();
  object.getWorldPosition(worldPosition);

  // 传递给shader重要参数
  const {
    max,
    min
  } = object.geometry.boundingBox;

  const size = new THREE.Vector3(
    max.x - min.x,
    max.y - min.y,
    max.z - min.z
  );

  // this.effectGroup.add();
  const material = createSurroundLineMaterial({
    max,
    min,
    size, time, uStartTime
  });

  const line = new THREE.LineSegments(geometry, material);

  line.name = 'surroundLine';

  line.scale.copy(object.scale);
  line.rotation.copy(object.rotation);
  line.position.copy(worldPosition);

  // this.effectGroup.add(line);
  return line;
}

export function tree(position) {
  /**
   * 精灵创建树林效果
   */
  // 加载树纹理贴图
  const textureTree = new THREE.TextureLoader().load("model/tree.png");
  // 创建表示一个树的精灵模型
  const spriteMaterial = new THREE.SpriteMaterial({
    map: textureTree,//设置精灵纹理贴图
  });
  // 创建精灵模型对象
  const sprite = new THREE.Sprite(spriteMaterial);
  // 控制精灵大小,
  // this.sprite.scale.set(10, 10, 1); //// 只需要设置x、y两个分量就可以
  // 设置精灵模型位置，在xoz平面上随机分布
  sprite.position.set(position.x, position.y, position.z)
  return sprite;
}