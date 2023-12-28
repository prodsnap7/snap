<script lang="ts">
	import { type CanvasElement, Curve, Shape, Group, PathShape, TextBox } from '$lib/store';
	import RenderCurve from './render-curve';
	import RenderGroup from './render-group/render-group.svelte';
	import RenderPathShape from './render-path-shape.svelte';
	import RenderShape from './render-shape.svelte';
	import RenderText from './render-text.svelte';

	type Props = {
		element: CanvasElement;
		scale?: number;
		offset?: { x: number; y: number };
	};

	let { element, scale = 1, offset = { x: 0, y: 0 } } = $props<Props>();
</script>

{#if element instanceof PathShape}
	<div
		class="absolute top-0 left-0 origin-center"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderPathShape {scale} {element} />
	</div>
{:else if element instanceof Shape}
	<div
		class="absolute top-0 left-0 origin-center"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderShape {scale} shape={element} />
	</div>
{:else if element instanceof Curve}
	<div class="absolute origin-center inset-0">
		<RenderCurve {scale} curve={element} />
	</div>
{:else if element instanceof Group}
	<RenderGroup {scale} group={element} />
{:else if element instanceof TextBox}
	<div
		class="absolute top-0 left-0 origin-center"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderText hide={element.state === 'editing'} {scale} text={element} />
	</div>
{/if}
