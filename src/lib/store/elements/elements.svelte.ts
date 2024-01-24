import { PathShape, Shape } from './shape.svelte';
import { Group } from './group.svelte';
import { Curve } from './curve.svelte';
import type { CanvasElement, CanvasObject } from './common.svelte';
import { Image, TextBox } from '..';

class ElementStore {
	private static instance: ElementStore;
	elements = $state<CanvasElement[]>([]);
	colors = $derived(colors(this.elements));
	fonts = $derived(this.getfonts());
	history = $state<string[]>([]);
	historyIndex = $state<number>(0);

	canRedo = $derived(this.historyIndex < this.history.length - 1);
	canUndo = $derived(this.historyIndex > 0);

	private constructor() {}

	static getInstance() {
		if (!ElementStore.instance) {
			ElementStore.instance = new ElementStore();
		}

		return ElementStore.instance;
	}

	saveToLocalStorage(id: string) {
		const key = `elements-${id}`;
		const elementsJson = this.elements.map((element) => element.toJson());
		const json = JSON.stringify(elementsJson);

		const current = localStorage.getItem(key);

		if (current !== json) {
			localStorage.setItem(key, json);
			// add to history
			this.historyIndex++;
			this.history = this.history.slice(0, this.historyIndex);
			this.history.push(json);
		}
	}

	undo() {
		if (this.historyIndex > 0) {
			this.historyIndex--;
			const json = this.history[this.historyIndex];
			this.elements = [];
			this.addFromJSON(json);
		}
	}

	redo() {
		if (this.historyIndex < this.history.length - 1) {
			this.historyIndex++;
			const json = this.history[this.historyIndex];
			this.elements = [];
			this.addFromJSON(json);
		}
	}

	isElementAtFront(element: CanvasElement) {
		return this.elements[this.elements.length - 1] === element;
	}

	isElementAtBack(element: CanvasElement) {
		return this.elements[0] === element;
	}

	bringToFront(element: CanvasElement) {
		this.elements = this.elements.filter((e) => e !== element);
		this.elements.push(element);
	}

	bringForward(element: CanvasElement) {
		const index = this.elements.indexOf(element);
		if (index < this.elements.length - 1) {
			this.elements = this.elements.filter((e) => e !== element);
			this.elements.splice(index + 1, 0, element);
		}
	}

	sendBackward(element: CanvasElement) {
		const index = this.elements.indexOf(element);
		if (index > 0) {
			this.elements = this.elements.filter((e) => e !== element);
			this.elements.splice(index - 1, 0, element);
		}
	}

	sendToBack(element: CanvasElement) {
		this.elements = this.elements.filter((e) => e !== element);
		this.elements.unshift(element);
	}

	addFromObject(element: CanvasObject) {
		if (element.type === 'shape') {
			const shape = new Shape(element);
			this.addElement(shape);
		} else if (element.type === 'curve') {
			const curve = new Curve(element);
			this.addElement(curve);
		} else if (element.type === 'group') {
			const group = Group.fromObject(element);
			this.addElement(group);
		} else if (element.type === 'image') {
			const image = new Image(element);
			this.addElement(image);
		} else if (element.type === 'path-shape') {
			const pathShape = new PathShape(element);
			this.addElement(pathShape);
		} else if (element.type === 'text') {
			const text = new TextBox(element);
			this.addElement(text);
		}
	}

	addFromObjectArray(elements: CanvasObject[]) {
		elements.forEach((element) => {
			this.addFromObject(element);
		});
	}

	addFromJSON(json: string) {
		const obj = JSON.parse(json);
		if (Array.isArray(obj)) {
			const objs = obj.map((o) => typeof o === 'string' ? JSON.parse(o) : o);
			this.addFromObjectArray(objs);
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
		});
	}

	removeElement(element: CanvasElement) {
		this.elements = this.elements.filter((e) => e !== element);
	}

	removeElements(elements: CanvasElement[]) {
		elements.forEach((element) => {
			this.removeElement(element);
		});
	}

	cloneElement(element: CanvasElement) {
		const clone = element.clone();
		this.addElement(clone);
	}

	getfonts() {
		const groupedEls = this.elements.filter((element) => element.type === 'group') as Group[];
		const groupedFontUrls = groupedEls.map((group) => group.fontUrls).flat();
		const textEls = this.elements.filter((element) => element.type === 'text') as TextBox[];
		const fontUrls = textEls.map((element) => element.fontUrl);
		const fontUrlList = [...new Set([...fontUrls, ...groupedFontUrls])];
		return fontUrlList;
	}

	clear() {
		this.elements = [];
	}
}

export const elementsStore = ElementStore.getInstance();

function colors(elements: CanvasElement[]): string[] {
	const colorsWithDuplicates = elements.map((element) => element.colors).flat();
	const uniqueColors = [...new Set(colorsWithDuplicates)];
	return uniqueColors;
}

export const highlightedElementsStore = new (class {
	elements = $state<CanvasElement[]>([]);

	addElement(element: CanvasElement) {
		this.elements.push(element);
	}

	addElements(elements: CanvasElement[]) {
		elements.forEach((element) => {
			this.addElement(element);
		});
	}

	removeElement(element: CanvasElement) {
		this.elements = this.elements.filter((e) => e !== element);
	}

	removeElements(elements: CanvasElement[]) {
		elements.forEach((element) => {
			this.removeElement(element);
		});
	}

	setElements(elements: CanvasElement[]) {
		this.elements = elements;
	}

	clear() {
		this.elements = [];
	}
})();
