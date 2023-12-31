<script lang="ts">
	import type { Image } from '$lib/store';

	type Props = {
		element: Image;
		scale?: number;
	};

	const { element, scale = 1 } = $props<Props>();
</script>

<img
	id={element.id}
	src={element.url}
	alt={element.alt}
	class="origin-center object-contain"
	style="
      width: {element.width * scale}px;
      height: {element.height * scale}px;
    "
/>
