import type { CanvasElement } from "./common.svelte";

export interface IGroup {
  type: "group";
  elements: CanvasElement[];
}

export class Group implements IGroup {
  type = "group" as const;
  elements = $state<CanvasElement[]>([]);
  _x = $derived(Math.min(...this.elements.map(e => e.x)));
  _y = $derived(Math.min(...this.elements.map(e => e.y)));
  _width = $derived(Math.max(...this.elements.map(e => e.x + e.width)) - this.x);
  _height = $derived(Math.max(...this.elements.map(e => e.y + e.height)) - this.y);
  opacity = $state(1);
  rotation = $state(0);

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
      // element.x += this.x;
      // element.y += this.y;
      return element.clone();
    });
  }
}