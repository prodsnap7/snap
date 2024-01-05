// import type { MakeOneRequired } from "$lib/utils";
import shortUUID from 'short-uuid';
import { BaseObject, type IBaseObject } from './common.svelte';
import { getBounds } from '$lib/utils/bounds-utils';

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
export type PartialShape = Partial<IShape> & { type: 'shape' };

export class Shape extends BaseObject implements IShape {
	x = $state(0);
	y = $state(0);
	width = $state(100);
	height = $state(100);
	type = 'shape' as const;
	stroke = $state('#000000');
	fill = $state('#ffffff');
	strokeWidth = $state(0);
	radius = $state(0);
	strokeType = $state('solid');
	colors = $derived([this.stroke, this.fill]);
	scale = $state(1);
	_rotation = $state(0);
	_bounds = $derived(getBounds([this]));

	constructor(obj: Partial<Shape>) {
		super(obj);
		Object.assign(this, obj);
	}

	static fromObject(obj: Partial<IShape>): Shape {
		return new Shape({
			...defaultShape,
			...obj
		});
	}

	get rotation() {
		return this._rotation;
	}

	set rotation(value: number) {
		this._rotation = value;
	}

	get rect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};
	}

	clone(): Shape {
		return new Shape({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			type: this.type,
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

	move({ x, y }: { x: number; y: number }) {
		this.x += x;
		this.y += y;
	}

	get bounds(): { x: number; y: number; width: number; height: number } {
		return this._bounds;
	}
}


export class PathShape extends BaseObject {
	x = $state(0);
	y = $state(0);
	width = $state(100);
	height = $state(100);
	stroke = $state('#000000');
	fill = $state('#ffffff');
	strokeWidth = $state(0);
	radius = $state(0);
	strokeType = $state('solid');
	colors = $derived([this.stroke, this.fill]);
	_rotation = $state(0);
	type = 'path-shape' as const;
	strokeLinecap = $state('butt');
	strokeLinejoin = $state('miter');
	strokeDasharray = $state('');
	scale = $state(1);
	_path = $state('');
	_bounds = $derived(getBounds([this]));
	clipPathId = shortUUID.generate();
	viewBox = $derived(
		`${-this.strokeWidth} ${-this.strokeWidth} ${this.width + 2 * this.strokeWidth} ${
			this.height + 2 * this.strokeWidth
		}`
	);

	constructor(obj: Partial<PathShape>) {
		super(obj);
		Object.assign(this, obj);
	}

	get bounds(): { x: number; y: number; width: number; height: number } {
		return this._bounds;
	}

	get path() {
		return scalePathData(this._path, this.width, this.height, this.strokeWidth);
	}

	set path(value: string) {
		this._path = value;
	}

	get rotation() {
		return this._rotation;
	}

	set rotation(value: number) {
		this._rotation = value;
	}

	get rect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};
	}

	move({ x, y }: { x: number; y: number }) {
		this.x += x;
		this.y += y;
	}

	updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.x += x;
		this.y += y;
		this.width += width;
		this.height += height;
	}

	clone(): PathShape {
		return new PathShape({
			x: this.x,
			y: this.y,
			width: this.width,
			type: this.type,
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

	function parseAndScaleValues(str: string, scaleX: number, scaleY: number, command: PathCommand): string {
			if (command === 'A' || command === 'a') {
					const params = str.trim().split(/\s*,\s*|\s+/);
					if (params.length === 7) {
							// Scale rx, ry
							params[0] = (parseFloat(params[0]) * scaleX).toString();
							params[1] = (parseFloat(params[1]) * scaleY).toString();
							// x-axis-rotation (params[2]) is not scaled
							// large-arc-flag (params[3]) and sweep-flag (params[4]) are not scaled
							// Scale x, y
							params[5] = (parseFloat(params[5]) * scaleX).toString();
							params[6] = (parseFloat(params[6]) * scaleY).toString();
							return params.join(' ');
					} else {
							return '';
					}
			} else {
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
	}

    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
    initialPathData.replace(pathDataRegex, (_, __, values: string) => {
        const coords = parseAndScaleValues(values, 1, 1, _ as PathCommand).split(' ');
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
            const scaledValues = parseAndScaleValues(values, scaleX, scaleY, command);
            return command + scaledValues;
        }
    );

    return newPathData;
}
