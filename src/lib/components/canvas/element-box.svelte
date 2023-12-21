<script lang="ts">
	import { store, type CanvasElement } from '$lib/store';
	import { isOverlapping } from '$lib/utils/select-utils';
	import clsx from 'clsx';

	type Props = {
		element: CanvasElement;
		dragRect: { x: number; y: number; width: number; height: number };
		onSelect: (event: MouseEvent | KeyboardEvent, element: CanvasElement) => void;
	};

	const { element, dragRect, onSelect } = $props<Props>();

	$effect(() => {
		if (isOverlapping(element, dragRect)) {
			if (!store.highlightedElements.elements.includes(element)) {
				store.highlightedElements.addElement(element);
			}
		} else {
			if (store.highlightedElements.elements.includes(element)) {
				store.highlightedElements.removeElement(element);
			}
		}
	});

	function onclick(event: MouseEvent) {
		onSelect(event, element);
	}
	function onkeydown(event: KeyboardEvent) {
		onSelect(event, element);
	}

	const width = element.width < 10 ? 10 : element.width;
	const height = element.height < 10 ? 10 : element.height;
</script>

<div
	id="element-box"
	{onclick}
	{onkeydown}
	role="button"
	tabindex="0"
	class={clsx(
		'absolute cursor-pointer origin-center border-2 border-transparent hover:border-slate-700',
		{
			'border-2 border-slate-700': store.highlightedElements.elements.includes(element)
		}
	)}
	style="
    width: {width}px;
    height: {height}px;
    transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);
    left: 0px;
    top: 0px;
  "
/>
