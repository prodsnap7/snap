<script lang="ts">
	import { store, type CanvasElement } from '$lib/store';
	import Renderer from '../renderer/renderer.svelte';
	import { shapes } from './data/shapes';
	import { paths } from './data/paths';
	import { curves } from './data/curves';
	import { ArrowLeft } from 'phosphor-svelte';
	import Button from '../ui/button/button.svelte';
	import { sidepanelStore } from './state.svelte';

	let scale = 0.6;

	function addElement(el: CanvasElement) {
		store.elements.addElement(el);
	}
</script>

<div class="flex items-center gap-4">
	<Button
		variant="ghost"
		size="sm"
		class="text-xs"
		on:click={() => {
			sidepanelStore.state = 'elements';
		}}
	>
		<ArrowLeft size={20} />
	</Button>
	<label for="shapes" class="font-bold">Curves</label>
</div>

<div class="flex items-center mt-4 mb-2 flex-wrap gap-2 justify-between">
	{#each curves as curve}
		<div
			id="curve-renderer-elements-panel"
			on:click={() => addElement(curve.clone(2.5))}
			tabindex="0"
			role="button"
			on:keydown={() => addElement(curve.clone(2.5))}
			style="width: {curve.width}px; height: {curve.height}px;"
			class="relative flex-initial shrink-0 m-4 ml-0"
		>
			<div class="absolute origin-center inset-0">
				<Renderer element={curve} />
			</div>
		</div>
	{/each}
</div>

<label for="shapes" class="font-bold block my-4">Basic Shapes</label>

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
</div>

<label for="shapes" class="font-bold my-4 block">Complex Shapes</label>

<div class="grid grid-cols-4 gap-2">
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
