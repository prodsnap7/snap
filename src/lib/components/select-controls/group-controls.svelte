<script lang="ts">
	import { Curve, Group } from '$lib/store';
	import MoveHandler from '../move-handler.svelte';

	type Props = {
		element: Group;
		onMove: ({ x, y }: { x: number; y: number }) => void;
		onRotate: (r: number) => void;
		onResize: ({
			x,
			y,
			width,
			height
		}: {
			x: number;
			y: number;
			width: number;
			height: number;
		}) => void;
	};

	const { onMove, onRotate, onResize, element } = $props<Props>();
</script>

{#if element}
	<MoveHandler
		{onMove}
		{onRotate}
		{onResize}
		bounds={element.bounds}
		rotation={element.rotation}
		exclude={['resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
	>
		{#each element.elements as el}
			{#if el instanceof Curve}
				<div
					class="absolute"
					style="
        left: {-element.bounds.x}px;
        top: {-element.bounds.y}px;
      "
				/>
			{:else if el instanceof Group}
				<div class="hidden" />
			{:else}
				<div
					class="absolute left-0 top-0 hover:border hover:border-primary move"
					style="
        width: {el.bounds.width}px;
        height: {el.bounds.height}px;
        transform: translate({el.x - element.bounds.x}px, {el.y -
						element.bounds.y}px) rotate({el.rotation}deg); 
      "
				/>
			{/if}
		{/each}
	</MoveHandler>
{/if}
