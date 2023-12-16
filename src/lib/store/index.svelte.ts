import { canvasStore } from "./canvas.svelte";
import { Group } from "./elements/group.svelte";
import { elementStore, highlightedElementsStore, selectedElementsStore } from "./elements/element.svelte"
import type { CanvasElement } from ".";

type StoreObj = {
  name: string;
  canvas: string;
  elements: string;
}

export const store = new class {
  elements = $state(elementStore);
  selectedElements = $derived(selectedElementsStore);
  highlightedElements = $state(highlightedElementsStore);
  canvas = canvasStore;
  name = $state("New Design");
  fonts = $state<Record<string, string[]>>({});

  init(obj: StoreObj) {
    this.name = obj.name;
    this.canvas.setFromJSON(obj.canvas);
    this.elements.addFromJSON(obj.elements);
  }

  deleteSelected() {
    this.elements.removeElements(this.selectedElements.elements);
    this.selectedElements.clear();
  }

  groupSelected() {
    // get the selected elements, but if one of the selected elements is a group, then call element.ungroup() 
    // const selected = this.selectedElements.elements.map((element) => element.clone());
    const selected: CanvasElement[] = [];
    this.selectedElements.elements.forEach((element) => {
      if (element.type === 'group') {
        selected.push(...element.ungroup());
      } else {
        selected.push(element.clone());
      }
    });
    this.deleteSelected();
    const group = new Group({ elements: selected, type: "group" });

    this.elements.addElement(group);
    this.selectedElements.setElements([group]);
  }
}