import shortUUID from "short-uuid";
import type { Curve, TextBox, Group, Image, PartialCurve, Shape, PartialShape, PathShape } from "..";

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


export type CanvasElement = Shape | Curve | Group | TextBox | PathShape | Image;
export type CanvasObject = PartialShape | PartialCurve

export abstract class BaseObject {
  opacity = $state(1);
  scale = $state(1);
  id = shortUUID.generate();

  constructor(obj: Partial<BaseObject>) {
    if (obj.opacity) {
      this.opacity = obj.opacity;
    }
  }
  
  abstract clone(): CanvasElement; 
  abstract get colors(): string[];
  abstract get rotation(): number;
  abstract set rotation(value: number);
  abstract get rect(): { x: number; y: number; width: number; height: number; };

  get bounds() {
    const { x, y, width, height } = this.rect;
    const { minX, maxX, minY, maxY } = getRotatedBoundingBox(x, y, width, height, this.rotation);

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
  }
}

export function getRotatedBoundingBox(x: number, y: number, width: number, height: number, rotationDegree: number): { minX: number, maxX: number, minY: number, maxY: number } {
  const theta = rotationDegree * Math.PI / 180; // Convert to radians
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  // Function to rotate a point
  const rotatePoint = (px: number, py: number): [number, number] => {
      const dx = px - centerX;
      const dy = py - centerY;
      const rotatedX = Math.cos(theta) * dx - Math.sin(theta) * dy + centerX;
      const rotatedY = Math.sin(theta) * dx + Math.cos(theta) * dy + centerY;
      return [rotatedX, rotatedY];
  };

  // Rotate each corner of the rectangle
  const corners = [
      rotatePoint(x, y),
      rotatePoint(x + width, y),
      rotatePoint(x, y + height),
      rotatePoint(x + width, y + height)
  ];

  // Calculate the bounding box
  const xs = corners.map(corner => corner[0]);
  const ys = corners.map(corner => corner[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return { minX, maxX, minY, maxY };
}
