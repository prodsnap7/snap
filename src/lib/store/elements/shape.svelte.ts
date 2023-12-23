// import type { MakeOneRequired } from "$lib/utils";
import shortUUID from 'short-uuid';
import { BaseObject, type IBaseObject } from './common.svelte';

export interface IShape extends IBaseObject {
	stroke: string;
	fill: string;
	strokeWidth: number;
	radius: number;
	strokeType: string;
}

export const defaultShape: IShape = {
	x: 0,
	y: 0,
	width: 100,
	height: 100,
	rotation: 0,
	opacity: 1,
	stroke: '#000000',
	fill: '#ffffff',
	strokeWidth: 0,
	radius: 0,
	strokeType: 'solid'
};

// export type PartialShape = MakeOneRequired<IShape, "type">;
export type PartialShape = Partial<IShape>;

export class Shape extends BaseObject implements IShape {
	type = 'shape';
	stroke = $state('#000000');
	fill = $state('#ffffff');
	strokeWidth = $state(0);
	radius = $state(0);
	strokeType = $state('solid');
	colors = $derived([this.stroke, this.fill]);

	constructor(obj: IShape) {
		super({
			x: obj.x,
			y: obj.y,
			width: obj.width,
			height: obj.height,
			rotation: obj.rotation,
			opacity: obj.opacity
		});
		this.stroke = obj.stroke;
		this.fill = obj.fill;
		this.strokeWidth = obj.strokeWidth;
		this.radius = obj.radius;
		this.strokeType = obj.strokeType;
	}

	static fromObject(obj: Partial<IShape>): Shape {
		return new Shape({
			...defaultShape,
			...obj
		});
	}

	clone(): Shape {
		return new Shape({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			rotation: this.rotation,
			opacity: this.opacity,
			stroke: this.stroke,
			fill: this.fill,
			strokeWidth: this.strokeWidth,
			radius: this.radius,
			strokeType: this.strokeType
		});
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x += x;
		this.y += y;
		this.width += width;
		this.height += height;
	}

	get bounds() {
		const b = super.bounds;
		return {
			x: b.x,
			y: b.y,
			width: b.width - this.strokeWidth,
			height: b.height - this.strokeWidth
		};
	}
}

export interface IPathShape extends IShape {
	path: string;
	strokeLinecap?: string;
	strokeLinejoin?: string;
	strokeDasharray?: string;
}

export class PathShape extends Shape {
	type = 'path-shape';
	strokeLinecap = $state('butt');
	strokeLinejoin = $state('miter');
	strokeDasharray = $state('');
	_path = $state('');
	path = $derived(scalePathData(this._path, this.width, this.height, this.strokeWidth));
	clipPathId = shortUUID.generate();
	viewBox = $derived(
		`${-this.strokeWidth} ${-this.strokeWidth} ${this.width + 2 * this.strokeWidth} ${
			this.height + 2 * this.strokeWidth
		}`
	);

	constructor(obj: IPathShape) {
		super(obj);
		if (obj.strokeLinecap) this.strokeLinecap = obj.strokeLinecap;
		if (obj.strokeLinejoin) this.strokeLinejoin = obj.strokeLinejoin;
		if (obj.strokeDasharray) this.strokeDasharray = obj.strokeDasharray;
		this._path = obj.path;
	}

	clone(): PathShape {
		return new PathShape({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			rotation: this.rotation,
			opacity: this.opacity,
			stroke: this.stroke,
			fill: this.fill,
			strokeWidth: this.strokeWidth,
			radius: this.radius,
			strokeType: this.strokeType,
			strokeLinecap: this.strokeLinecap,
			strokeLinejoin: this.strokeLinejoin,
			strokeDasharray: this.strokeDasharray,
			path: this._path
		});
	}
}

type PathCommand =
	| 'M'
	| 'm'
	| 'L'
	| 'l'
	| 'H'
	| 'h'
	| 'V'
	| 'v'
	| 'C'
	| 'c'
	| 'S'
	| 's'
	| 'Q'
	| 'q'
	| 'T'
	| 't'
	| 'A'
	| 'a'
	| 'Z'
	| 'z';

export function scalePathData(
	initialPathData: string,
	width: number,
	height: number,
	strokeWidth: number
): string {
	const pathDataRegex = /([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g;

	function parseAndScaleValues(str: string, scaleX: number, scaleY: number): string {
		return str
			.trim()
			.split(/\s*,\s*|\s+/)
			.map((value, index) => {
				const numValue = parseFloat(value);
				return isNaN(numValue)
					? ''
					: (index % 2 === 0 ? numValue * scaleX : numValue * scaleY).toString();
			})
			.join(' ');
	}

	let minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity;
	initialPathData.replace(pathDataRegex, (_, __, values: string) => {
		const coords = parseAndScaleValues(values, 1, 1).split(' ');
		for (let i = 0; i < coords.length; i += 2) {
			const x = parseFloat(coords[i]);
			const y = parseFloat(coords[i + 1]);
			minX = Math.min(minX, x);
			minY = Math.min(minY, y);
			maxX = Math.max(maxX, x);
			maxY = Math.max(maxY, y);
		}
		return '';
	});

	const initialWidth = maxX - minX;
	const initialHeight = maxY - minY;
	const scaleX = (width - strokeWidth) / initialWidth;
	const scaleY = (height - strokeWidth) / initialHeight;

	const newPathData = initialPathData.replace(
		pathDataRegex,
		(_, command: PathCommand, values: string) => {
			const scaledValues = parseAndScaleValues(values, scaleX, scaleY);
			return command + scaledValues;
		}
	);

	return newPathData;
}
