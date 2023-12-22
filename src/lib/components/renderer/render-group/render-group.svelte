<script lang="ts">
	import type { Group } from '$lib/store/elements/group.svelte';
	import RenderCurve from '../render-curve';
	import RenderShape from '../render-shape.svelte';

	type Props = {
		group: Group;
		scale?: number;
	};

	const { group, scale = 1 } = $props<Props>();
	const offset = $derived({ x: group.x, y: group.y });
</script>

<div
	id={group.id}
	style="
			position: absolute;
			left: {group.x}px;
			top: {group.y}px;
			width: {group.width * scale}px;
			height: {group.height * scale}px;
			transform: rotate({group.rotation}deg);
		"
>
	{#each group.elements as element}
		{#if element.type === 'shape'}
			<div
				class="absolute top-0 left-0"
				style="transform: translate({element.x - offset.x}px, {element.y -
					offset.y}px) rotate({element.rotation}deg)"
			>
				<RenderShape {scale} shape={element} />
			</div>
		{:else if element.type === 'curve'}
			<div id="curve-group-helper" class="absolute" style="left: {-group.x}px; top: {-group.y}px">
				<RenderCurve {scale} curve={element} />
			</div>
		{/if}
	{/each}
</div>
