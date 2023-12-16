import { Shape } from "./shape.svelte";
import type { CanvasElement, CanvasObject } from "./common.svelte";
import { Curve } from "./curve.svelte";


export const elementStore = new class {
	elements = $state<CanvasElement[]>([]);

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
};

const unSelectedElements = $derived(elementStore.elements.filter((element) => !selectedElementsStore.elements.includes(element)));

export const selectedElementsStore = new class {
	elements = $state<CanvasElement[]>([]);
	private _bounds = $derived(this._getBounds(this.elements)); 

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

	private _getBounds(elements: CanvasElement[]) {
		let x = Math.min(...elements.map((element) => element.x), Infinity);
		let y = Math.min(...elements.map((element) => element.y), Infinity);
		let width = Math.max(...elements.map((element) => element.x + element.width), -Infinity) - x;
		let height = Math.max(...elements.map((element) => element.y + element.height), -Infinity) - y;

		return { x, y, width, height };
	}

	get bounds() {
		return this._bounds;
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number}) {
		this.elements.forEach((element) => {
			element.updateBounds({ x, y, width, height });
		})
	}

	get x() {
		return Math.min(...this.elements.map((element) => element.x), Infinity);
	}

	get y() {
		return Math.min(...this.elements.map((element) => element.y), Infinity);
	}

	get width() {
		return Math.max(...this.elements.map((element) => element.x + element.width), -Infinity) - this.x;
	}

	get height() {
		return Math.max(...this.elements.map((element) => element.y + element.height), -Infinity) - this.y;
	}

	get rotation() {
		return 0
	}

  set x(value: number) {
    this.elements.forEach((element) => {
			if (element.type === 'curve' || element.type === 'group') {
				element.x = value;
			} else {
      	element.x += value;
			}
    });
  }

  set y(value: number) {
    this.elements.forEach((element) => {
			if (element.type === 'curve' || element.type === 'group') {
				element.y = value;
			} else {
      	element.y += value;
			}
    });
  }

  set width(value: number) {
    this.elements.forEach((element) => {
			if (element.type === 'curve' || element.type === 'group') {
				element.width = value;
			} else {
      	element.width += value;
			}
    });
  }

  set height(value: number) {
    this.elements.forEach((element) => {
			if (element.type === 'curve' || element.type === 'group') {
				element.height = value;
			} else {
				element.height += value;
			}
    });
  }

	set rotation(value: number) {
		// this.elements.forEach((element) => {
		// 	element.rotation = value;
		// });
	}
}

export const highlightedElementsStore = new class {
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
}
