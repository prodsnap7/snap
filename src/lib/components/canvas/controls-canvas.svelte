<script lang="ts">
	import { store, type CanvasElement } from '$lib/store';
	import SelectControls from '../select-controls.svelte';

	const { elements, canvas, selectedElements } = store;

	function onmousedown(event: MouseEvent, element: CanvasElement) {
		// if shift is pressed then add to selected elements
		if (event.shiftKey) {
			selectedElements.addElements([element]);
		} else {
			selectedElements.setElements([element]);
		}
	}

	function onmouseup(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			selectedElements.clear();
		}
	}
</script>

<div
	on:mouseup={onmouseup}
	role="button"
	id="controls-canvas"
	tabindex="0"
	class="absolute inset-0 flex items-center justify-center"
>
	<div
		on:mouseup={onmouseup}
		role="button"
		tabindex="0"
		class="absolute border border-transparent cursor-default"
		style="
    width: {canvas.width}px;
    height: {canvas.height}px;
  "
	>
		{#each elements.elements as element}
			<div
				onmousedown={(e) => onmousedown(e, element)}
				role="button"
				tabindex="0"
				class="absolute cursor-pointer origin-center"
				style="
          width: {element.width}px;
          height: {element.height}px;
          transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);
          left: 0px;
          top: 0px;
        "
			/>
		{/each}
		<SelectControls />
	</div>
</div>
