<script lang="ts">
	import { store, type CanvasElement } from '$lib/store';
	import GridLines from '../grid-lines/grid-lines.svelte';
	import SelectControls from '../select-controls.svelte';
	import { sidepanelStore } from '../sidepanel/state.svelte';
	import DragOverlay from './drag-overlay.svelte';
	import ElementBox from './element-box.svelte';

	const { elements, canvas, selectedElements, activeElement } = store;

	function selectElement(event: MouseEvent | KeyboardEvent, element: CanvasElement) {
		activeElement.setElement(element);
		if (event.shiftKey) {
			selectedElements.addElements([element]);
		} else {
			selectedElements.setElements([element]);
		}
	}

	let dragging = $state(false);
	let dragRect = $state({ x: 0, y: 0, width: 0, height: 0 });
	let dragPos = { x: 0, y: 0 };
	let outerCanvas = $state<HTMLDivElement | null>(null);
	const outerCanvasRect = { x: 0, y: 0 };

	$effect(() => {
		if (outerCanvas) {
			const rect = outerCanvas.getBoundingClientRect();
			outerCanvasRect.x = rect.x;
			outerCanvasRect.y = rect.y;
		}

		function windowResize() {
			if (outerCanvas) {
				const rect = outerCanvas.getBoundingClientRect();
				outerCanvasRect.x = rect.x;
				outerCanvasRect.y = rect.y;
			}
		}

		window.addEventListener('resize', windowResize);

		return () => {
			window.removeEventListener('resize', windowResize);
		};
	});

	function onmousedown(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			console.log('onmousedown');
			selectedElements.clear();
			activeElement.clear();
			sidepanelStore.prev();
			dragPos = { x: event.clientX, y: event.clientY };
			dragging = true;
		}
	}

	function onmouseup(event: MouseEvent) {
		if (dragging) {
			store.selectedElements.setElements(store.highlightedElements.elements);
			store.highlightedElements.clear();
			dragging = false;
			dragRect = { x: 0, y: 0, width: 0, height: 0 };
		} else if (event.target === event.currentTarget || event.target === outerCanvas) {
			selectedElements.clear();
		}
	}

	function onmousemove(e: MouseEvent) {
		if (!dragging) return;

		const width = Math.abs(e.clientX - dragPos.x);
		const height = Math.abs(e.clientY - dragPos.y);
		const left = Math.min(e.clientX, dragPos.x) - outerCanvasRect.x;
		const top = Math.min(e.clientY, dragPos.y) - outerCanvasRect.y;

		dragRect = { x: left, y: top, width, height };
	}
</script>

<div
	{onmouseup}
	{onmousemove}
	role="button"
	id="controls-canvas-container"
	tabindex="0"
	class="absolute inset-0 flex items-center justify-center"
>
	<div
		id="controls-canvas"
		bind:this={outerCanvas}
		{onmousedown}
		{onmouseup}
		role="button"
		tabindex="0"
		class="absolute border border-transparent cursor-default"
		style="
    width: {canvas.width}px;
    height: {canvas.height}px;
  "
	>
		<GridLines />
		{#each elements.elements as element}
			<ElementBox
				{element}
				dragRect={{ x: dragRect.x, y: dragRect.y, width: dragRect.width, height: dragRect.height }}
				onSelect={selectElement}
			/>
		{/each}
		<SelectControls />
		{#if dragging}
			<DragOverlay bounds={dragRect} />
		{/if}
	</div>
</div>
