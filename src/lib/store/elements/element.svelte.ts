import { Shape, type IShape } from "./shape.svelte";

export type CanvasElement = Shape;
export type CanvasObject = Partial<IShape> & { type: string };

export const elementStore = new class {
  elements = $state<CanvasElement[]>([]);

  addFromObject(element: CanvasObject) {
    if (element.type === "shape") {
      const shape = Shape.fromObject(element);
      this.addElement(shape);
    }
  }

  addFromObjectArray(elements: CanvasObject[]) {
    elements.forEach((element) => {
      this.addFromObject(element);
    })
  }

  addFromJSON(json: string) {
    const obj = JSON.parse(json);
    if (Array.isArray(obj)) {
      this.addFromObjectArray(obj);
    } else {
      this.addFromObject(obj);
    }
  }

  addElement(element: CanvasElement) {
    this.elements.push(element);
  }

  addElements(elements: CanvasElement[]) {
    elements.forEach((element) => {
      this.addElement(element);
    })
  }
}