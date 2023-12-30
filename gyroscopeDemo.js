import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"; // Import the GLTFLoader

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//we need to add the lighting

// Create an ambient light with a color and intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 5); // You can adjust the color and intensity
scene.add(ambientLight);

// Create a directional light with higher intensity
const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Increase the intensity to 2
directionalLight.position.set(0, 0, 0.01);
scene.add(directionalLight);

// Load the 3D model
const loader = new GLTFLoader();
let loadedModel;

loader.load("scene.gltf", (gltf) => {
  loadedModel = gltf.scene; // Get the loaded model
  loadedModel.scale.set(0.03, 0.03, 0.04); // Scale the model as needed
  scene.add(loadedModel); // Add the model to the scene
});

camera.position.z = 5;

// Listen for device orientation changes
window.addEventListener("deviceorientation", handleDeviceOrientation);

function handleDeviceOrientation(event) {
  if (loadedModel) {
    const { alpha, beta, gamma } = event;
    loadedModel.rotation.x = (beta * Math.PI) / 180; // Rotate around the x-axis based on beta value
    loadedModel.rotation.y = (gamma * Math.PI) / 180; // Rotate around the y-axis based on gamma value
    loadedModel.rotation.z = (alpha * Math.PI) / 180; // Rotate around the z-axis based on alpha value
  }
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
