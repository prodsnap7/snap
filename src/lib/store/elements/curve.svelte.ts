import type { IBaseObject } from "./common.svelte";

export interface IPoint {
  x: number;
  y: number;
  type: "point";
}

export class Point implements IPoint {
  x = $state(0);
  y = $state(0);
  type = "point" as const;

  constructor(obj: IPoint) {
    this.x = obj.x;
    this.y = obj.y;
  }

  clone() {
    return new Point({
      x: this.x,
      y: this.y,
      type: this.type
    });
  }
}

export interface CurveProps {
  clone(): Curve;
}

export interface ICurve extends IBaseObject {
  type: "curve";
  points: Point[];
  path: string;
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
}

export type PartialCurve = {
  points: IPoint[];
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
}

export class Curve implements ICurve, CurveProps {
  type = "curve" as const;
  stroke = $state("#000000");
  strokeWidth = $state(1);
  strokeDasharray = $state("");
  points = $state<Point[]>([]);
  rotation = $state(0);
  opacity = $state(1);
  path = $derived(getPathFromPoints(this.points))

  constructor(obj: PartialCurve) {
    this.stroke = obj.stroke;
    this.strokeWidth = obj.strokeWidth;
    this.strokeDasharray = obj.strokeDasharray;
    this.points = obj.points.map(p => new Point(p));
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
    return this.points.reduce((acc, cur) => Math.max(acc, cur.y), -Infinity) - this.y;
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

  clone() {
    return new Curve({
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      strokeDasharray: this.strokeDasharray,
      points: this.points.map(p => p.clone())
    });
  }
}


export const getPathFromPoints = (points: IPoint[], isQuadratic = false): string => {
  console.log("getPathFromPoints", points)
  if (points.length < 2) {
    throw new Error('At least two points are required to create a path.');
  }

  let pathData = `M${points[0].x} ${points[0].y}`;

  if (isQuadratic && points.length > 2) {
    for (let i = 1; i < points.length - 1; i++) {
      // const p0 = points[i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];

      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      pathData += ` Q${p1.x} ${p1.y} ${midX} ${midY}`;
    }
    const lastPoint = points[points.length - 1];
    pathData += ` L${lastPoint.x} ${lastPoint.y}`;
  } else {
    for (let i = 1; i < points.length; i++) {
      pathData += ` L${points[i].x} ${points[i].y}`;
    }
  }

  return pathData;
};