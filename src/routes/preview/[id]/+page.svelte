<script lang="ts">
	import FontLoader from '$lib/components/font-loader.svelte';
	import Renderer from '$lib/components/renderer/renderer.svelte';

	let { data } = $props();
</script>

<FontLoader fontUrls={data.fonts} />

<div class="w-screen h-screen flex items-center justify-center">
	<div class="relative" style="width: {data.canvas.width}px; height: {data.canvas.height}px;">
		<div
			role="button"
			id="canvas-container"
			tabindex="0"
			class="cursor-pointer absolute left-0 top-0 p-10"
		>
			<div
				id="canvas"
				class="relative rounded-xs border shadow-xs overflow-hidden box-content"
				style="
    width: {data.canvas.width}px;
    height: {data.canvas.height}px;
    background-color: {data.canvas.background};
    "
			>
				{#each data.elements as element}
					<Renderer {element} />
				{/each}
			</div>
		</div>
	</div>
</div>
