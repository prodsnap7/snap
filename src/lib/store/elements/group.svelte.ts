import shortUUID from "short-uuid";
import {  BaseObject, type CanvasElement,type IBaseMethods } from "./common.svelte";

export interface IGroup {
  type: "group";
  elements: CanvasElement[];
}

// type Moveable = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

export class Group extends BaseObject {
  type = "group" as const;
  id = shortUUID.generate();
  elements = $state<CanvasElement[]>([]);
  _rotation = $state(0);  
  opacity = $state(1);
  // private _bounds: Moveable = $derived(this._getBounds(this.elements));

  constructor(obj: Partial<Group>) {
    super(obj);
    Object.assign(this, obj);
  }


  get colors(): string[] {
    return this.elements.map((element) => element.colors).flat();
  }

  get rotation(): number {
    if (this.elements.length === 1) {
      return this.elements[0].rotation;
    } else {
      return this._rotation;
    }
  }

  get rect(): { x: number; y: number; width: number; height: number; } {
    // loop over elements and get min x, min y, max x + width, max y + height
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    this.elements.forEach((element) => {
      const { x, y, width, height } = element.rect;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
  }

  set rotation(value: number) {
    this._rotation = value;
  }

  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.elements.forEach((element) => {
      element.updateBounds({ x, y, width, height });
    })
  }

  // get bounds() {
  //   return this._bounds;
  // }

  // private _getBounds(elements: CanvasElement[]) {
	// 	let x = Math.min(...elements.map((element) => element.bounds.x), Infinity);
	// 	let y = Math.min(...elements.map((element) => element.bounds.y), Infinity);
	// 	let width =
	// 		Math.max(...elements.map((element) => element.bounds.x + element.bounds.width), -Infinity) -
	// 		x;
	// 	let height =
	// 		Math.max(...elements.map((element) => element.bounds.y + element.bounds.height), -Infinity) -
	// 		y;

	// 	return { x, y, width, height };
	// }


  clone(): Group {
    return new Group({
      type: "group",
      elements: this.elements.map(e => e.clone())
    });
  }

  ungroup(): CanvasElement[] {
    return this.elements.map((element) => {
      const el = element.clone();
      el.rotation += this.rotation;

      return el;
    });
  }
}