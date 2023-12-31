import { getBounds } from '$lib/utils/bounds-utils';
import { BaseObject } from '..';

interface IClipShape {
	get clip(): string;
}

class ImageClip {
	stroke = $state('#000000');
	strokeWidth = $state(0);
  private shape: IClipShape;

	constructor(shape: IClipShape) {
    this.shape = shape;
	}

  setShape(shape: IClipShape) {
    this.shape = shape;
  }

  get clip(): string {
    return this.shape.clip;
  }
}

export class RectangleShape implements IClipShape {
  x = $state(0);
	y = $state(0);
	width = $state(100);
	height = $state(100);

	constructor(
		x: number,
		y: number,
		width: number,
		height: number
	) {
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
}

export class CircleShape implements IClipShape {
  x = $state(0);
  y = $state(0);
  radius = $state(100);

	constructor(
		x: number,
		y: number,
		radius: number
	) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

	get clip(): string {
		return `circle(${this.radius}px at ${this.x}px ${this.y}px)`;
	}
}

export class Image extends BaseObject {
	colors = [''];
	type = 'image';
	x = $state(0);
	y = $state(0);
	width = $state(100);
	height = $state(100);
	url = $state('');
	public_id = $state('');
	thumb_url = $state('');
	alt = $state('');
	clip: ImageClip;
	rotation = $state(0);
  _bounds = $derived(getBounds([this]));

	constructor(obj: Partial<Image>) {
		super(obj);
		Object.assign(this, obj);
		this.clip = new ImageClip(
      new RectangleShape(this.x, this.y, this.width, this.height)
    );
	}

  get bounds(): { x: number; y: number; width: number; height: number } {
		return this._bounds;
	}

	get rect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};
	}

	clone(): Image {
		return new Image({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      type: this.type,
      rotation: this.rotation,
      opacity: this.opacity,
      url: this.url,
      public_id: this.public_id,
      thumb_url: this.thumb_url,
      alt: this.alt,
    });
	}

  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x += x;
		this.y += y;
		this.width += width;
		this.height += height;
	}
}
