<script lang="ts">
	import { store, type CanvasElement } from '$lib/store';
	import Renderer from '../renderer/renderer.svelte';
	import { shapes } from './data/shapes';
	import { paths } from './data/paths';

	let scale = 0.6;

	function addElement(el: CanvasElement) {
		store.elements.addElement(el);
	}
</script>

<div class="grid grid-cols-4 gap-2">
	{#each shapes as shape}
		<div
			tabindex="0"
			role="button"
			on:click={() => addElement(shape.clone())}
			on:keydown={() => addElement(shape.clone())}
			style="width: {shape.width * scale}px; height: {shape.height * scale}px;"
			class="relative p-2 flex-initial shrink-0"
		>
			<Renderer element={shape} {scale} />
		</div>
	{/each}

	{#each paths as path}
		<div
			tabindex="0"
			role="button"
			on:click={() => addElement(path.clone())}
			on:keydown={() => addElement(path.clone())}
			style="width: {path.width}px; height: {path.height}px;"
			class="relative p-2 flex-initial shrink-0"
		>
			<Renderer element={path} {scale} />
		</div>
	{/each}
</div>
