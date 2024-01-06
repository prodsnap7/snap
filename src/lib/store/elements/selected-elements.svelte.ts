import { getBounds } from '$lib/utils/bounds-utils';
import { TextBox, type CanvasElement, canvasStore, elementsStore } from '..';

class SelectedEleemnts {
	elements = $state<CanvasElement[]>([]);
	isSingle = $derived(this.elements.length === 1);
	isText = $derived(this.isSingle && this.elements[0].type === 'text');
	isShape = $derived(this.isSingle && this.elements[0].type === 'shape');
	isCurve = $derived(this.isSingle && this.elements[0].type === 'curve');
	isImage = $derived(this.isSingle && this.elements[0].type === 'image');
	isGroup = $derived(this.isSingle && this.elements[0].type === 'group');
	isPathShape = $derived(this.isSingle && this.elements[0].type === 'path-shape');

	areElementsTopCanvas = $derived(this.bounds.y === 0);
	areElementsLeftCanvas = $derived(this.bounds.x === 0);
	areElementsRightCanvas = $derived(this.bounds.width + this.bounds.x === canvasStore.width);
	areElementsBottomCanvas = $derived(this.bounds.height + this.bounds.y === canvasStore.height);
	areElementsVerticallyCenteredCanvas = $derived(
		this.bounds.y + this.bounds.height / 2 === canvasStore.height / 2
	);

	areElementsHorizontallyCenteredCanvas = $derived(
		this.bounds.x + this.bounds.width / 2 === canvasStore.width / 2
	);

	areElementsTopAligned = $derived(
		this.elements.every(
			(element) => element.bounds.y === Math.min(...this.elements.map((el) => el.bounds.y))
		)
	);

	areElementsHorizontallyCentered = $derived(
		this.elements.every((element) => {
			const selectionMiddle = this.findHorizontalMiddle();
			const elementMiddle = element.bounds.x + element.bounds.width / 2;
			return elementMiddle === selectionMiddle;
		})
	);

	areElementsLeftAligned = $derived(
		this.elements.every(
			(element) => element.bounds.x === Math.min(...this.elements.map((el) => el.bounds.x))
		)
	);

	areElementsBottomAligned = $derived(
		this.elements.every((element) => {
			const maxHeight = this.bounds.height + this.bounds.y;
			return element.bounds.y + element.bounds.height === maxHeight;
		})
	);

	areElementsRightAligned = $derived(
		this.elements.every((element) => {
			const maxWidth = this.bounds.width + this.bounds.x;
			return element.bounds.x + element.bounds.width === maxWidth;
		})
	);

	areElementsVerticallyCentered = $derived(
		this.elements.every((element) => {
			const selectionMiddle = this.findVerticalMiddle();
			const elementMiddle = element.bounds.y + element.bounds.height / 2;
			return elementMiddle === selectionMiddle;
		})
	);

	bringToFront() {
		if (this.elements.length === 1) {
			elementsStore.bringToFront(this.elements[0]);
		}
	}

	bringForward() {
		if (this.elements.length === 1) {
			elementsStore.bringForward(this.elements[0]);
		}
	}

	sendBackward() {
		if (this.elements.length === 1) {
			elementsStore.sendBackward(this.elements[0]);
		}
	}

	sendToBack() {
		if (this.elements.length === 1) {
			elementsStore.sendToBack(this.elements[0]);
		}
	}

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

	verticallyCenterElements(): void {
		// Find the vertical middle of the entire selection
		const selectionMiddle = this.findVerticalMiddle();

		// Vertically center each element
		this.elements.forEach((element) => {
			const elementMiddle = element.bounds.y + element.bounds.height / 2;
			const verticalAdjustment = selectionMiddle - elementMiddle;

			element.updateBounds({
				x: 0,
				y: verticalAdjustment,
				width: 0,
				height: 0
			});
		});
	}
	private findHorizontalMiddle(): number {
		return this.bounds.x + this.bounds.width / 2;
	}

	private findVerticalMiddle(): number {
		return this.bounds.y + this.bounds.height / 2;
	}

	horizontallyCenterElements(): void {
		const selectionMiddle = this.findHorizontalMiddle();

		this.elements.forEach((element) => {
			const elementMiddle = element.bounds.x + element.bounds.width / 2;
			const horizontalAdjustment = selectionMiddle - elementMiddle;

			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}

	topAlignElements(): void {
		const minY = Math.min(...this.elements.map((element) => element.bounds.y));

		this.elements.forEach((element) => {
			element.updateBounds({ y: minY - element.bounds.y, x: 0, width: 0, height: 0 });
		});
	}

	leftAlignElements(): void {
		const minX = Math.min(...this.elements.map((element) => element.bounds.x));

		this.elements.forEach((element) => {
			element.updateBounds({ x: minX - element.bounds.x, y: 0, width: 0, height: 0 });
		});
	}

	bottomAlignElements(): void {
		const maxHeight = this.bounds.height;
		this.elements.forEach((element) => {
			const verticalAdjustment = maxHeight - (element.bounds.y + element.bounds.height);
			element.updateBounds({ y: verticalAdjustment, x: 0, width: 0, height: 0 });
		});
	}

	rightAlignElements(): void {
		const maxWidth = this.bounds.width;
		this.elements.forEach((element) => {
			const horizontalAdjustment = maxWidth - (element.bounds.x + element.bounds.width);
			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}

	topAlignCanvas(): void {
		const minY = -this.bounds.y;

		this.elements.forEach((element) => {
			element.updateBounds({ y: minY, x: 0, width: 0, height: 0 });
		});
	}

	leftAlignCanvas(): void {
		const minX = -this.bounds.x;

		this.elements.forEach((element) => {
			element.updateBounds({ x: minX, y: 0, width: 0, height: 0 });
		});
	}

	bottomAlignCanvas(): void {
		const verticalAdjustment = canvasStore.height - this.bounds.height - this.bounds.y;
		this.elements.forEach((element) => {
			element.updateBounds({ y: verticalAdjustment, x: 0, width: 0, height: 0 });
		});
	}

	rightAlignCanvas(): void {
		const horizontalAdjustment = canvasStore.width - this.bounds.width - this.bounds.x;
		this.elements.forEach((element) => {
			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}

	centerVerticallyCanvas(): void {
		const selectionMiddle = this.findVerticalMiddle();
		const canvasMiddle = canvasStore.height / 2;
		const verticalAdjustment = canvasMiddle - selectionMiddle;

		this.elements.forEach((element) => {
			element.updateBounds({ y: verticalAdjustment, x: 0, width: 0, height: 0 });
		});
	}

	centerHorizontallyCanvas(): void {
		const selectionMiddle = this.findHorizontalMiddle();
		const canvasMiddle = canvasStore.width / 2;
		const horizontalAdjustment = canvasMiddle - selectionMiddle;

		this.elements.forEach((element) => {
			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}
}

export const selectedElementsStore = SelectedEleemnts.getInstance();
