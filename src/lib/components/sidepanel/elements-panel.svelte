<script lang="ts">
	import { store, TextBox, Image, SvgElement } from '$lib/store';
	import { Renderer } from '../renderer';
	import { shapes } from './data/shapes';
	import { curves } from './data/curves';
	import { mode } from 'mode-watcher';
	import Button from '../ui/button/button.svelte';
	import { sidepanelStore } from './state.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import axios from 'axios';
	import { searchIcons } from '$lib/api/icons';
	import Loader from '../ui/loader.svelte';
	import clsx from 'clsx';

	let scale = 0.6;

	function addTextElement() {
		const text = new TextBox({
			content: 'Text Goes Here'
		});

		store.addElement(text);
	}

	function addImageElement(image: {
		alt: string;
		id: number;
		src: {
			tiny: string;
			original: string;
		};
		width: number;
		height: number;
	}) {
		const img = new Image({
			url: image.src.original,
			width: image.width / 10,
			height: image.height / 10,
			public_id: `${image.id}`,
			alt: image.alt
		});

		store.addElement(img);
	}

	async function addIcon(icon: any) {
		console.log(icon);
		try {
			const res = await axios.get(`/api/icons/proxy?iconUrl=${icon.icon_url}`);

			const svg = new SvgElement(res.data);
			store.addElement(svg);
		} catch (err) {
			console.log(err);
		}
	}

	const fourCurves = curves.slice(0, 5);

	const photosQuery = createQuery({
		queryKey: ['photos'],
		queryFn: async () => {
			const pexelsUrl = 'https://api.pexels.com/v1/search?query=bag&per_page=20&page=1';

			// make the request to the Pexels API with the API key
			const res = await axios.get(pexelsUrl, {
				headers: {
					Authorization: import.meta.env.VITE_PEXELS_API_KEY
				}
			});

			return res.data.photos;
		}
	});

	const iconsQuery = createQuery({
		queryKey: ['icons', 'eco-friendly'],
		queryFn: () => searchIcons('eco-friendly')
	});
</script>

<div class="mb-4 flex items-center justify-between">
	<h2 class="font-bold">Shapes</h2>
	<Button
		onclick={() => {
			sidepanelStore.state = 'all-shapes';
		}}
		variant="ghost"
		size="sm"
		class="text-xs">See All</Button
	>
</div>

<div class="flex flex-nowrap scrollbar-x overflow-x-auto overflow-hidden items-center gap-3">
	{#each shapes as shape}
		<div
			tabindex="0"
			role="button"
			on:click={() => store.addElement(shape.clone())}
			on:keydown={() => store.addElement(shape.clone())}
			style="width: {shape.width * scale}px; height: {shape.height * scale}px;"
			class="relative p-2 flex-initial shrink-0"
		>
			<Renderer element={shape} {scale} />
		</div>
	{/each}
</div>

<div class="mt-4 flex items-center justify-between">
	<h2 class="font-bold">Curves</h2>
	<Button
		onclick={() => {
			sidepanelStore.state = 'all-shapes';
		}}
		variant="ghost"
		size="sm"
		class="text-xs">See All</Button
	>
</div>

<div class="flex flex-nowrap scrollbar-x overflow-hidden overflow-x-auto items-center gap-3">
	{#each fourCurves as curve}
		<div
			id="curve-renderer-elements-panel"
			on:click={() => store.addElement(curve.clone(2.5))}
			tabindex="0"
			role="button"
			on:keydown={() => store.addElement(curve.clone(2.5))}
			style="width: {curve.width}px; height: {curve.height}px;"
			class="relative flex-initial shrink-0 mx-2 my-4 ml-0"
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

<Button onclick={addTextElement} variant="secondary" class="w-full text-md border"
	>Add Some Text</Button
>

{#if $photosQuery.isLoading}
	<div class="my-4 w-full">
		<Loader />
	</div>
{:else if $photosQuery.isError}
	{$photosQuery.error.message}
{:else}
	<div class="my-4 flex items-center justify-between">
		<h2 class="font-bold">Photos</h2>
		<Button
			onclick={() => {
				sidepanelStore.state = 'assets';
			}}
			variant="ghost"
			size="sm"
			class="text-xs">See All</Button
		>
	</div>

	<div class="flex flex-nowrap scrollbar-x overflow-hidden overflow-x-auto items-center gap-3">
		{#each $photosQuery.data as photo}
			<img
				onclick={() => addImageElement(photo)}
				tabindex="0"
				role="button"
				onkeydown={() => addImageElement(photo)}
				src={photo.src.tiny}
				alt={photo.photographer}
				class="h-24 rounded-sm"
			/>
		{/each}
	</div>
{/if}

{#if $iconsQuery.isLoading}
	<div class="my-4 w-full">
		<Loader />
	</div>
{:else if $iconsQuery.isError}
	{$iconsQuery.error.message}
{:else}
	<div class="my-4 flex items-center justify-between">
		<h2 class="font-bold">Icons</h2>
		<Button
			onclick={() => {
				sidepanelStore.state = 'assets';
			}}
			variant="ghost"
			size="sm"
			class="text-xs">See All</Button
		>
	</div>

	<div class="flex flex-nowrap scrollbar-x overflow-hidden overflow-x-auto items-center gap-3">
		{#each $iconsQuery.data.icons as icon}
			<img
				onclick={() => addIcon(icon)}
				tabindex="0"
				role="button"
				onkeydown={() => addIcon(icon)}
				src={icon.icon_url}
				alt={icon.term}
				class={clsx('h-12 rounded-sm', {
					invert: $mode === 'dark',
					'invert-0': $mode === 'light'
				})}
			/>
		{/each}
	</div>
{/if}
