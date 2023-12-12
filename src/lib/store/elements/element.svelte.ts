import { Shape, type IShape } from "./shape.svelte";

export type CanvasElement = Shape;
export type CanvasObject = Partial<IShape> & { type: string };

export const elementStore = new class {
  elements = $state<CanvasElement[]>([]);

  addElementFromObject(element: CanvasObject) {
    if (element.type === "shape") {
      const shape = Shape.fromObject(element);
      this.elements.push(shape);
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