import * as THREE from 'three';

function makeCubeInstance(scene, geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

function addHelperAxes(node) {
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  node.add(axes);
}

function createCamera(fov) {
  const aspect = 2;
  const near = 0.1;
  const far = 20;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  return camera;
}

/**
 * Updates the canvas resolution and aspect ratio based on browser window size
 * @param {Three.js renderer} renderer
 * @param {Three.js camera} camera
 */
function screenSizeManager(renderer, camera) {
  // Get the canvas from our renderer, which is what everything is drawn on
  const canvas = renderer.domElement;
  // Get the browser widht and height
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  // See if the resolution of our canvas matches our browser widht and height
  // They won't match if we resize the browser! Then we simply update the renderer to avoid blurryness
  if (canvas.width !== width || canvas.height !== height) {
    // false in the end prevents setSize from updating the html css style!
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Has to be called if camera parameters have been changed
    camera.updateProjectionMatrix();
  }
}

export { makeCubeInstance, addHelperAxes, screenSizeManager, createCamera };
