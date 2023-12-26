import { Curve, Point, type MarkerType, type PartialCurve } from '$lib/store/elements/curve.svelte';

const CURVES: PartialCurve[] = [
	{
		type: 'curve',
		stroke: '#262626',
		strokeWidth: 1,
		strokeDasharray: '',
		points: [
			{ x: 0, y: 0 },
			{ x: 150, y: 0 }
		]
	},
	{
		type: 'curve',
		strokeWidth: 2,
		stroke: 'black',
		strokeDasharray: '',
		startMarker: 'fill-arrow',
		markerSize: 30,
		endMarker: 'outline-circle',
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
				x: 200,
				y: 0
			},
			{
				x: 300,
				y: 50
			}
		]
	},
	{
		type: 'curve',
		stroke: '#262626',
		strokeWidth: 1,
		markerSize: 20,
		startMarker: 'fill-arrow',
		strokeDasharray: '',
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
		type: 'curve',
		stroke: '#262626',
		strokeWidth: 1,
		pathType: 'quadratic',
		strokeDasharray: '',
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
		type: 'curve',
		stroke: '#262626',
		strokeWidth: 1,
		strokeDasharray: '',
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
		type: 'curve',
		stroke: '#262626',
		strokeWidth: 1,
		pathType: 'quadratic',
		strokeDasharray: '',
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
	}
];

const markers: MarkerType[] = [
	'none',
	'fill-arrow',
	'outline-arrow',
	'outline-circle',
	'fill-circle'
];
export const StaightLines = markers.flatMap((startMarker) =>
	markers.map((endMarker) => ({
		strokeWidth: 2,
		strokeDasharray: '',
		stroke: 'black',
		startMarker: startMarker,
		markerSize: 30,
		endMarker: endMarker,
		points: [
			{
				x: 10,
				y: 10
			},
			{
				x: 300,
				y: 10
			}
		]
	}))
);

export const CURVES_DATA = [
	...StaightLines,
	{
		strokeDasharray: '',
		strokeWidth: 2,
		stroke: 'black',
		startMarker: 'none' as MarkerType,
		markerSize: 30,
		endMarker: 'none' as MarkerType,
		points: [
			{
				x: 10,
				y: 10
			},
			{
				x: 100,
				y: 50
			},
			{
				x: 300,
				y: 10
			}
		]
	},
	{
		strokeDasharray: '',
		strokeWidth: 2,
		stroke: 'black',
		startMarker: 'none' as MarkerType,
		markerSize: 30,
		endMarker: 'none' as MarkerType,
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
				x: 300,
				y: 100
			}
		]
	},
	{
		strokeDasharray: '',
		strokeWidth: 2,
		isQuadratic: true,
		stroke: 'black',
		startMarker: 'none' as MarkerType,
		markerSize: 30,
		endMarker: 'none' as MarkerType,
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
				x: 300,
				y: 100
			}
		]
	},
	{
		strokeDasharray: '',
		strokeWidth: 2,
		isQuadratic: true,
		stroke: 'black',
		startMarker: 'fill-arrow' as MarkerType,
		markerSize: 30,
		endMarker: 'fill-circle' as MarkerType,
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
				x: 200,
				y: 0
			},
			{
				x: 300,
				y: 50
			}
		]
	},
	{
		strokeDasharray: '',
		strokeWidth: 2,
		isQuadratic: true,
		stroke: 'black',
		startMarker: 'fill-arrow' as MarkerType,
		markerSize: 30,
		endMarker: 'outline-circle' as MarkerType,
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
				x: 200,
				y: 0
			},
			{
				x: 300,
				y: 50
			}
		]
	},
	{
		strokeDasharray: '',
		strokeWidth: 2,
		isQuadratic: false,
		stroke: 'black',
		startMarker: 'none' as MarkerType,
		markerSize: 30,
		endMarker: 'none' as MarkerType,
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
				x: 200,
				y: 0
			},
			{
				x: 300,
				y: 50
			}
		]
	},
	{
		strokeDasharray: '',
		strokeWidth: 2,
		isQuadratic: true,
		stroke: 'black',
		startMarker: 'none' as MarkerType,
		markerSize: 30,
		endMarker: 'none' as MarkerType,
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
				x: 200,
				y: 0
			},
			{
				x: 300,
				y: 50
			}
		]
	},
	{
		strokeDasharray: '',
		strokeWidth: 2,
		isQuadratic: false,
		stroke: 'black',
		startMarker: 'fill-arrow' as MarkerType,
		markerSize: 30,
		endMarker: 'outline-circle' as MarkerType,
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
				x: 200,
				y: 0
			},
			{
				x: 300,
				y: 50
			}
		]
	}
];

export const curves = CURVES_DATA.map(
	(c) => new Curve({ ...c, points: c.points.map((p) => new Point(p)), type: 'curve' }, 0.25)
);
