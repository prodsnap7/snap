import { getBounds } from '$lib/utils/bounds-utils';
import { TextBox, type CanvasElement } from '..';

class SelectedEleemnts {
	elements = $state<CanvasElement[]>([]);
	isSingle = $derived(this.elements.length === 1);
	isText = $derived(this.isSingle && this.elements[0].type === 'text');
	isShape = $derived(this.isSingle && this.elements[0].type === 'shape');
	isCurve = $derived(this.isSingle && this.elements[0].type === 'curve');
	isImage = $derived(this.isSingle && this.elements[0].type === 'image');
	isGroup = $derived(this.isSingle && this.elements[0].type === 'group');
	isPathShape = $derived(this.isSingle && this.elements[0].type === 'path-shape');

	resizeProportionally = $state(false);

	private _bounds = $derived(getBounds(this.elements));
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
		if (!this.elements.includes(element)) {
			this.elements.push(element);
		}
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
		this.elements.forEach((element) => {
			if (element instanceof TextBox) {
				element.state = 'normal';
			}
		});
		this.elements = [];
		this._rotation = 0;
	}

	get bounds() {
		return this._bounds;
	}

	get x() {
		return +this.bounds.x.toFixed(0);
	}

	set x(value: number) {
		if (this.elements.length === 1) {
			this.elements[0].updateBounds({
				x: value - this.elements[0].rect.x,
				y: 0,
				width: 0,
				height: 0
			});
		}
	}

	get y() {
		return +this.bounds.y.toFixed(0);
	}

	set y(value: number) {
		if (this.elements.length === 1) {
			this.elements[0].updateBounds({
				x: 0,
				y: value - this.elements[0].rect.y,
				width: 0,
				height: 0
			});
		}
	}

	get width() {
		return +this.bounds.width.toFixed(0);
	}

	set width(value: number) {
		if (this.elements.length === 1) {
			if (this.resizeProportionally) {
				this.elements[0].updateBounds({
					x: 0,
					y: 0,
					width: value - this.elements[0].rect.width,
					height: value - this.elements[0].rect.height
				});
			} else {
				this.elements[0].updateBounds({
					x: 0,
					y: 0,
					width: value - this.elements[0].rect.width,
					height: 0
				});
			}
		}
	}

	get height() {
		return +this.bounds.height.toFixed(0);
	}

	set height(value: number) {
		if (this.elements.length === 1) {
			if (this.resizeProportionally) {
				this.elements[0].updateBounds({
					x: 0,
					y: 0,
					width: value - this.elements[0].rect.width,
					height: value - this.elements[0].rect.height
				});
			} else {
				this.elements[0].updateBounds({
					x: 0,
					y: 0,
					width: 0,
					height: value - this.elements[0].rect.height
				});
			}
		}
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		const newGroupWidth = this.bounds.width + width;
		const newGroupHeight = this.bounds.height + height;

		const scaleX = newGroupWidth / this.bounds.width;
		const scaleY = newGroupHeight / this.bounds.height;

		this.elements.forEach((element) => {
			// Calculate scaled position relative to the group's new position
			const elementDeltaX = (element.bounds.x - this.bounds.x) * scaleX;
			const elementDeltaY = (element.bounds.y - this.bounds.y) * scaleY;

			// Calculate new position including the group's delta movement
			const newX = this.bounds.x + elementDeltaX + x - element.bounds.x;
			const newY = this.bounds.y + elementDeltaY + y - element.bounds.y;

			// Calculate new size
			const elementNewWidth = element.bounds.width * scaleX - element.bounds.width;
			const elementNewHeight = element.bounds.height * scaleY - element.bounds.height;

			// Update element bounds
			element.updateBounds({ x: newX, y: newY, width: elementNewWidth, height: elementNewHeight });
		});
	}

	move({ x, y }: { x: number; y: number }) {
		this.elements.forEach((element) => {
			element.move({ x, y });
		});
	}

	get rotation() {
		if (this.elements.length === 1) {
			return this.elements[0].rotation;
		}

		return this._rotation;
	}

	set rotation(value: number) {
		if (this.elements.length === 1) {
			this.elements[0].rotation = value;
		} else {
			this._rotation = value;
		}
	}
}

export const selectedElementsStore = SelectedEleemnts.getInstance();
