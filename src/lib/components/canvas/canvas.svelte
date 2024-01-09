<script lang="ts">
	import { canvasStore, elementsStore } from '$lib/store';
	import Renderer from '../renderer/renderer.svelte';
</script>

<div
	role="button"
	id="canvas-container"
	tabindex="0"
	class="cursor-pointer absolute left-0 top-0 p-10"
>
	<div
		id="canvas"
		class="relative rounded-xs border-2 shadow-xs overflow-hidden"
		style="
    width: {canvasStore.width}px;
    height: {canvasStore.height}px;
    background-color: {canvasStore.background};
    "
	>
		{#each elementsStore.elements as element}
			<Renderer {element} />
		{/each}
	</div>
</div>
