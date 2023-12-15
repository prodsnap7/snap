import { canvasStore } from "./canvas.svelte";
import { elementStore, highlightedElementsStore, selectedElementsStore } from "./elements/element.svelte"

type StoreObj = {
  name: string;
  canvas: string;
  elements: string;
}

export const store = new class {
  elements = $state(elementStore);
  selectedElements = $state(selectedElementsStore);
  highlightedElements = $state(highlightedElementsStore);
  canvas = canvasStore;
  name = $state("New Design");
  fonts = $state<Record<string, string[]>>({});

  init(obj: StoreObj) {
    this.name = obj.name;
    this.canvas.setFromJSON(obj.canvas);
    this.elements.addFromJSON(obj.elements);
  }
}