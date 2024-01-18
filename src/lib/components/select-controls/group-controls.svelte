<script lang="ts">
	import { Curve, Group, type CanvasElement, activeElementStore, TextBox } from '$lib/store';
	import clsx from 'clsx';
	import MoveHandler from '../move-handler.svelte';
	import GroupTextControls from './group-text-controls.svelte';

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

	function onElementPress(event: MouseEvent, el: CanvasElement) {
		// event.stopPropagation();
		activeElementStore.setElement(el);
	}

	const { onMove, onRotate, onResize, element } = $props<Props>();
</script>

{#if element}
	<MoveHandler
		{onMove}
		{onRotate}
		{onResize}
		borderClass="border-secondary border-2"
		bounds={element.bounds}
		rotation={element.rotation}
		exclude={['resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
	>
		{#each element.elements as el}
			{#if el instanceof Curve}
				<div
					tabindex="0"
					role="button"
					onmouseup={(event) => onElementPress(event, el)}
					class="absolute cursor-pointer border border-transparent hover:border-primary"
					style="
						left: {el.x - element.bounds.x}px;
						top: {el.y - element.bounds.y}px;
						height: {element.bounds.height}px;
						width: {element.bounds.width}px;
						transform: translateY(-50%);
						min-height: 10px;
					"
				/>
			{:else if el instanceof Group}
				<div class="hidden" />
			{:else if el instanceof TextBox}
				<GroupTextControls element={el} offset={{ x: element.bounds.x, y: element.bounds.y }} />
			{:else}
				<div
					onmouseup={(event) => onElementPress(event, el)}
					tabindex="0"
					role="button"
					class={clsx(
						'absolute cursor-pointer left-0 top-0 hover:border hover:border-primary move',
						{
							'border border-primary': el === activeElementStore.element
						}
					)}
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
