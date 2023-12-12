import { canvasStore } from "./canvas.svelte";
import { elementStore, selectedElementsStore, type CanvasElement } from "./elements/element.svelte"

type StoreObj = {
  name: string;
  canvas: string;
  elements: string;
}

export const store = new class {
  elements = elementStore;
  selectedElements = $state(selectedElementsStore);
  canvas = canvasStore;
  name = $state("New Design");
  fonts = $state<Record<string, string[]>>({});

  init(obj: StoreObj) {
    this.name = obj.name;
    this.canvas.setFromJSON(obj.canvas);
    this.elements.addFromJSON(obj.elements);
  }

  addSelectedElements(elements: CanvasElement[]) {
    this.selectedElements.addElements(elements);
  }
}