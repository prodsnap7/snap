<script lang="ts">
	import type { TextBox } from '$lib/store';
	import type { FormEventHandler } from 'svelte/elements';
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

	let input = $state<HTMLDivElement | null>(null);

	function selectText() {
		if (input?.isContentEditable) {
			const range = document.createRange();
			range.selectNodeContents(input);
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}

	// $effect(() => {
	// 	if (input) {
	// 		input.focus();
	// 		selectText();
	// 	}
	// });

	let clickCount = $state(0);

	function onMouseDown(event: MouseEvent) {
		clickCount += 1;

		if (clickCount >= 2) {
			element.state = 'editing';
			clickCount = 0;
			// setTimeout(() => {
			// 	if (input) {
			// 		input.focus();
			// 		selectText();
			// 	}
			// }, 0);
		}
	}

	const oninput: FormEventHandler<HTMLDivElement> = (event) => {
		element.height = input!.offsetHeight;
		if (input!.offsetWidth > element.width) {
			element.width = input!.offsetWidth;
		}
	};

	// $effect(() => {
	// 	if (input) {
	// 		input.textContent = element.content;
	// 	}
	// });

	function onblur() {
		element.content = input?.innerText ?? '';
		element.state = 'normal';
	}
</script>

{#if element && element.state === 'editing'}
	<div
		id="text-controls"
		class="absolute border border-primary top-0 left-0 origin-center"
		style="
			min-width: {element.width}px;
			min-height: {element.height}px;
			transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);
		"
	>
		<div
			bind:this={input}
			class="overflow-hidden px-1 whitespace-pre-wrap cursor-pointer outline-none user-select-none"
			style="
			font-size: {element.fontSize * element.scale}px;
			font-family: {element.fontFamily};
			font-weight: {element.fontWeight};
			font-style: {element.fontStyle};
			color: {element.color};
			text-decoration: {element.decoration};
			text-align: {element.align};
			letter-spacing: {element.letterSpacing}px;
			line-height: {element.lineHeight * element.fontSize * element.scale}px;
			text-transform: {element.uppercase ? 'uppercase' : 'none'};
      "
			contenteditable="true"
			{oninput}
			{onblur}
		>
			{element.content}
		</div>
	</div>
{:else if element}
	<MoveHandler
		bounds={element.bounds}
		rotation={element.rotation}
		exclude={['resizing-tm', 'resizing-bm']}
		scale={element.scale}
		{onMouseDown}
		{onRotate}
		{onMove}
		{onResize}
	></MoveHandler>
{/if}
