<script lang="ts">
	import { getAllUploads, postUpload } from '$lib/api/uploads';
	import { Image, store } from '$lib/store';
	import { createQuery } from '@tanstack/svelte-query';

	const uploadsQuery = createQuery<any>({
		queryKey: ['uploads'],
		queryFn: getAllUploads
	});

	type ImageType = {
		url: string;
		publicId: string;
	};
	function addImageElement(image: ImageType) {
		const img = new Image({
			url: image.url,
			// update this to actually get the width and height of the image
			width: 200,
			height: 200,
			public_id: image.publicId,
			alt: image.publicId
		});

		store.addElement(img);
	}

	async function handleFileUpload(e: Event) {
		const node = e.target as HTMLInputElement;
		if (!node || !node.files) return;
		const file = node.files[0];

		await postUpload(file);
		$uploadsQuery.refetch();
	}
</script>

<label
	for="file-upload"
	class="w-full flex items-center justify-center rounded-sm p-2 bg-primary/40 hover:bg-primary/70 cursor-pointer"
>
	<input id="file-upload" type="file" class="sr-only" onchange={handleFileUpload} />
	<span class="text-foreground">Upload Photo</span>
</label>

<h2 class="font-bold my-4">Uploads</h2>

<div class="grid grid-cols-2 gap-3">
	{#each $uploadsQuery.data as photo}
		<button
			onclick={() => addImageElement(photo)}
			class="w-full border h-32 rounded-sm overflow-hidden shadow-sm hover:border-primary"
		>
			<img src={photo.url} alt={photo.filename} />
		</button>
	{/each}
</div>
