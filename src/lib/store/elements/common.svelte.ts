import type { Curve, Group, IShape, PartialCurve, Shape } from "..";

export interface IBaseObject {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export interface IBaseMethods {
  clone(): CanvasElement;
  colors: string[];
}


export type CanvasElement = Shape | Curve | Group;
export type CanvasObject = Partial<IShape> | PartialCurve