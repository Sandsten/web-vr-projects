import * as THREE from 'three';

function main() {
  // Create a renderer and append it to our document
  const renderer = new THREE.WebGLRenderer();
  document.body.append(renderer.domElement);

  // Create a perspective camera and move it back 2 units
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  // Create a cube and add it to the scene
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  renderer.render(scene, camera);
}
main();
console.log('HELLO');

//   import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// document.body.appendChild(VRButton.createButton(renderer));
