<script lang="ts">
	import Canvas from '$lib/components/canvas/canvas.svelte';
	import ControlsCanvas from '$lib/components/canvas/controls-canvas.svelte';
	import { Sidepanel } from '$lib/components/sidepanel';
	import Toolbar from '$lib/components/toolbar/toolbar.svelte';
	import { store } from '$lib/store';
	import type { PageData } from './$types';

	export let data: PageData;
	store.init(data.design);
</script>

<div class="w-screen h-screen flex flex-col">
	<header class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
		<div class="container flex h-14 items-center">
			<div class="mr-4 md:flex">
				<input
					value={store.name}
					class="text-xs justify-self-end bg-transparent p-2 rounded outline-none border"
				/>
			</div>
		</div>
	</header>

	<main class="flex flex-1">
		<div class="sm:hidden min-w-[400px] w-[400px] border-r">
			<Sidepanel />
		</div>

		<!-- Main content section -->
		<section class="flex flex-col w-full bg-primary/5">
			<div class="h-14 w-full p-2 bg-white border-b shadow-xs">
				<Toolbar />
			</div>

			<div class="flex-1 flex items-center justify-center relative">
				<Canvas />
				<ControlsCanvas />
			</div>
		</section>
	</main>
</div>
