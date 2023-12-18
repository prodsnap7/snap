<script lang="ts">
	import { canvasStore, elementStore } from '$lib/store';
	import Renderer from '../renderer/renderer.svelte';
</script>

<div
	id="canvas"
	class="relative rounded-xs border shadow-xs overflow-hidden"
	style="
    width: {canvasStore.width}px;
    height: {canvasStore.height}px;
    transform: scale({canvasStore.scale});
    background-color: {canvasStore.background};
    "
>
	{#each elementStore.elements as element}
		<Renderer {element} />
	{/each}
</div>
