import type { Curve, IShape, PartialCurve, Shape } from "..";

export interface IBaseObject {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}


export type CanvasElement = Shape | Curve;
export type CanvasObject = Partial<IShape> | PartialCurve