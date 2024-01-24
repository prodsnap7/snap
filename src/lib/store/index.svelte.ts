import { canvasStore } from './canvas.svelte';
import { Group } from './elements/group.svelte';
import { elementsStore, highlightedElementsStore } from './elements/elements.svelte';
import { activeElementStore } from './elements/active-element.svelte';
import { selectedElementsStore } from './elements/selected-elements.svelte';
import type { CanvasElement, TCanvas } from '.';
import { updateDesign } from '$lib/api/designs';

type StoreObj = {
	name?: string;
	canvas: Partial<TCanvas>;
	elements: string;
	id?: string;
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
	gridLines = $derived(
		getGridLines(this.selectedElements.elements, this.unselectedElements, this.canvas)
	);
	saving = $state(false);
	id = $state('');
	timestamp = $state(Date.now());

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

	init(obj: StoreObj = { canvas: {}, elements: '[]', name: 'New Design', id: ''  }) {
		this.name = obj.name || 'New Design';
		this.id = obj.id || '';
		this.canvas.setFromObject(obj.canvas);
		this.elements.addFromJSON(obj.elements);
	}

	initFromLocalStorage() {
		if (isLocalStorageAvailable()) {
			const elementsData = localStorage.getItem(`elements-${this.id}`);
			if (elementsData && this.elements.addFromJSON) {
				this.elements.addFromJSON(JSON.parse(elementsData));
			}

			const canvasData = localStorage.getItem(`canvas-${this.id}`);
			if (canvasData && this.canvas.setFromJSON) {
				this.canvas.setFromJSON(JSON.parse(canvasData));
			}
		}
	}

	deleteSelected() {
		this.elements.removeElements(this.selectedElements.elements);
		this.selectedElements.clear();
	}

	saveToLocalStorage() {
		this.saving = true;
		// loop through the elements and convert each one to a plain object
		this.elements.saveToLocalStorage(this.id);
		this.canvas.saveToLocalStorage(this.id);

		// delay by 2 seconds to show the saving indicator
		setTimeout(() => {
			this.saving = false;
		}, 2000);
	}

	async save(generateImage = false) {
		this.saving = true;
		const data = {
			id: this.id,
			name: this.name,
			canvas: {
				width: this.canvas.width,
				height: this.canvas.height,
				background: this.canvas.background,
				elements: JSON.stringify(this.elements.elements.map((element) => element.toJson()))
			}
		};

		try {
			await updateDesign({ id: this.id, data }, generateImage);
		} catch (e) {
			console.error(e);
		}

		this.saving = false;
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

	addElement(element: CanvasElement) {
		this.elements.addElement(element);
		this.selectedElements.setElements([element]);
		this.activeElement.setElement(element);
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
}

export const store = Store.getInstance();

function getGrid(unselectedElements: CanvasElement[]) {
	const grid = unselectedElements.map((el) => {
		const { x, y, width, height } = el.bounds;
		return {
			left: x,
			top: y,
			right: x + width,
			bottom: y + height
		};
	});

	return grid;
}

function isLocalStorageAvailable() {
	try {
			return typeof localStorage !== 'undefined';
	} catch (e) {
			return false;
	}
}

export function getGridLines(
	selectedElements: CanvasElement[],
	unselectedElements: CanvasElement[],
	canvas: { width: number; height: number }
) {
	const grid = getGrid(unselectedElements);
	// $inspect(selectedElements);
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
