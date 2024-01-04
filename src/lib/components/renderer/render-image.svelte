<script lang="ts">
	import { activeElementStore, type Image, canvasStore } from '$lib/store';

	type Props = {
		element: Image;
		scale?: number;
	};

	const { element, scale = 1 } = $props<Props>();
	const isCropping = $derived(
		canvasStore.state === 'cropping' && activeElementStore.element === element
	);

	$inspect(element.clipPath.rect, isCropping);
</script>

{#if !isCropping}
	<img
		id={`image-${element.id}`}
		src={element.url}
		alt={element.alt}
		class="object-cover absolute left-0 top-0 origin-center"
		style="
			width: {element.width}px;
			height: {element.height}px;
			transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);
			clip-path: {element.clipPath.clip}
		"
	/>
{/if}
