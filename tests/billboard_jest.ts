import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import * as ZapparUtils from "../src";
import targetImageImageSource from "./image-target.jpg";
import targetImage from "./target.zpt";

ZapparThree.setLogLevel(ZapparThree.LogLevel.LOG_LEVEL_VERBOSE);

// Setup ThreeJS in the usual way
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const img = document.createElement("img");
export const camera = new ZapparThree.Camera({
  rearCameraSource: img,
});

img.src = targetImageImageSource;

img.onload = () => {
  camera.start();
};

ZapparThree.glContextSet(renderer.getContext());

const scene = new THREE.Scene();
scene.background = camera.backgroundTexture;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const tracker = new ZapparThree.ImageTrackerLoader().load(targetImage);
const trackerGroup = new ZapparThree.ImageAnchorGroup(camera, tracker);

tracker.onVisible.bind(() => {
  console.log("Anchor is visible");
});
scene.add(trackerGroup);

const box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshStandardMaterial());
const box2 = box.clone();
box2.scale.set(0.1, 1.0, 0.1);

const billboardGroup = new ZapparUtils.BillboardGroup(trackerGroup, camera, {
  Y: true,
  X: true,
  Z: true,
});
billboardGroup.add(box2);

billboardGroup.position.x = -1;
billboardGroup.position.y = 1;
trackerGroup.add(billboardGroup, box);

// Set up our render loop
function render() {
  requestAnimationFrame(render);
  camera.updateFrame(renderer);

  renderer.render(scene, camera);
}

requestAnimationFrame(render);
