import type { IBaseObject } from "./common.svelte";

export interface IPoint {
  x: number;
  y: number;
  type: "point";
}

export interface CurveProps {
  clone(): Curve;
}

export interface ICurve extends IBaseObject {
  type: "curve";
  points: IPoint[];
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
  points = $state<IPoint[]>([]);
  rotation = $state(0);
  opacity = $state(1);

  constructor(obj: PartialCurve) {
    this.stroke = obj.stroke;
    this.strokeWidth = obj.strokeWidth;
    this.strokeDasharray = obj.strokeDasharray;
    this.points = obj.points;
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
    this.points.forEach(p => p.x += val);
  }

  set y(val: number) {
    this.points.forEach(p => p.y += val);
  }

  clone() {
    return new Curve({
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      strokeDasharray: this.strokeDasharray,
      points: this.points.map(p => ({ ...p }))
    });
  }
}