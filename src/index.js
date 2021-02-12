import * as THREE from 'three';

function main() {
  const renderer = new THREE.WebGLRenderer();

  console.log(renderer.domElement);

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 2;
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
