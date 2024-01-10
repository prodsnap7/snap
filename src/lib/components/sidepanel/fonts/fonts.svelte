<script lang="ts">
	import { fetchAllFonts } from '$lib/api/fonts';
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import Loader from '../../ui/loader.svelte';
	import FontImage from './font-image.svelte';

	let height = $state(window.innerHeight);
	let loading = $state(false);
	let loaderRef = $state<HTMLElement | null>(null);

	$effect(() => {
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

	$effect(() => {
		if (!$fontsQuery.hasNextPage || !loaderRef) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					$fontsQuery.fetchNextPage();
				}
			},
			{ threshold: 1 }
		);

		observer.observe(loaderRef);

		return () => observer.unobserve(loaderRef!);
	});

	async function onFontClick() {}
</script>

<div id="fonts-panel" style="height: {height}px" class="flex flex-col space-y-1 relative w-full">
	<label for="Fonts" class="font-bold ml-2">All Fonts</label>
	{#if $fontsQuery.isFetching}
		<div class="absolute inset-0 blur-md">
			<Loader />
		</div>
	{:else if $fontsQuery.data}
		{#each $fontsQuery.data.pages as group}
			{#each group.data.fonts as font}
				<FontImage {font} {loading} {onFontClick} />
			{/each}
		{/each}
	{/if}
</div>
