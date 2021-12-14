/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
/**
 * Options to modify the behavior of the BillboardGroup.
 * @param X - Should the billboard be locked to the X axis? Default: false
 * @param Y - Should the billboard be locked to the Y axis? Default: false
 * @param Z - Should the billboard be locked to the Z axis? Default: false
 */
type Axis = {
  X?: boolean;
  Y?: boolean;
  Z?: boolean;
};

/**
 * Creates a BillboardGroup that you can use to make content face the camera.
 *
 * BillboardGroup acts in the same way as {@link THREE.Group}. except that each frame it rotates so that it faces the camera.
 * The axis parameter specifies the axis around which the node will rotate in order to face the camera.
 *
 */
class BillboardGroup extends THREE.Group {
  private targetQuaternion = new THREE.Quaternion();

  /**
   * Constructs a new BillboardGroup.
   * @param anchorGroup - The TargetGroup to face. This can be {@link ZapparThree.ImageAnchorGroup},
   * {@link ZapparThree.FaceAnchorGroup} or {@link ZapparThree.InstantWorldAnchorGroup}.
   * @param camera - The {@link ZapparThree.Camera} to use to face the target.
   * @param axis - The axis parameter specifies the axis around which the node will rotate in order to face the camera.
   */
  public constructor(
    private anchorGroup: ZapparThree.ImageAnchorGroup | ZapparThree.FaceAnchorGroup | ZapparThree.InstantWorldAnchorGroup,
    private camera: ZapparThree.Camera,
    private axis: Axis = { Y: true }
  ) {
    super();
  }

  public updateMatrix(): void {
    if (this.camera.poseMode === ZapparThree.CameraPoseMode.Attitude || this.camera.poseMode === ZapparThree.CameraPoseMode.AnchorOrigin) {
      this.targetQuaternion.copy(this.camera.quaternion);
    } else {
      this.targetQuaternion.copy(this.anchorGroup.quaternion);
    }
    this.targetQuaternion.invert();

    // To preserve the local rotation of the object,
    // we child it inside a new group, applying the inverted
    // target's quaternion to the new group.
    this.children.forEach((child) => {
      if (!child.userData.billboardInitialised) {
        const currentParent = child.parent;
        currentParent?.remove(child);
        const wrapperGroup = new THREE.Group();
        wrapperGroup.add(child);
        currentParent?.add(wrapperGroup);
        wrapperGroup.userData.billboardInitialised = true;
      }

      if (this.axis.X) {
        child.parent!.quaternion.x = this.targetQuaternion.x;
      }
      if (this.axis.Y) {
        child.parent!.quaternion.y = this.targetQuaternion.y;
      }
      if (this.axis.Z) {
        child.parent!.quaternion.z = this.targetQuaternion.z;
      }
    });

    this.matrix.compose(this.position, this.quaternion, this.scale);

    this.matrixWorldNeedsUpdate = true;
  }
}

export default BillboardGroup;
