import type { CanvasElement } from "..";
import { Curve } from "./curve.svelte";
import { Group } from "./group.svelte";

class SelectedEleemnts {
	elements = $state<CanvasElement[]>([]);
	private _bounds = $derived(this._getBounds(this.elements));
	private _rotation = $state(0);
  private static instance: SelectedEleemnts;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new SelectedEleemnts();
    }

    return this.instance;
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

	setElements(elements: CanvasElement[]) {
		this.elements = elements;
	}

	clear() {
		this.elements = [];
		this._rotation = 0;
	}

	private _getBounds(elements: CanvasElement[]) {
		let x = Math.min(...elements.map((element) => element.bounds.x), Infinity);
		let y = Math.min(...elements.map((element) => element.bounds.y), Infinity);
		let width =
			Math.max(...elements.map((element) => element.bounds.x + element.bounds.width), -Infinity) -
			x;
		let height =
			Math.max(...elements.map((element) => element.bounds.y + element.bounds.height), -Infinity) -
			y;

		return { x, y, width, height };
	}

	get bounds() {
		return this._bounds;
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.elements.forEach((element) => {
			element.updateBounds({ x, y, width, height });
		});
	}

	get rotation() {
		if (this.elements.length === 1) {
			return this.elements[0].rotation;
		}
		
		return this._rotation;
	}

	set rotation(value: number) {
		this._rotation = value;
		this.elements.forEach((element) => {
			element.rotation = value;
		});
	}
}

export const selectedElementsStore = SelectedEleemnts.getInstance();