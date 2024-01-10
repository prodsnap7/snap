<script lang="ts">
	import { fetchAllFonts } from '$lib/api/fonts';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import FontFaceObserver from 'fontfaceobserver';
	import Loader from '../../ui/loader.svelte';
	import FontImage from './font-image.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { TextBox, store, type FontStyle, type FontWeight } from '$lib/store';

	let height = window.innerHeight;
	let loading = false;
	let loaderRef: HTMLElement | null = null;

	onMount(() => {
		const handleResize = () => {
			height = window.innerHeight;
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const fontsQuery = createInfiniteQuery({
		queryKey: ['fonts'],
		queryFn: fetchAllFonts,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.data.nextPage
	});

	let observer: IntersectionObserver | null = null;

	$: {
		if ($fontsQuery.hasNextPage && loaderRef) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						$fontsQuery.fetchNextPage();
					}
				},
				{ threshold: 1 }
			);

			observer.observe(loaderRef);
		}
	}

	// Cleanup the observer on component destruction
	onDestroy(() => {
		if (loaderRef && observer) {
			observer.unobserve(loaderRef);
		}
	});

	async function onFontClick(variant: {
		family: string;
		style: FontStyle;
		weight: FontWeight;
		url: string;
	}) {
		if (store.activeElement.element instanceof TextBox) {
			store.activeElement.element.fontFamily = variant.family;
			store.activeElement.element.fontStyle = variant.style;
			store.activeElement.element.fontWeight = variant.weight;
			store.activeElement.element.fontUrl = variant.url;
			loading = true;
			store.activeElement.element.loading = true;
			const observer = new FontFaceObserver(variant.family);
			await observer.load();
			loading = false;
			store.activeElement.element.loading = false;
		}
	}
</script>

<div id="fonts-panel" style="height: {height}px" class="flex flex-col relative w-full">
	<label for="Fonts" class="font-bold ml-2">All Fonts</label>
	{#if $fontsQuery.isFetching}
		<div class="absolute flex items-center justify-center inset-0 bg-black/10">
			<Loader />
		</div>
	{:else if $fontsQuery.data}
		{#each $fontsQuery.data.pages as group}
			{#each group.data.fonts as font}
				<FontImage {font} {onFontClick} />
			{/each}
		{/each}
	{/if}

	<div bind:this={loaderRef} class="flex justify-center items-center h-10">
		{#if !$fontsQuery.hasNextPage}
			<span class="text-xs text-gray-500">No more fonts</span>
		{/if}
	</div>
</div>
