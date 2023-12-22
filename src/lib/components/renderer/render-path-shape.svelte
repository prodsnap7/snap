<script lang="ts">
	import type { PathShape } from '$lib/store/elements/shape.svelte';

	type Props = {
		element: PathShape;
		scale?: number;
	};

	let { element } = $props<Props>();
</script>

<div
	class="origin-center"
	style="
    width: {element.width}px;
    height: {element.height}px;
    background-color: {element.fill};
    opacity: {element.opacity};
		clip-path: path('{element.path}');
  "
/>

{#if element.strokeWidth > 0}
	<svg
		class="absolute inset-0"
		opacity={element.opacity}
		style="width: {element.width}px; height: {element.height}px;"
		viewBox={`${-element.strokeWidth} ${-element.strokeWidth} ${
			element.width + 2 * element.strokeWidth
		} ${element.height + 2 * element.strokeWidth}`}
	>
		<path
			d={element.path + 'Z'}
			stroke={element.stroke}
			stroke-width={element.strokeWidth}
			stroke-linecap={element.strokeLinecap as any}
			stroke-linejoin="miter"
			stroke-dasharray={element.strokeDasharray}
			fill="none"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
{/if}
