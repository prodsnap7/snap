import { Curve, type PartialCurve } from "$lib/store/elements/curve.svelte";

const CURVES: PartialCurve[] = [
  {
    stroke: "red",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0, type: "point" },
      { x: 100, y: 100, type: "point" }
    ]
  },
  {
    stroke: "red",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0, type: "point" },
      { x: 100, y: 100, type: "point" },
      { x: 200, y: 0, type: "point" }
    ]
  },
  {
    stroke: "red",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0, type: "point" },
      { x: 100, y: 100, type: "point" },
      { x: 200, y: 0, type: "point" },
      { x: 300, y: 100, type: "point" }
    ]
  },
  {
    stroke: "red",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0, type: "point" },
      { x: 100, y: 100, type: "point" },
      { x: 200, y: 0, type: "point" },
      { x: 300, y: 100, type: "point" },
      { x: 400, y: 0, type: "point" }
    ]
  },
  {
    stroke: "red",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0, type: "point" },
      { x: 100, y: 100, type: "point" },
      { x: 200, y: 0, type: "point" },
      { x: 300, y: 100, type: "point" },
      { x: 400, y: 0, type: "point" },
      { x: 500, y: 100, type: "point" }
    ]
  },
]

export const curves = CURVES.map(c => new Curve(c));