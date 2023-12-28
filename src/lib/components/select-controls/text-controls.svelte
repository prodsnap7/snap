<script lang="ts">
	import type { TextBox } from '$lib/store';
	import MoveHandler from '../move-handler.svelte';

	type Props = {
		element: TextBox;
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
		onMove: ({ x, y }: { x: number; y: number }) => void;
	};
	let { element, onRotate, onMove, onResize } = $props<Props>();
</script>

{#if element && element.state === 'editing'}
	<div
		id="text-controls"
		class="absolute top-0 left-0 origin-center"
		style="transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);"
	>
		<input
			class="text-renderer border border-primary overflow-hidden whitespace-pre-wrap cursor-pointer outline-none user-select-none"
			style="
        font-size: {element.fontSize}px;
        font-family: {element.fontFamily};
        font-weight: {element.fontWeight};
        font-style: {element.fontStyle};
        color: blue;
        text-decoration: {element.decoration};
        text-align: {element.align};
        width: {element.width}px;
        letter-spacing: {element.letterSpacing}px;
        line-height: {element.lineHeight * element.fontSize}px;
      "
			bind:value={element.content}
		/>
	</div>
{:else if element}
	<MoveHandler
		bounds={element.bounds}
		rotation={element.rotation}
		exclude={['resizing-tm', 'resizing-bm']}
		{onRotate}
		{onMove}
		{onResize}
	></MoveHandler>
{/if}
