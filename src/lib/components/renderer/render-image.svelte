<script lang="ts">
	import type { Image } from '$lib/store';

	type Props = {
		element: Image;
		scale?: number;
	};

	const { element, scale = 1 } = $props<Props>();
</script>

<div
	style="width: {element.rect.width}px; height: {element.rect.height}px"
	class="absolute inset-0 image-renderer"
>
	<img
		id={element.id}
		src={element.url}
		alt={element.alt}
		class="origin-center"
		style="
      width: {element.rect.width * scale}px;
      height: {element.rect.height * scale}px;
			clip-path: {element.clipPath.clip}
    "
	/>
</div>
