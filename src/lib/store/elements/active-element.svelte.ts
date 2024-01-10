import type { CanvasElement } from "..";

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
}

export const activeElementStore = ActiveElementStore.getInstance();