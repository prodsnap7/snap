<script lang="ts">
	import type { CanvasElement } from '$lib/store';
	import RenderCurve from './render-curve';
	import RenderGroup from './render-group/render-group.svelte';
	import RenderImage from './render-image.svelte';
	import RenderPathShape from './render-path-shape.svelte';
	import RenderShape from './render-shape.svelte';
	import RenderSvg from './render-svg.svelte';
	import RenderText from './render-text.svelte';

	type Props = {
		element: CanvasElement;
		scale?: number;
		offset?: { x: number; y: number };
	};

	let { element, scale = 1, offset = { x: 0, y: 0 } } = $props<Props>();
</script>

{#if element.type === 'path-shape'}
	<div
		class="absolute top-0 left-0 origin-center renderer"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderPathShape {scale} {element} />
	</div>
{:else if element.type === 'shape'}
	<div
		class="absolute top-0 left-0 origin-center renderer"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderShape {scale} shape={element} />
	</div>
{:else if element.type === 'svg'}
	<div
		class="absolute top-0 left-0 origin-center renderer"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderSvg {element} />
	</div>
{:else if element.type === 'image'}
	<RenderImage {scale} {element} />
{:else if element.type === 'curve'}
	<div class="absolute origin-center inset-0 renderer">
		<RenderCurve {scale} curve={element} />
	</div>
{:else if element.type === 'group'}
	<RenderGroup {scale} group={element} />
{:else if element.type === 'text'}
	<div
		class="absolute top-0 left-0 origin-center renderer"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderText {scale} text={element} />
	</div>
{/if}
