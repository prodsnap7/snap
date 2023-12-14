<script lang="ts">
	import { store, type CanvasElement } from '$lib/store';
	import { Renderer } from '../renderer';
	import { shapes } from './data/shapes';
	import { curves } from './data/curves';

	let scale = 0.6;

	function addElement(el: CanvasElement) {
		console.log('add element', el);
		store.elements.addElement(el.clone());
	}
</script>

<div class="mb-4">
	<h2 class="font-bold">Shapes</h2>
</div>
<div class="flex flex-wrap items-center gap-3">
	{#each shapes as shape}
		<div
			on:click={() => addElement(shape)}
			tabindex="0"
			role="button"
			on:keydown={() => addElement(shape)}
			style="width: {shape.width * scale}px; height: {shape.height * scale}px;"
			class="relative flex-initial"
		>
			<Renderer element={shape} {scale} />
		</div>
	{/each}
</div>

<div class="my-4">
	<h2 class="font-bold">Curves</h2>
</div>
<div class="flex flex-wrap items-center gap-3">
	{#each curves as curve}
		<div
			id="curve-renderer-elements-panel"
			on:click={() => addElement(curve)}
			tabindex="0"
			role="button"
			on:keydown={() => addElement(curve)}
			style="width: {curve.width}px; height: {curve.height}px;"
			class="relative flex-initial"
		>
			<div class="absolute origin-center inset-0">
				<Renderer element={curve} scale={0.3} />
			</div>
		</div>
	{/each}
</div>
