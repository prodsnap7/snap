import type {  CanvasElement,IBaseMethods } from "./common.svelte";

export interface IGroup {
  type: "group";
  elements: CanvasElement[];
}

type Moveable = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Group implements IGroup, IBaseMethods {
  type = "group" as const;
  elements = $state<CanvasElement[]>([]);
  _x = $derived(Math.min(...this.elements.map(e => e.x)));
  _y = $derived(Math.min(...this.elements.map(e => e.y)));
  _width = $derived(Math.max(...this.elements.map(e => e.x + e.width)) - this.x);
  _height = $derived(Math.max(...this.elements.map(e => e.y + e.height)) - this.y);
  _rotation = $state(0);  
  opacity = $state(1);
  private _bounds: Moveable = $derived(this._getBounds(this.elements));

  constructor(obj: IGroup) {
    this.elements = obj.elements;
  }

  get x() {
    return this._x;
    // return Math.min(...this.elements.map((element) => element.x), Infinity);
  }

  get y() {
    return this._y;
    // return Math.min(...this.elements.map((element) => element.y), Infinity);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
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

  set rotation(value: number) {
    this._rotation = value;
  }

  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.elements.forEach((element) => {
      element.updateBounds({ x, y, width, height });
    })
  }

  get bounds() {
    return this._bounds;
  }

  private _getBounds(elements: CanvasElement[]) {
		let x = Math.min(...elements.map((element) => element.bounds.x), Infinity);
		let y = Math.min(...elements.map((element) => element.bounds.y), Infinity);
		let width =
			Math.max(...elements.map((element) => element.bounds.x + element.bounds.width), -Infinity) -
			x;
		let height =
			Math.max(...elements.map((element) => element.bounds.y + element.bounds.height), -Infinity) -
			y;

		return { x, y, width, height };
	}

  set x(value: number) {
    this.elements.forEach((element) => {
      if (element.type === 'curve') {
        element.x = value;
      } else {
      	element.x += value;
      }
    });
  }

  set y(value: number) {
    this.elements.forEach((element) => {
      if (element.type === 'curve') {
        element.y = value;
      } else {
      	element.y += value;
      }
    });
  }

  set width(value: number) {
    this.elements.forEach((element) => {
      element.width += value;
    });
  }

  set height(value: number) {
    this.elements.forEach((element) => {
      element.height += value;
    });
  }

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