import { canvasStore, type CanvasElement } from "..";

class ActiveElementStore {
	element = $state<CanvasElement | null>(null);
	private static instance: ActiveElementStore;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ActiveElementStore();
		}

		return this.instance;
	}

	setElement(element: CanvasElement) {
		this.element = element;
	}

	clear() {
		this.element = null;
	}

	expandWidth() {
		// expand the elements width to width of canvas
		// set x = 0, then set width = canvas

		if (this.element) {
			const width = canvasStore.width - this.element.rect.width;
			this.element.updateBounds({
				x: -this.element.rect.x,
				y: 0,
				width,
				height: 0
			})
		}
	}

	expandHeight() {
		// expand the elements height to height of canvas
		// set y = 0, then set height = canvas

		if (this.element) {
			const height = canvasStore.height - this.element.rect.height;
			this.element.updateBounds({
				x: 0,
				y: -this.element.rect.y,
				width: 0,
				height
			})
		}
	}
}

export const activeElementStore = ActiveElementStore.getInstance();