import shortUUID from 'short-uuid';
import { BaseObject, type CanvasElement } from './common.svelte';
import { Image, Shape, TextBox, Curve, PathShape } from '..';
import { getBounds } from '$lib/utils/bounds-utils';

export class Group extends BaseObject {
	type = 'group' as const;
	id = shortUUID.generate();
	elements = $state<CanvasElement[]>([]);
	opacity = $state(1);
	private _rotation = $state(0);
	private _bounds = $derived(getBounds(this.elements));

	constructor(obj: Partial<Group>) {
		super(obj);
		if (obj.elements) {
			this.elements = obj.elements;
		}
		if (obj.opacity) {
			this.opacity = obj.opacity;
		}

		if (obj.rotation) {
			this._rotation = obj.rotation;
		}
	}

	get bounds(): { x: number; y: number; width: number; height: number } {
		return this._bounds;
	}

	get colors(): string[] {
		return this.elements.map((element) => element.colors).flat();
	}

	get rotation(): number {
		if (this.elements.length === 1) {
			return this.elements[0].rotation;
		} else {
			return this._rotation;
		}
	}

	get rect(): { x: number; y: number; width: number; height: number } {
		// loop over elements and get min x, min y, max x + width, max y + height
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;

		this.elements.forEach((element) => {
			const { x, y, width, height } = element.bounds;
			minX = Math.min(minX, x);
			minY = Math.min(minY, y);
			maxX = Math.max(maxX, x + width);
			maxY = Math.max(maxY, y + height);
		});

		return {
			x: minX,
			y: minY,
			width: maxX - minX,
			height: maxY - minY
		};
	}

	set rotation(value: number) {
		this._rotation = value;
	}

	move({ x, y }: { x: number; y: number }) {
		this.elements.forEach((element) => {
			element.move({ x, y });
		});
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

	clone(): Group {
		return new Group({
			type: 'group',
			elements: this.elements.map((e) => e.clone())
		});
	}

	toObject(): any {
		const elements = this.elements.map((e) => e.toObject());
		return {
			type: 'group',
			elements: this.elements.map((e) => e.toObject())
		};
	}

	ungroup(): CanvasElement[] {
		return this.elements.map((element) => {
			const el = element.clone();
			el.rotation += this.rotation;

			return el;
		});
	}

	static fromObject(obj: any): Group {
		return new Group({
			type: 'group',
			rotation: obj.rotation,
			elements: obj.elements.map((e: any) => {
				switch (e.type) {
					case 'image':
						return new Image(e);
					case 'shape':
						return new Shape(e);
					case 'text':
						return new TextBox(e);
					case 'curve':
						return new Curve(e);
					case 'path-shape':
						return new PathShape(e);
					
					default:
						throw new Error(`Unknown element type: ${e.type}`);
				}
			})
		});
	}
}
