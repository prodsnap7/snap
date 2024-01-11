<script lang="ts">
	import { getAllUploads } from '$lib/api/uploads';
	import { createQuery } from '@tanstack/svelte-query';

	const uploadsQuery = createQuery({
		queryKey: ['uploads'],
		queryFn: getAllUploads
	});
</script>

<h2 class="font-bold my-4">Uploads</h2>

<div class="grid grid-cols-2 gap-3">
	{#each $uploadsQuery.data as photo}
		<img src={photo.url} alt={photo.filename} />
	{/each}
</div>
