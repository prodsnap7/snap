<script lang="ts">
	import type { Curve } from '$lib/store/elements/curve.svelte';
	import RenderMarker from './render-marker.svelte';

	type Props = {
		curve: Curve;
		scale?: number;
	};

	const { curve } = $props<Props>();
	// const width = $derived(curve.width);
	// const height = $derived(curve.height);
	// const x = $derived(curve.x);

	$inspect(curve.startMarker);
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
	<defs>
		<RenderMarker
			orient="start"
			type={curve.startMarker}
			id={`start-${curve.markerId}`}
			size={curve.markerSize ?? 30}
			color={curve.stroke ?? 'black'}
		/>
		<RenderMarker
			orient="end"
			type={curve.endMarker}
			id={`end-${curve.markerId}`}
			size={curve.markerSize ?? 30}
			color={curve.stroke ?? 'black'}
		/>
	</defs>
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
				marker-start={`url(#start-${curve.markerId})`}
				marker-end={`url(#end-${curve.markerId})`}
			/>
		</g>
	</g>
</svg>
