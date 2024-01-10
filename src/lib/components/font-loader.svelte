<script lang="ts">
	type Props = {
		fontUrls: string[];
	};

	const { fontUrls } = $props<Props>();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	{#each fontUrls as url}
		<link rel="stylesheet" href={url} />
	{/each}
</svelte:head>
