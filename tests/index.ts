import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import * as ZapparUtils from "../src";

// Setup ThreeJS in the usual way
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Setup a Zappar camera instead of one of ThreeJS's cameras
const camera = new ZapparThree.Camera();

// The Zappar library needs your WebGL context, so pass it
ZapparThree.glContextSet(renderer.getContext());

// Create a ThreeJS Scene and set its background to be the camera background texture
const scene = new THREE.Scene();
scene.background = camera.backgroundTexture;

// Request the necessary permission from the user
ZapparThree.permissionRequestUI().then((granted) => {
  if (granted) camera.start();
  // For face tracking let's use the user-facing camera
  else ZapparThree.permissionDeniedUI();
});

const tracker = new ZapparThree.InstantWorldTracker();
const trackerGroup = new ZapparThree.InstantWorldAnchorGroup(camera, tracker);
const billboardGroup = new ZapparUtils.BillboardGroup(trackerGroup, camera, {
  Y: true,
});

scene.add(trackerGroup);

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.5, 1.0), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
// plane.position.z = 0;
plane.position.y = 0.5;
billboardGroup.add(plane);
billboardGroup.position.z = -2;
// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);
const box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshStandardMaterial());
trackerGroup.add(billboardGroup, box);

let hasPlaced = false;
const placementUI = document.getElementById("zappar-placement-ui") || document.createElement("div");
placementUI.addEventListener("click", () => {
  placementUI.remove();
  hasPlaced = true;
});

// Set up our render loop
function render() {
  requestAnimationFrame(render);
  camera.updateFrame(renderer);

  if (!hasPlaced) tracker.setAnchorPoseFromCameraOffset(0, 0, -5);

  renderer.render(scene, camera);
}

requestAnimationFrame(render);
