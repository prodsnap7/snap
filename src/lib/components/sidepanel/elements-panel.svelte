<script lang="ts">
	import { store, type CanvasElement } from '$lib/store';
	import { Renderer } from '../renderer';
	import { shapes } from './data/shapes';
	import { curves } from './data/curves';
	import Button from '../ui/button/button.svelte';

	let scale = 0.6;

	function addElement(el: CanvasElement) {
		console.log('add element', el);
		store.elements.addElement(el);
	}
</script>

<div class="mb-4">
	<h2 class="font-bold">Shapes</h2>
</div>

<div class="flex flex-nowrap no-scrollbar overflow-x-auto overflow-hidden items-center gap-3">
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
</div>

<div class="mt-4">
	<h2 class="font-bold">Curves</h2>
</div>
<div class="flex flex-nowrap no-scrollbar overflow-hidden overflow-x-auto items-center gap-3">
	{#each curves as curve}
		<div
			id="curve-renderer-elements-panel"
			on:click={() => addElement(curve.clone(2.5))}
			tabindex="0"
			role="button"
			on:keydown={() => addElement(curve.clone(2.5))}
			style="width: {curve.width}px; height: {curve.height}px;"
			class="relative flex-initial shrink-0"
		>
			<div class="absolute origin-center inset-0">
				<Renderer element={curve} />
			</div>
		</div>
	{/each}
</div>

<div class="my-4">
	<h2 class="font-bold">Text</h2>
</div>
<Button variant="secondary" class="w-full">Add Some Text</Button>
