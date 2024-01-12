<script lang="ts">
	import {
		type CanvasElement,
		Curve,
		Shape,
		Group,
		PathShape,
		TextBox,
		Image,
		SvgElement
	} from '$lib/store';
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
	console.log('renderer: ', offset.x, offset.y);
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
{:else if element instanceof SvgElement}
	<div
		class="absolute top-0 left-0 origin-center"
		style="transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);"
	>
		<RenderSvg {element} />
	</div>
{:else if element instanceof Image}
	<RenderImage {scale} {element} />
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
