import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { addHelperAxes, screenSizeManager, createCamera } from './modules/helpers';
import { AxisGridHelper } from './modules/AxisGridHelper';

import './css/main.sass';

// import data from './data/PubChemElements_all.json';

function main() {
  // Create a renderer and append it to our document
  const renderer = new THREE.WebGLRenderer();
  document.body.append(renderer.domElement);
  const gui = new dat.GUI();

  const loader = new THREE.TextureLoader();
  // Create a perspective camera and move it back 20 units
  const camera = createCamera(75);
  camera.position.y = 0.5;
  camera.position.z = 2;

  // Allows us to use the mouse as well
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0); // Point where camera should look at
  controls.update();

  const scene = new THREE.Scene();

  // Add a floor plane
  const planeSize = 40;
  const floorTexture = loader.load('./src/resources/images/checker.png'); // The image is 2x2 pixels
  floorTexture.wrapS = THREE.RepeatWrapping; // repeat the texture in the S direction
  floorTexture.wrapT = THREE.RepeatWrapping; // repeat the texture in the T direction
  floorTexture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2; // Repeat the texture by half the number of the plane size in both directions. Since the texture is 2x2 pixels each Threejs unit will be one square on the floor!
  floorTexture.repeat.set(repeats, repeats);

  const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMaterial = new THREE.MeshPhongMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = -Math.PI / 2;
  scene.add(planeMesh);

  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 0.6);
  pointLight.position.set(-1, 3, 3);
  scene.add(pointLight);

  const globalLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(globalLight);

  // an array of objects who's rotation to update
  const objects = [];

  const sphereSamples = new THREE.Object3D();
  scene.add(sphereSamples);

  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const knot = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 100, 2, 3);

  const sphereMaterial = new THREE.MeshBasicMaterial();
  sphereMaterial.map = loader.load('./src/resources/images/station.jpeg');

  const sphereMaterialPBR = new THREE.MeshStandardMaterial();
  sphereMaterialPBR.color.set(0xfff000);
  sphereMaterialPBR.metalness = 0.1;
  sphereMaterialPBR.roughness = 0.8;

  const normalMaterial = new THREE.MeshNormalMaterial();
  const depthMaterial = new THREE.MeshDepthMaterial();

  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterialPBR);
  const knotMesh = new THREE.Mesh(knot, sphereMaterialPBR);

  knotMesh.position.y = 0.5;

  sphereSamples.add(knotMesh);

  var box = gui.addFolder('Torus knot');
  box.add(sphereMesh.scale, 'x', 0, 2).name('Radius').listen();

  function render(time: number) {
    time *= 0.001; // Convert milliseconds to seconds
    screenSizeManager(renderer, camera);

    knotMesh.rotation.y = time * 0.5;

    renderer.render(scene, camera);

    // Request the browser that we want to update something and a function to be called.
    // If there's a redraw call the scene updates "renderer.render".
    // time will be delta-time in milliseconds
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
