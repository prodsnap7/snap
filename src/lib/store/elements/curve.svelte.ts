import shortUUID from "short-uuid";
import { BaseObject, type IBaseMethods, type IBaseObject } from "./common.svelte";

export interface IPoint {
  x: number;
  y: number;
}

export class Point implements IPoint {
  x = $state(0);
  y = $state(0);
  type = "point" as const;

  constructor(obj: IPoint, scale = 1) {
    this.x = obj.x * scale;
    this.y = obj.y * scale;
  }

  clone() {
    return new Point({
      x: this.x,
      y: this.y,
    });
  }
}

export interface ICurve extends IBaseObject {
  type: "curve";
  points: Point[];
  path: string;
  stroke: string;
  strokeWidth: number;
  isQuadratic: boolean;
  strokeDasharray: string;
}

export type PartialCurve = {
  type: "curve";
  points: IPoint[];
  stroke: string;
  pathType?: "linear" | "quadratic" | "cubic";
  strokeWidth: number;
  strokeDasharray: string;
  markerSize?: number;
  startMarker?: MarkerType;
  endMarker?: MarkerType;
}

export type MarkerType = "none" | "fill-arrow" | "outline-arrow" | "fill-circle" | "outline-circle";

export class Curve extends BaseObject {
  type = "curve" as const;
  id = shortUUID.generate();
  markerId = shortUUID.generate();
  stroke = $state("#000000");
  isQuadratic = $state(false);
  strokeWidth = $state(2);
  strokeDasharray = $state("");
  points = $state<Point[]>([]);
  opacity = $state(1);
  pathType = $state("linear");
  path = $derived(getPathFromPoints(this.points, this.pathType))
  startMarker = $state<MarkerType>("none");
  endMarker = $state<MarkerType>("none");
  markerSize = $state(20);

  constructor(obj: Partial<Curve>, scale = 1) {
    super(obj);
    const { points, ...rest } = obj;
    Object.assign(this, rest);

    if (obj.points) {
      this.points = obj.points.map(p => new Point(p, scale));
    }
  }

  get rotation() {
    return 0;
  }

  set rotation(val: number) {
    //
  }

  getScaledPath(scale: number) {
    return getPathFromPoints(this.points.map(p => ({ x: p.x * scale, y: p.y * scale })), this.pathType);
  }

  get x() {
    return this.points.reduce((acc, cur) => Math.min(acc, cur.x), Infinity);
  }

  get y() {
    return this.points.reduce((acc, cur) => Math.min(acc, cur.y), Infinity);
  }

  get width() {
    return this.points.reduce((acc, cur) => Math.max(acc, cur.x), -Infinity) - this.x;
  }

  get height() {
    return this.points.reduce((acc, cur) => Math.max(acc, cur.y), -Infinity) - this.y + 1;
  }

  set x(val: number) {
    this.points.forEach(p => { p.x = val + p.x });
  }

  set y(val: number) {
    this.points.forEach(p => { p.y = val + p.y });
  }

  set width(val: number) {
    //
  }

  set height(val: number) {
    //
  }

  get colors() {
    return [this.stroke];
  }

  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.points.forEach(p => {
      p.x += x;
      p.y += y;
    })
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }

  get rect() {
    return this.bounds;
  }

  clone(scale = 1) {
    return new Curve({
      type: "curve",
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      startMarker: this.startMarker,
      endMarker: this.endMarker,
      markerSize: this.markerSize,
      strokeDasharray: this.strokeDasharray,
      points: this.points.map(p => p.clone()),
      pathType: this.pathType as "linear" | "quadratic" | "cubic"
    }, scale);
  }

  static fromObject(obj: Partial<Curve>) {
    return new Curve(obj);
  }
}

/**
 * Enum for path types.
 */
const PathType = {
  LINEAR: 'linear',
  QUADRATIC: 'quadratic',
  CUBIC: 'cubic'
};

/**
 * Generates a path data string from a list of points.
 * The path can be linear, quadratic, or cubic Bezier.
 *
 * @param {IPoint[]} points - Array of points to create the path.
 * @param {string} pathType - Type of the path (linear, quadratic, cubic).
 * @return {string} - The SVG path data string.
 */
export const getPathFromPoints = (points: IPoint[], pathType = PathType.LINEAR) => {
  if (points.length < 2) {
    throw new Error('getPathFromPoints requires at least two points to create a path.');
  }

  let pathData = `M${points[0].x} ${points[0].y}`;

  switch (pathType) {
    case PathType.QUADRATIC:
      pathData += generateQuadraticPath(points);
      break;
    case PathType.CUBIC:
      pathData += generateCubicPath(points);
      break;
    case PathType.LINEAR:
    default:
      pathData += generateLinearPath(points);
  }

  return pathData;
};

// ... (generateLinearPath, generateQuadraticPath, generateCubicPath functions remain the same)

// Generate linear path data
function generateLinearPath(points: IPoint[]) {
  return points.slice(1).map(point => ` L${point.x} ${point.y}`).join('');
}

// Generate quadratic path data
function generateQuadraticPath(points: IPoint[]) {
  let pathData = '';
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    pathData += ` Q${points[i].x} ${points[i].y} ${midX} ${midY}`;
  }
  pathData += ` L${points[points.length - 1].x} ${points[points.length - 1].y}`;
  return pathData;
}

// Generate cubic path data
function generateCubicPath(points: IPoint[]) {
  let pathData = '';
  for (let i = 1; i < points.length - 2; i += 3) {
    if (i + 2 < points.length) {
      const p1 = points[i], p2 = points[i + 1], p3 = points[i + 2];
      pathData += ` C${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`;
    }
  }
  return pathData;
}