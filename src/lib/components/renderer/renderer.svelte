<script lang="ts">
	import type { CanvasElement } from '$lib/store';
	import RenderCurve from './render-curve';
	import RenderGroup from './render-group/render-group.svelte';
	import RenderShape from './render-shape.svelte';

	type Props = {
		element: CanvasElement;
		scale?: number;
		offset?: { x: number; y: number };
	};

	let { element, scale = 1, offset = { x: 0, y: 0 } } = $props<Props>();
</script>

{#if element.type === 'shape'}
	<div
		class="absolute top-0 left-0 origin-center"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg)"
	>
		<RenderShape {scale} shape={element} />
	</div>
{:else if element.type === 'curve'}
	<div class="absolute origin-center inset-0">
		<RenderCurve {scale} curve={element} />
	</div>
{:else if element.type === 'group'}
	<RenderGroup {scale} group={element} />
{/if}
