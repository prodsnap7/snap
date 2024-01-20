<script lang="ts">
	import { activeElementStore, type TextBox } from '$lib/store';
	import type { FormEventHandler } from 'svelte/elements';
	import MoveHandler from '../move-handler.svelte';
	import clsx from 'clsx';

	type Props = {
		element: TextBox;
		offset: { x: number; y: number };
	};

	let { element, offset } = $props<Props>();
	let input = $state<HTMLDivElement | null>(null);
	let clickCount = $state(0);

	function onmousedown(event: MouseEvent) {
		clickCount += 1;
		activeElementStore.setElement(element);

		if (clickCount >= 2) {
			event.stopPropagation();
			element.state = 'editing';
			clickCount = 0;
		}
	}

	const oninput: FormEventHandler<HTMLDivElement> = (event) => {
		element.height = input!.offsetHeight;
		if (input!.offsetWidth > element.width) {
			element.width = input!.offsetWidth;
		}
	};

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
			transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg);
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
{:else if element && element.state === 'normal'}
	<div
		{onmousedown}
		tabindex="0"
		role="button"
		class={clsx('absolute left-0 top-0 hover:border hover:border-primary move', {
			'border border-primary': element === activeElementStore.element
		})}
		style="
    width: {element.bounds.width}px;
    height: {element.bounds.height}px;
    transform: translate({element.x - offset.x}px, {element.y -
			offset.y}px) rotate({element.rotation}deg); 
    "
	/>
{/if}
