import * as THREE from 'three';
import * as dat from 'dat.gui';

import { addHelperAxes, screenSizeManager } from './modules/helpers';
import { AxisGridHelper } from './modules/AxisGridHelper';

import './css/main.sass';

function main() {
  // Create a renderer and append it to our document
  const renderer = new THREE.WebGLRenderer();
  document.body.append(renderer.domElement);
  const gui = new dat.GUI();

  // Create a perspective camera and move it back 2 units
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 500;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 20;

  const scene = new THREE.Scene();

  const pointLight = new THREE.PointLight(0xffffff, 1);
  scene.add(pointLight);

  // an array of objects who's rotation to update
  const objects = [];

  // 3d object without material or geometry.
  // Using this as local space!
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  // General sphere mesh which we can reuse
  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 3;
  const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);

  const earthMaterial = new THREE.MeshPhongMaterial({ emissive: 0x112244, color: 0x2233ff });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);

  const moonMaterial = new THREE.MeshPhongMaterial({ emissive: 0x112244, color: 0x2233ff });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  // Add local coordinate helper visuals
  objects.forEach(addHelperAxes);

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
  }
  makeAxisGrid(solarSystem, 'solarSystem', 25);
  makeAxisGrid(sunMesh, 'sunMesh');
  makeAxisGrid(earthOrbit, 'earthOrbit');
  makeAxisGrid(earthMesh, 'earthMesh');
  makeAxisGrid(moonOrbit, 'moonOrbit');
  makeAxisGrid(moonMesh, 'moonMesh');

  function render(time) {
    time *= 0.001; // Convert milliseconds to seconds
    const speed = 0.5;

    objects.forEach((cube, i) => {
      // The rotation is in radians
      cube.rotation.z = time * speed;
    });

    screenSizeManager(renderer, camera);

    renderer.render(scene, camera);

    // Request the browser that we want to update something and a function to be called.
    // If there's a redraw call the scene updates "renderer.render".
    // time will be delta-time in milliseconds
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();

//   import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// document.body.appendChild(VRButton.createButton(renderer));

// // Create a cube and add it to the scene
// const boxWidth = 1;
// const boxHeight = 1;
// const boxDepth = 1;
// const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// const cubes = [
//   makeCubeInstance(scene, geometry, 0xaa3500, -2),
//   makeCubeInstance(scene, geometry, 0x44ff33, 0),
//   makeCubeInstance(scene, geometry, 0xff1133, 2),
// ];

// // Add a light
// const color = 0xffffff;
// const intensity = 1;
// const light = new THREE.DirectionalLight(color, intensity);
// light.position.set(-1, 2, 4);
// scene.add(light);
