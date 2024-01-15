import { getBounds } from '$lib/utils/bounds-utils';
import { BaseObject } from '..';

interface IClipShape {
	get type(): 'circle' | 'rectangle';
	set type(type: 'circle' | 'rectangle');
	get clip(): string;
	get rect(): { x: number; y: number; width: number; height: number };
	updateBounds({
		x,
		y,
		width,
		height
	}: {
		x: number;
		y: number;
		width: number;
		height: number;
	}): void;
}

class ImageClip implements IClipShape {
	stroke = $state('#000000');
	strokeWidth = $state(0);
	private shape: IClipShape = $state(new RectangleShape(0, 0, 100, 100));

	constructor(shape: IClipShape) {
		this.shape = shape;
	}

	setShape(shape: IClipShape) {
		this.shape = shape;
	}

	get clip(): string {
		return this.shape.clip;
	}

	setType(type: 'circle' | 'rectangle') {
		if (type === this.shape.type) return;

		if (type === 'circle') {
			const { x, y, width, height } = this.shape.rect;
			this.shape = new CircleShape(x, y, width, height);
		} else {
			const { x, y, width, height } = this.shape.rect;
			this.shape = new RectangleShape(x, y, width, height);
		}
	}

	get rect() {
		return this.shape.rect;
	}

	get type() {
		return this.shape.type;
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.shape.updateBounds({ x, y, width, height });
	}

	clone() {
		return new ImageClip(this.shape);
	}
}

export class RectangleShape implements IClipShape {
	type = 'rectangle' as const;
	x = $state(0);
	y = $state(0);
	width = $state(100);
	height = $state(100);

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	get clip(): string {
		return `polygon(
      ${this.x}px ${this.y}px, 
      ${this.x + this.width}px ${this.y}px, 
      ${this.x + this.width}px ${this.y + this.height}px, 
      ${this.x}px ${this.y + this.height}px
    )`;
	}

	get rect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x += x;
		this.y += y;
		this.width += width;
		this.height += height;
	}
}

export class CircleShape implements IClipShape {
	x = $state(0);
	type = 'circle' as const;
	y = $state(0);
	radius = $state(100);

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.radius = Math.min(width, height) / 2;
	}

	get clip(): string {
		return `circle(${this.radius}px at ${this.x + this.radius}px ${this.y + this.radius}px)`;
	}

	get rect() {
		return {
			x: this.x,
			y: this.y,
			width: this.radius * 2,
			height: this.radius * 2
		};
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x += x;
		this.y += y;
		this.radius += Math.min(width, height) / 2;
	}
}

export class Image extends BaseObject {
	colors = [''];
	type = 'image' as const;
	x = $state(0);
	y = $state(0);
	width = $state(100);
	height = $state(100);
	url = $state('');
	loading = $state(false);
	public_id = $state('');
	thumb_url = $state('');
	alt = $state('');
	// clipPath: ImageClip = $state(new ImageClip(new RectangleShape(0, 0, 100, 100)));
	clipType = $state('rectangle');
	clipX = $state(0);
	clipY = $state(0);
	clipWidth = $state(100);
	clipHeight = $state(100);
	rotation = $state(0);
	_bounds = $derived(getBounds([this]));

	constructor(obj: Partial<Image>) {
		super(obj);
		Object.assign(this, obj);
	}

	get bounds(): { x: number; y: number; width: number; height: number } {
		return this._bounds;
	}

	get clipPath() {
		if (this.clipType === 'rectangle') {
			return `polygon(
				${this.clipX}px ${this.clipY}px,
				${this.clipX + this.clipWidth}px ${this.clipY}px,
				${this.clipX + this.clipWidth}px ${this.clipY + this.clipHeight}px,
				${this.clipX}px ${this.clipY + this.clipHeight}px
			)`
		} else if (this.clipType === 'circle') {
			this.clipHeight = this.clipWidth;
			return `circle(${this.clipWidth / 2}px at ${this.clipX + this.clipWidth / 2}px ${this.clipY + this.clipWidth / 2}px)`
		}
	}

	updateClipBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		if (this.clipType === 'rectangle') {
			this.clipX += x;
			this.clipY += y;
			this.clipWidth += width;
			this.clipHeight += height;
		} else if (this.clipType === 'circle') {
			this.clipX += x;
			this.clipY += y;
			this.clipWidth += Math.max(width, height);
			this.clipHeight = this.clipWidth;
			// this.clipHeight += Math.min(width, height);
		}
	}

	get rect() {
		return {
			x: this.x + this.clipX,
			y: this.y + this.clipY,
			width: this.clipWidth,
			height: this.clipType === 'rectangle' ? this.clipHeight : this.clipWidth
		};
	}

	clone(): Image {
		return new Image({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			clipHeight: this.clipHeight,
			clipWidth: this.clipWidth,
			clipX: this.clipX,
			clipY: this.clipY,
			clipType: this.clipType,
			type: this.type,
			rotation: this.rotation,
			opacity: this.opacity,
			url: this.url,
			public_id: this.public_id,
			thumb_url: this.thumb_url,
			alt: this.alt
		});
	}

	toObject() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			clipHeight: this.clipHeight,
			clipWidth: this.clipWidth,
			clipX: this.clipX,
			clipY: this.clipY,
			clipType: this.clipType,
			type: this.type,
			rotation: this.rotation,
			opacity: this.opacity,
			url: this.url,
			public_id: this.public_id,
			thumb_url: this.thumb_url,
			alt: this.alt
		};
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x += x;
		this.y += y;
		this.width += width;
		this.height += height;
		// this.clipWidth += width;
		// this.clipHeight += height;
		this.updateClipBounds({ x:0 , y: 0, width, height });
	}

	move({ x, y }: { x: number; y: number }) {
		this.x += x;
		this.y += y;
	}
}
