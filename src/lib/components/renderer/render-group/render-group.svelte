<script lang="ts">
	import type { Group } from '$lib/store/elements/group.svelte';
	import RenderCurve from '../render-curve.svelte';
	import RenderShape from '../render-shape.svelte';

	type Props = {
		group: Group;
		scale?: number;
	};

	const { group, scale = 1 } = $props<Props>();
	const offset = { x: group.x, y: group.y };
</script>

<div
	id="group-renderer"
	style="
    position: absolute;
    left: {group.x}px;
    top: {group.y}px;
    width: {group.width * scale}px;
    height: {group.height * scale}px;
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
			<div class="absolute origin-center inset-0">
				<RenderCurve {scale} curve={element} {offset} />
			</div>
		{/if}
	{/each}
</div>
