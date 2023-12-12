import { Shape, type IShape } from './shape.svelte';

export type CanvasElement = Shape;
export type CanvasObject = Partial<IShape> & { type: string };

export const elementStore = new class {
	elements = $state<CanvasElement[]>([]);

	addFromObject(element: CanvasObject) {
		if (element.type === 'shape') {
			const shape = Shape.fromObject(element);
			this.addElement(shape);
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

	cloneElement(element: CanvasElement) {
		const clone = element.clone();
		this.addElement(clone);
	}
};

export const selectedElementsStore = new class {
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
      element.x += value;
    });
  }

  set y(value: number) {
    this.elements.forEach((element) => {
      element.y += value;
    });
  }

  set width(value: number) {
    this.elements.forEach((element) => {
      element.width += value;
    });
  }

  set height(value: number) {
    this.elements.forEach((element) => {
      element.height += value;
    });
  }

	set rotation(value: number) {
		// this.elements.forEach((element) => {
		// 	element.rotation = value;
		// });
	}
}
