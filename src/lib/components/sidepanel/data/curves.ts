import { Curve, Point, type MarkerType, type PartialCurve } from '$lib/store/elements/curve.svelte';

const CURVES: PartialCurve[] = [
	{
		type: 'curve',
		strokeWidth: 1,
		strokeDasharray: '',
		points: [
			{ x: 0, y: 0 },
			{ x: 150, y: 0 }
		]
	},
	{
		type: 'curve',
		strokeWidth: 1,
		strokeDasharray: '',
		startMarker: 'fill-arrow',
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
		strokeWidth: 1,
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
		strokeWidth: 1,
		strokeDasharray: '',
		startMarker: startMarker,
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
		startMarker: 'none' as MarkerType,
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
		startMarker: 'none' as MarkerType,
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
		isQuadratic: true,
		startMarker: 'none' as MarkerType,
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
		isQuadratic: true,
		startMarker: 'fill-arrow' as MarkerType,
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
		isQuadratic: true,
		startMarker: 'fill-arrow' as MarkerType,
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
		isQuadratic: false,
		startMarker: 'none' as MarkerType,
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
		isQuadratic: true,
		startMarker: 'none' as MarkerType,
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
		isQuadratic: false,
		startMarker: 'fill-arrow' as MarkerType,
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
