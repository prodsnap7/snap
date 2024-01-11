<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import clsx from 'clsx';
	import { store, TextBox } from '$lib/store';
	import ElementsPanel from './elements-panel.svelte';
	import Colors from './colors.svelte';
	import { sidepanelStore } from './state.svelte';
	import AllShapes from './all-shapes.svelte';
	import Position from './position.svelte';
	import Fonts from './fonts/fonts.svelte';
	import Uploads from './uploads.svelte';

	function onclick(val: string) {
		$page.url.searchParams.set('sidepanel', val);
		sidepanelStore.state = val;
	}
</script>

<div class="flex w-full h-full">
	<nav class="min-w-[80px] border-r flex items-center flex-col gap-4 py-6">
		<button
			on:click={() => onclick('elements')}
			class="rounded p-1 flex flex-col items-center gap-1 hover:bg-secondary/95"
		>
			<span
				class={clsx('px-2 py-1.5 rounded', {
					'bg-primary/20': sidepanelStore.state === 'elements'
				})}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-shapes"
					><path
						d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"
					/><rect x="3" y="14" width="7" height="7" rx="1" /><circle
						cx="17.5"
						cy="17.5"
						r="3.5"
					/></svg
				>
			</span>
			<span class="text-xs">Elements</span>
		</button>
		<button
			on:click={() => onclick('uploads')}
			class="rounded p-1 flex flex-col items-center gap-1 hover:bg-secondary/95"
		>
			<span
				class={clsx('px-2 py-1.5 rounded', { 'bg-primary/20': sidepanelStore.state === 'upload' })}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-camera"
					><path
						d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
					/><circle cx="12" cy="13" r="3" /></svg
				>
			</span>
			<span class="text-xs">Uploads</span>
		</button>
	</nav>

	<div class="p-4 w-[320px] overflow-y-auto max-h-[calc(100vh-100px)]">
		{#if sidepanelStore.state === 'elements'}
			<div in:fade>
				<ElementsPanel />
			</div>
		{:else if sidepanelStore.state === 'colors'}
			<div in:fade>
				<Colors />
			</div>
		{:else if sidepanelStore.state === 'uploads'}
			<div in:fade>
				<Uploads />
			</div>
		{:else if sidepanelStore.state === 'all-shapes'}
			<div in:fade>
				<AllShapes />
			</div>
		{:else if sidepanelStore.state === 'position'}
			<div in:fade>
				<Position />
			</div>
		{:else if sidepanelStore.state === 'fonts' && store.activeElement.element instanceof TextBox}
			<div in:fade>
				<Fonts />
			</div>
		{/if}
	</div>
</div>
