import { Shape } from './shape.svelte';
import { Group } from './group.svelte';
import { Curve } from './curve.svelte';
import type { CanvasElement, CanvasObject } from './common.svelte';

export const elementStore = new (class {
	elements = $state<CanvasElement[]>([]);
	colors = $derived(colors(this.elements));

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
			const shape = Shape.fromObject(element);
			this.addElement(shape);
		} else if (element.type === 'curve') {
			const curve = Curve.fromObject(element);
			this.addElement(curve);
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
})();

function colors(elements: CanvasElement[]): string[] {
	const colorsWithDuplicates = elements.map((element) => element.colors).flat();
	const uniqueColors = [...new Set(colorsWithDuplicates)];
	return uniqueColors;
}


export const highlightedElementsStore = new (class {
	elements = $state<CanvasElement[]>([]);

	addElement(element: CanvasElement) {
		console.log('adding element highlight', element);
		this.elements.push(element);
	}

	addElements(elements: CanvasElement[]) {
		elements.forEach((element) => {
			this.addElement(element);
		});
	}

	removeElement(element: CanvasElement) {
		console.log('removing element highlight', element);
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

export const activeElementStore = new (class {
	element = $state<CanvasElement | null>(null);

	setElement(element: CanvasElement) {
		this.element = element;
	}

	clear() {
		this.element = null;
	}
})();