<script lang="ts">
	import Canvas from '$lib/components/canvas/canvas.svelte';
	import type { PageData } from './$types';
	import FontLoader from '$lib/components/font-loader.svelte';
	import { store } from '$lib/store';

	export let data: PageData;
	store.init(data.design!);
</script>

<FontLoader fontUrls={store.elements.fonts} />

<div class="w-screen h-screen flex items-center justify-center">
	<div
		style="
		width: {store.canvas.width + 100}px;
		height: {store.canvas.height + 100}px;
	"
		class="relative"
	>
		<Canvas />
	</div>
</div>
