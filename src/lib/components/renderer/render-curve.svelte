<script lang="ts">
	import type { ICurve } from '$lib/store/elements/curve.svelte';

	type Props = {
		curve: ICurve;
		scale?: number;
		offset?: { x: number; y: number };
	};

	const { curve, scale = 1, offset = { x: 0, y: 0 } } = $props<Props>();
	const points = curve.points;
	points.forEach((point) => {
		point.x = point.x * scale - offset.x;
		point.y = point.y * scale - offset.y;
	});
</script>

<svg
	vector-effect="non-scaling-stroke"
	style="
    min-height: 1px;
    min-width: 1px;
    overflow: visible;
    display: block;
    position: absolute;
    width: {curve.width}px;
    height: {curve.height}px;
  "
>
	<g>
		<g style="user-select: none;">
			<path
				class="hover:shadow"
				d={curve.path}
				fill="none"
				stroke-width="32"
				opacity="0"
				pointer-events="stroke"
				stroke-linecap="round"
				stroke="transparent"
			/>
			<path
				fill="none"
				stroke-linecap="round"
				pointer-events="auto"
				d={curve.path}
				stroke-width={curve.strokeWidth}
				stroke={curve.stroke}
				stroke-dasharray={curve.strokeDasharray}
			/>
		</g>
	</g>
</svg>
