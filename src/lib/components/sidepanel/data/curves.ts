import { Curve, type PartialCurve } from "$lib/store/elements/curve.svelte";

const CURVES: PartialCurve[] = [
  {
    type: "curve",
    stroke: "#262626",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0, type: "point" },
      { x: 150, y: 0, type: "point" }
    ]
  },
  {
    type: "curve",
    stroke: "#262626",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      {
        type: 'point' as const,
        x: 10,
        y: 10
      },
      {
        type: 'point' as const,
        x: 100,
        y: 20
      },
      {
        type: 'point' as const,
        x: 150,
        y: 10
      }
    ]
  },
  {
    type: "curve",
    stroke: "#262626",
    strokeWidth: 1,
    pathType: "quadratic",
    strokeDasharray: "",
    points: [
      {
        type: 'point' as const,
        x: 10,
        y: 100
      },
      {
        type: 'point' as const,
        x: 100,
        y: 0
      },
      {
        type: 'point' as const,
        x: 150,
        y: 100
      }
    ]
  },
  {
    type: "curve",
    stroke: "#262626",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      {
        type: 'point' as const,
        x: 10,
        y: 50
      },
      {
        type: 'point' as const,
        x: 100,
        y: 0
      },
      {
        type: 'point' as const,
        x: 150,
        y: 100
      }
    ]
  },
  {
    type: "curve",
    stroke: "#262626",
    strokeWidth: 1,
    pathType: "quadratic",
    strokeDasharray: "",
    points: [
      {
        type: 'point' as const,
        x: 10,
        y: 50
      },
      {
        type: 'point' as const,
        x: 100,
        y: 100
      },
      {
        type: 'point' as const,
        x: 150,
        y: 0
      },
      {
        type: 'point' as const,
        x: 150,
        y: 50
      }
    ]
  },
]

export const curves = CURVES.map(c => new Curve(c));