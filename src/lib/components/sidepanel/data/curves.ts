import { Curve, type PartialCurve } from "$lib/store/elements/curve.svelte";

const CURVES: PartialCurve[] = [
  {
    type: "curve",
    stroke: "#262626",
    strokeWidth: 1,
    strokeDasharray: "",
    points: [
      { x: 0, y: 0,  },
      { x: 150, y: 0,  }
    ]
  },
  {
    type: "curve",
    stroke: "#262626",
    strokeWidth: 1,
    markerSize: 10,
    startMarker: "fill-arrow",
    strokeDasharray: "",
    points: [
      {
        
        x: 10,
        y: 10
      },
      {
        
        x: 100,
        y: 20
      },
      {
        
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
        
        x: 10,
        y: 100
      },
      {
        
        x: 100,
        y: 0
      },
      {
        
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
        
        x: 10,
        y: 50
      },
      {
        
        x: 100,
        y: 0
      },
      {
        
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
        
        x: 10,
        y: 50
      },
      {
        
        x: 100,
        y: 100
      },
      {
        
        x: 150,
        y: 0
      },
      {
        
        x: 150,
        y: 50
      }
    ]
  },
]

export const curves = CURVES.map(c => new Curve(c, 0.4));