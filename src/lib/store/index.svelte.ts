import { canvasStore } from './canvas.svelte';
import { Group } from './elements/group.svelte';
import {
	activeElementStore,
	elementsStore,
	highlightedElementsStore,
} from './elements/elements.svelte';
import { selectedElementsStore } from './elements/selected-elements.svelte';
import type { CanvasElement } from '.';

type StoreObj = {
	name: string;
	canvas: string;
	elements: string;
};

class Store {
	private static instance: Store;
	elements = $state(elementsStore);
	activeElement = $derived(activeElementStore);
	selectedElements = $derived(selectedElementsStore);
	unselectedElements = $derived(
		this.elements.elements.filter((element) => !this.selectedElements.elements.includes(element))
	);
	highlightedElements = $state(highlightedElementsStore);
	canvas = canvasStore;
	name = $state('New Design');
	fonts = $state<Record<string, string[]>>({});
	gridLines = $derived(getGridLines());
	saving = $state(false);

	canUndo = $derived(this.elements.canUndo || this.canvas.canUndo);
	canRedo = $derived(this.elements.canRedo || this.canvas.canRedo);

	private constructor() {
		this.initFromLocalStorage();
	}

	static getInstance() {
		if (!Store.instance) {
			Store.instance = new Store();
		}

		return Store.instance;
	}

	init(obj: StoreObj) {
		this.name = obj.name;
		this.canvas.setFromJSON(obj.canvas);
		this.elements.addFromJSON(obj.elements);
	}

	initFromLocalStorage() {
		const elements = localStorage.getItem('elements');
		if (elements) {
			this.elements.addFromJSON(elements);
		}

		const canvas = localStorage.getItem('canvas');
		if (canvas) {
			this.canvas.setFromJSON(canvas);
		}
	}

	deleteSelected() {
		this.elements.removeElements(this.selectedElements.elements);
		this.selectedElements.clear();
	}

	saveToLocalStorage() {
		this.saving = true;
		// loop through the elements and convert each one to a plain object
		this.elements.saveToLocalStorage();
		this.canvas.saveToLocalStorage();

		// delay by 2 seconds to show the saving indicator
		setTimeout(() => {
			this.saving = false;
		}, 2000);
	}

	undo() {
		this.elements.undo();
		this.canvas.undo();
		this.selectedElements.clear();
	}

	redo() {
		this.elements.redo();
		this.canvas.redo();
		this.selectedElements.clear();
	}

	groupSelected() {
		// get the selected elements, but if one of the selected elements is a group, then call element.ungroup()
		// const selected = this.selectedElements.elements.map((element) => element.clone());
		const selected: CanvasElement[] = [];
		this.selectedElements.elements.forEach((element) => {
			if (element instanceof Group) {
				selected.push(...element.ungroup());
			} else {
				selected.push(element.clone());
			}
		});
		this.deleteSelected();
		const group = new Group({ elements: selected, type: 'group' });

		this.elements.addElement(group);
		this.selectedElements.setElements([group]);
	}
};

export const store = Store.getInstance();

function getGrid() {
	const grid = store.unselectedElements.map((el) => {
		const { x, y, width, height } = el.bounds;
		return {
		left: x,
		top: y,
		right: x + width,
		bottom: y + height
		}
	});

	return grid;
}

export function getGridLines() {
	const grid = getGrid();
	const selectedElements = store.selectedElements.elements;
	const canvas = store.canvas;
  $inspect(selectedElements);
	const lines = selectedElements.reduce(
		(acc, el) => {
			const { x, y, width, height } = el.bounds;
			const elMiddleX = x + width / 2;
			const elMiddleY = y + height / 2;
			const tolerance = 1e-6;

			grid.forEach((g) => {
				if (g.left === x) {
					acc.push({
						x1: g.left,
						y1: (g.top + g.bottom) / 2,
						x2: x,
						y2: y + height / 2
					});
				}

				if (g.top === y) {
					acc.push({
						x1: (g.left + g.right) / 2,
						y1: g.top,
						x2: x + width / 2,
						y2: y
					});
				}

				if (g.right === x + width) {
					acc.push({
						x1: g.right,
						y1: (g.top + g.bottom) / 2,
						x2: x + width,
						y2: y + height / 2
					});
				}

				if (g.bottom === y + height) {
					acc.push({
						x1: (g.left + g.right) / 2,
						y1: g.bottom,
						x2: x + width / 2,
						y2: y + height
					});
				}

				// Calculate middle points for the grid element
				const gridMiddleX = g.left + (g.right - g.left) / 2;
				const gridMiddleY = g.top + (g.bottom - g.top) / 2;

				// Check alignment and create lines
				if (Math.abs(gridMiddleX - elMiddleX) <= tolerance) {
					acc.push({
						x1: gridMiddleX,
						y1: Math.min(g.top, y), // Start from the top of the higher element
						x2: elMiddleX,
						y2: Math.max(g.bottom, y + height) // End at the bottom of the lower element
					});
				}

				if (Math.abs(gridMiddleY - elMiddleY) <= tolerance) {
					acc.push({
						x1: Math.min(g.left, x), // Start from the left of the leftmost element
						y1: gridMiddleY,
						x2: Math.max(g.right, x + width), // End at the right of the rightmost element
						y2: elMiddleY
					});
				}
			});

			const middlePointOfElement = {
				x: x + width / 2,
				y: y + height / 2
			};

			if (middlePointOfElement.x === canvas.width / 2) {
				acc.push({
					x1: canvas.width / 2,
					y1: 0,
					x2: middlePointOfElement.x,
					y2: middlePointOfElement.y
				});
			}

			if (middlePointOfElement.y === canvas.height / 2) {
				acc.push({
					x1: 0,
					y1: canvas.height / 2,
					x2: middlePointOfElement.x,
					y2: middlePointOfElement.y
				});
			}

			return acc;
		},
		[] as { x1: number; y1: number; x2: number; y2: number }[]
	);

	return lines;
}
