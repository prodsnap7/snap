<script lang="ts">
	import { getAllUploads } from '$lib/api/uploads';
	import { Image, store } from '$lib/store';
	import { createQuery } from '@tanstack/svelte-query';

	const uploadsQuery = createQuery({
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
</script>

<h2 class="font-bold my-4">Uploads</h2>

<div class="grid grid-cols-2 gap-3">
	{#each $uploadsQuery.data as photo}
		<button
			onclick={() => addImageElement(photo)}
			class="w-full border h-32 rounded-sm overflow-hidden"
		>
			<img src={photo.url} alt={photo.filename} />
		</button>
	{/each}
</div>
