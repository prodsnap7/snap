import { Curve, type PartialCurve } from "$lib/store/elements/curve.svelte";

const CURVES: PartialCurve[] = [
  {
    stroke: "red",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0, type: "point" },
      { x: 100, y: 0, type: "point" }
    ]
  },
  {
    stroke: "red",
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
        y: 50
      },
      {
        type: 'point' as const,
        x: 300,
        y: 10
      }
    ]
  },
  {
    stroke: "red",
    strokeWidth: 1,
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
        x: 300,
        y: 100
      }
    ]
  },
  {
    stroke: "red",
    strokeWidth: 1,
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
        x: 300,
        y: 100
      }
    ]
  },
  {
    stroke: "red",
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
        y: 100
      },
      {
        type: 'point' as const,
        x: 200,
        y: 0
      },
      {
        type: 'point' as const,
        x: 300,
        y: 50
      }
    ]
  },
]

export const curves = CURVES.map(c => new Curve(c));