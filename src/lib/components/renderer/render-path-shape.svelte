<script lang="ts">
	import type { PathShape } from '$lib/store/elements/shape.svelte';

	type Props = {
		element: PathShape;
		scale?: number;
	};

	let { element } = $props<Props>();
</script>

<svg
	class="absolute inset-0"
	origin="center"
	opacity={element.opacity}
	viewBox={element.viewBox}
	style="width: {element.width + element.strokeWidth}px; height: {element.height +
		element.strokeWidth}px; padding: {element.strokeWidth / 2}px;"
>
	<defs>
		<clipPath id={element.clipPathId}>
			<path d={element.path + 'Z'} />
		</clipPath>
	</defs>
	<path
		d={element.path + 'Z'}
		clip-path={`url(#${element.clipPathId})`}
		stroke={element.stroke}
		stroke-width={element.strokeWidth}
		stroke-linecap={element.strokeLinecap as any}
		stroke-linejoin="miter"
		stroke-dasharray={element.strokeDasharray}
		fill={element.fill}
		vector-effect="non-scaling-stroke"
	/>
</svg>
