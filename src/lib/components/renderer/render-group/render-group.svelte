<script lang="ts">
	import { type Group, Shape, Curve, PathShape, TextBox, Image } from '$lib/store';
	import RenderCurve from '../render-curve';
	import RenderImage from '../render-image.svelte';
	import RenderPathShape from '../render-path-shape.svelte';
	import RenderShape from '../render-shape.svelte';
	import RenderText from '../render-text.svelte';

	type Props = {
		group: Group;
		scale?: number;
	};

	const { group, scale = 1 } = $props<Props>();
	const offset = $derived({ x: group.bounds.x, y: group.bounds.y });
</script>

<div
	id={group.id}
	style="
			position: absolute;
			left: {group.bounds.x}px;
			top: {group.bounds.y}px;
			width: {group.bounds.width * scale}px;
			height: {group.bounds.height * scale}px;
			transform: rotate({group.rotation}deg);
		"
>
	{#each group.elements as element}
		{#if element instanceof PathShape}
			<div
				class="absolute top-0 left-0"
				style="transform: translate({element.x - offset.x}px, {element.y -
					offset.y}px) rotate({element.rotation}deg)"
			>
				<RenderPathShape {scale} {element} />
			</div>
		{:else if element instanceof Shape}
			<div
				class="absolute top-0 left-0"
				style="transform: translate({element.x - offset.x}px, {element.y -
					offset.y}px) rotate({element.rotation}deg)"
			>
				<RenderShape {scale} shape={element} />
			</div>
		{:else if element instanceof Image}
			<div
				class="absolute top-0 left-0"
				style="transform: translate({element.x - offset.x}px, {element.y -
					offset.y}px) rotate({element.rotation}deg)"
			>
				<RenderImage {scale} {element} />
			</div>
		{:else if element instanceof Curve}
			<div
				id="curve-group-helper"
				class="absolute"
				style="left: {-group.bounds.x}px; top: {-group.bounds.y}px"
			>
				<RenderCurve {scale} curve={element} />
			</div>
		{:else if element instanceof TextBox}
			<div
				class="absolute top-0 left-0"
				style="transform: translate({element.x - offset.x}px, {element.y -
					offset.y}px) rotate({element.rotation}deg)"
			>
				<RenderText {scale} text={element} />
			</div>
		{/if}
	{/each}
</div>
