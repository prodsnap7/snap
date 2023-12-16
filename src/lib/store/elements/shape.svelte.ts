import type { MakeOneRequired } from "$lib/utils";
import type {  IBaseObject } from "./common.svelte";

export interface IShape extends IBaseObject {
  type: "shape";
  stroke: string;
  fill: string;
  strokeWidth: number;
  radius: number;
  strokeType: string;
};

export const defaultShape: IShape = {
  type: "shape",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  stroke: "#000000",
  fill: "#ffffff",
  strokeWidth: 0,
  radius: 0,
  strokeType: "solid"
};

export type PartialShape = MakeOneRequired<IShape, "type">;

export class Shape implements IShape {
  type = "shape" as const;
  x = $state(0);
  y = $state(0);
  width = $state(100);
  height = $state(100);
  rotation = $state(0);
  opacity = $state(1);
  stroke = $state("#000000");
  fill = $state("#ffffff");
  strokeWidth = $state(0);
  radius = $state(0);
  strokeType = $state("solid");

  constructor(obj: IShape) {
    this.x = obj.x;
    this.y = obj.y;
    this.width = obj.width;
    this.height = obj.height;
    this.rotation = obj.rotation;
    this.opacity = obj.opacity;
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
      type: this.type,
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

  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number}) {
    this.x += x;
    this.y += y;
    this.width += width;
    this.height += height;
  }
}