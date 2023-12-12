export interface IBaseObject {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

// export class BaseObject implements TBaseObject {
//   type = "base-object"
//   // x = $state(0);
//   y = $state(0);
//   width = $state(0);
//   height = $state(0);
//   rotation = $state(0);
//   opacity = $state(1);

//   constructor(obj: TBaseObject) {
//     this.height = obj.height;
//     this.width = obj.width;
//     this.x = obj.x;
//     this.y = obj.y;
//     this.rotation = obj.rotation;
//     this.opacity = obj.opacity;
//   }

//   get x() {
//     return 0
//   }

//   set x(value) {
//     this.x = value
//   }
// }