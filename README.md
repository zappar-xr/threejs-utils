# ThreeJS Utils

This library contains utility functions, created to speed up augmented reality development.

You may also be interested in:

- Zappar for Threejs ([website](https://zap.works/universal-ar/threejs/), [NPM](https://www.npmjs.com/package/@zappar/zappar-threejs))
- Zappar for A-Frame ([website](https://zap.works/universal-ar/aframe/), [NPM](https://www.npmjs.com/package/@zappar/zappar-aframe))
- Zappar for React+three.js ([website](https://zap.works/universal-ar/react/), [NPM](https://www.npmjs.com/package/@zappar/zappar-react-three-fiber))
- Zappar for Unity ([website](https://zap.works/universal-ar/unity/))
- Zappar for JavaScript ([website](https://zap.works/universal-ar/aframe/), [NPM](https://www.npmjs.com/package/@zappar/zappar)), if you'd like to build content with a different 3D rendering platform
- ZapWorks Studio ([website](https://zap.works/studio/)), a full 3D development environment built for AR, VR and MR

## Table Of Contents

<details>
<summary>Click to expand table of contents</summary>

<!--ts-->
   * [ThreeJS Utils](#threejs-utils)
      * [Table Of Contents](#table-of-contents)
      * [Starting Development](#starting-development)
         * [Standalone Download](#standalone-download)
         * [CDN](#cdn)
         * [NPM Webpack Package](#npm-webpack-package)
      * [Usage](#usage)
         * [Billboard](#billboard)

<!-- Added by: zapparadmin, at: Tue Dec 14 16:12:47 GMT 2021 -->

<!--te-->
</details>

## Starting Development

You can use this library by downloading a standalone zip containing the necessary files, by linking to our CDN, or by installing from NPM for use in a webpack project.

### Standalone Download

Download the bundle from this link:
<https://libs.zappar.com/zappar-threejs-utils/1.0.1/zappar-threejsutils.zip>

Unzip into your web project and reference from your HTML like this:

```html
<script src="zappar-threejsutils.js"></script>
```

### CDN

Reference the zappar-threejsutils.js library from your HTML like this:

```html
<script src="https://libs.zappar.com/zappar-threejs-utils/1.0.1/zappar-threejsutils.js"></script>
```

### NPM Webpack Package

Run the following NPM command inside your project directory:

```bash
npm install --save @zappar/threejs-utils
```

Then import the library into your JavaScript or TypeScript files:

```ts
import * as ZapparUtils from "@zappar/threejs-utils";
```

## Usage

### Billboard

BillboardGroup acts in the same way as `THREE.Group` except that each frame it rotates so that it faces the camera.

To construct, pass in three parameters:

- `camera` - A `ZapparThree.Camera`.
- `anchorGroup` - A `ZapparThree` anchor group.
- `axis` options - Object defining the axis around which the children will rotate in order to face the camera.

```ts
import * as ZapparUtils from "@zappar/threejs-utils";

// ...
const camera = new ZapparThree.Camera();

const tracker = new ZapparThree.InstantWorldTracker();
const trackerGroup = new ZapparThree.InstantWorldAnchorGroup(camera, tracker);

const billboardGroup = new ZapparUtils.BillboardGroup(trackerGroup, camera, {
  Y: true,
  // Y: false,
  // Z: false,
});

billboardGroup.add(cameraFacingContent);
```
