import { canvasStore, type CanvasElement } from ".";

interface ElementCollection {
  elements: CanvasElement[];
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

export class AlignHandler {
  private collection: ElementCollection;
  private canvas = canvasStore;

  constructor(collection: ElementCollection) {
    this.collection = collection;
  }

  private findHorizontalMiddle(): number {
		return this.collection.bounds.x + this.collection.bounds.width / 2;
	}

	private findVerticalMiddle(): number {
		return this.collection.bounds.y + this.collection.bounds.height / 2;
	}

	verticallyCenterElements(): void {
		// Find the vertical middle of the entire selection
		const selectionMiddle = this.findVerticalMiddle();

		// Vertically center each element
		this.collection.elements.forEach((element) => {
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

	horizontallyCenterElements(): void {
		const selectionMiddle = this.findHorizontalMiddle();

		this.collection.elements.forEach((element) => {
			const elementMiddle = element.bounds.x + element.bounds.width / 2;
			const horizontalAdjustment = selectionMiddle - elementMiddle;

			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}

	topAlignElements(): void {
		const minY = Math.min(...this.collection.elements.map((element) => element.bounds.y));

		this.collection.elements.forEach((element) => {
			element.updateBounds({ y: minY - element.bounds.y, x: 0, width: 0, height: 0 });
		});
	}

	leftAlignElements(): void {
		const minX = Math.min(...this.collection.elements.map((element) => element.bounds.x));

		this.collection.elements.forEach((element) => {
			element.updateBounds({ x: minX - element.bounds.x, y: 0, width: 0, height: 0 });
		});
	}

	bottomAlignElements(): void {
		const maxHeight = this.collection.bounds.height;
		this.collection.elements.forEach((element) => {
			const verticalAdjustment = maxHeight - (element.bounds.y + element.bounds.height);
			element.updateBounds({ y: verticalAdjustment, x: 0, width: 0, height: 0 });
		});
	}

	rightAlignElements(): void {
		const maxWidth = this.collection.bounds.width;
		this.collection.elements.forEach((element) => {
			const horizontalAdjustment = maxWidth - (element.bounds.x + element.bounds.width);
			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}

  get areElementsTopAligned(): boolean {
    return this.collection.elements.every(
			(element) => element.bounds.y === Math.min(...this.collection.elements.map((el) => el.bounds.y))
		)
  }

  get areElementsHorizontallyCentered() {
		return this.collection.elements.every((element) => {
			const selectionMiddle = this.findHorizontalMiddle();
			const elementMiddle = element.bounds.x + element.bounds.width / 2;
			return elementMiddle === selectionMiddle;
		})
	};

	get areElementsLeftAligned() {
		return this.collection.elements.every(
			(element) => element.bounds.x === Math.min(...this.collection.elements.map((el) => el.bounds.x))
		)
	};

	get areElementsBottomAligned() {
		return this.collection.elements.every((element) => {
			const maxHeight = this.collection.bounds.height + this.collection.bounds.y;
			return element.bounds.y + element.bounds.height === maxHeight;
		})
	};

	get areElementsRightAligned() {
		return this.collection.elements.every((element) => {
			const maxWidth = this.collection.bounds.width + this.collection.bounds.x;
			return element.bounds.x + element.bounds.width === maxWidth;
		})
	};

	get areElementsVerticallyCentered() {
		return this.collection.elements.every((element) => {
			const selectionMiddle = this.findVerticalMiddle();
			const elementMiddle = element.bounds.y + element.bounds.height / 2;
			return elementMiddle === selectionMiddle;
		})
	};

  get areElementsTopCanvas() {
    return this.collection.bounds.y === 0;
  }

  get areElementsLeftCanvas() {
    return this.collection.bounds.x === 0;
  }

  get areElementsRightCanvas() {
    return this.collection.bounds.width + this.collection.bounds.x === this.canvas.width;
  }

  get areElementsBottomCanvas() {
    return this.collection.bounds.height + this.collection.bounds.y === this.canvas.height;
  }

  get areElementsVerticallyCenteredCanvas() {
    return this.collection.bounds.y + this.collection.bounds.height / 2 === this.canvas.height / 2;
  }

  get areElementsHorizontallyCenteredCanvas() {
    return this.collection.bounds.x + this.collection.bounds.width / 2 === this.canvas.width / 2;
  }


  topAlignCanvas(): void {
		const minY = -this.collection.bounds.y;

		this.collection.elements.forEach((element) => {
			element.updateBounds({ y: minY, x: 0, width: 0, height: 0 });
		});
	}

	leftAlignCanvas(): void {
		const minX = -this.collection.bounds.x;

		this.collection.elements.forEach((element) => {
			element.updateBounds({ x: minX, y: 0, width: 0, height: 0 });
		});
	}

	bottomAlignCanvas(): void {
		const verticalAdjustment = canvasStore.height - this.collection.bounds.height - this.collection.bounds.y;
		this.collection.elements.forEach((element) => {
			element.updateBounds({ y: verticalAdjustment, x: 0, width: 0, height: 0 });
		});
	}

	rightAlignCanvas(): void {
		const horizontalAdjustment = canvasStore.width - this.collection.bounds.width - this.collection.bounds.x;
		this.collection.elements.forEach((element) => {
			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}

	centerVerticallyCanvas(): void {
		const selectionMiddle = this.findVerticalMiddle();
		const canvasMiddle = canvasStore.height / 2;
		const verticalAdjustment = canvasMiddle - selectionMiddle;

		this.collection.elements.forEach((element) => {
			element.updateBounds({ y: verticalAdjustment, x: 0, width: 0, height: 0 });
		});
	}

	centerHorizontallyCanvas(): void {
		const selectionMiddle = this.findHorizontalMiddle();
		const canvasMiddle = canvasStore.width / 2;
		const horizontalAdjustment = canvasMiddle - selectionMiddle;

		this.collection.elements.forEach((element) => {
			element.updateBounds({ x: horizontalAdjustment, y: 0, width: 0, height: 0 });
		});
	}
  
}