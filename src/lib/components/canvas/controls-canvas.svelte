<script lang="ts">
	import { store, type CanvasElement, canvasStore } from '$lib/store';
	import clsx from 'clsx';
	import GridLines from '../grid-lines/grid-lines.svelte';
	import SelectBar from '../select-bar.svelte';
	import SelectControls from '../select-controls';
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
	let outerCanvasContainer = $state<HTMLDivElement | null>(null);
	let currentTarget = false;
	const outerCanvasRect = { x: 0, y: 0 };

	$effect(() => {
		if (outerCanvas && outerCanvasContainer) {
			const rect = outerCanvas.getBoundingClientRect();
			const containerRect = outerCanvasContainer.getBoundingClientRect();
			const widthRatio = rect.width / containerRect.width;
			const heightRatio = rect.height / containerRect.height;

			if (widthRatio > 0.9 || heightRatio > 0.9) {
				canvasStore.scale = 0.9;
			}
		}
	});

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
			console.log('current target');
			currentTarget = true;
			dragPos = { x: event.clientX, y: event.clientY };
			dragging = true;
			canvasStore.state = 'selected';
		} else {
			canvasStore.state = 'normal';
		}
	}

	function onmouseup(event: MouseEvent) {
		if (dragging) {
			store.selectedElements.setElements(store.highlightedElements.elements);
			store.activeElement.setElement(store.highlightedElements.elements[0]);
			store.highlightedElements.clear();
			dragging = false;
			dragRect = { x: 0, y: 0, width: 0, height: 0 };
		} else if (currentTarget) {
			console.log('clearing');
			selectedElements.clear();
			activeElement.clear();
			sidepanelStore.prev();
			currentTarget = false;
		}

		store.saveToLocalStorage();
	}

	function onmousemove(e: MouseEvent) {
		if (!dragging) return;

		currentTarget = false;
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
	bind:this={outerCanvasContainer}
	role="button"
	id="controls-canvas-container"
	tabindex="0"
	class="cursor-pointer absolute left-0 top-0 p-10"
>
	<div
		id="controls-canvas"
		bind:this={outerCanvas}
		{onmousedown}
		{onmouseup}
		role="button"
		tabindex="0"
		class={clsx('relative border rounded-xs', {
			'cursor-pointer': !dragging,
			'cursor-cell': dragging,
			'border-primary': canvasStore.state === 'selected',
			'border-secondary': canvasStore.state !== 'selected'
		})}
		style="
    width: {canvas.width}px;
    height: {canvas.height}px;
  "
	>
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

		<GridLines />
		{#if store.selectedElements.elements.length > 0}
			<SelectBar />
		{/if}
	</div>
</div>
