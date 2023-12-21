import { Shape, type IShape } from "$lib/store/elements/shape.svelte";

const SHAPES: Partial<IShape>[] = [
  // square
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    opacity: 1,
    stroke: "#4a4b4d",
    fill: "#efefef",
    strokeWidth: 2,
    radius: 0,
    strokeType: "solid"
  },
  // rectangle
  // square with rounded corners
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    opacity: 1,
    stroke: "#4a4b4d",
    fill: "#efefef",
    strokeWidth: 2,
    radius: 10,
    strokeType: "solid"
  },

  // circle
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    opacity: 1,
    stroke: "#4a4b4d",
    fill: "#efefef",
    strokeWidth: 2,
    radius: 50,
    strokeType: "solid"
  },
  {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    rotation: 0,
    opacity: 1,
    stroke: "#4a4b4d",
    fill: "#efefef",
    strokeWidth: 2,
    radius: 0,
    strokeType: "solid"
  },

  // ellipse
  {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    rotation: 0,
    opacity: 1,
    stroke: "#4a4b4d",
    fill: "#efefef",
    strokeWidth: 2,
    radius: 50,
    strokeType: "solid"
  },

  // rectangle with rounded corners
  {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    rotation: 0,
    opacity: 1,
    stroke: "#4a4b4d",
    fill: "#efefef",
    strokeWidth: 2,
    radius: 10,
    strokeType: "solid"
  },
]

export const shapes = SHAPES.map(shape => Shape.fromObject(shape))