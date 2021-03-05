import * as THREE from 'three';
import * as dat from 'dat.gui';

import { addHelperAxes, screenSizeManager, createCamera } from './modules/helpers';
import { AxisGridHelper } from './modules/AxisGridHelper';

import './css/main.sass';

import data from './data/PubChemElements_all.json';

function main() {
  // Create a renderer and append it to our document
  const renderer = new THREE.WebGLRenderer();
  document.body.append(renderer.domElement);
  // const gui = new dat.GUI();

  // Create a perspective camera and move it back 20 units
  const camera = createCamera(75);
  camera.position.z = 20;
  camera.position.x = 15;

  const scene = new THREE.Scene();

  const pointLight = new THREE.PointLight(0xffffff, 1);
  scene.add(pointLight);

  // an array of objects who's rotation to update
  const objects = [];

  const columns = data.Table.Columns.Column;
  columns.forEach((column, i) => {
    console.log(`${i} : ${column}`);
  });

  const elementBox = new THREE.BoxGeometry(1, 1, 0.1);
  const elementMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xffffff });

  const elements = data.Table.Row;
  elements.forEach((element, i) => {
    element = element.Cell;

    // Place cubes in a grid like manner
    const mesh = new THREE.Mesh(elementBox, elementMaterial);

    // Add a bit of margin
    const margin = 1.6;
    const x = (i % 20) * margin;
    const y = -Math.floor(i / 20) * margin + 5;

    mesh.position.set(x, y, 0);
    scene.add(mesh);
  });

  const sphereSamples = new THREE.Object3D();
  scene.add(sphereSamples);

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
  }

  function render(time) {
    time *= 0.001; // Convert milliseconds to seconds
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
