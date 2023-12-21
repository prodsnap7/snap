<script lang="ts">
	import type { Curve } from '$lib/store/elements/curve.svelte';

	type Props = {
		curve: Curve;
		scale?: number;
	};

	const { curve } = $props<Props>();
	const width = $derived(curve.bounds.width);
	const height = $derived(curve.bounds.height);
</script>

<svg
	vector-effect="non-scaling-stroke"
	style="
    min-height: 1px;
    min-width: 1px;
    overflow: visible;
    display: block;
    position: absolute;
    width: {width}px;
    height: {height}px;
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
