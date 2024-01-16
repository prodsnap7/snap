<script lang="ts">
	import { activeElementStore, type Image, canvasStore } from '$lib/store';
	import Loader from '../ui/loader.svelte';

	type Props = {
		element: Image;
		scale?: number;
	};

	const { element, scale = 1 } = $props<Props>();
	const isCropping = $derived(
		canvasStore.state === 'cropping' && activeElementStore.element === element
	);

	// $inspect(element.clipPath.rect, isCropping);
</script>

{#if element.loading}
	<img
		id={`image-${element.id}`}
		src={element.url}
		alt={element.alt}
		class="object-cover absolute left-0 top-0 origin-center"
		style="
			width: {element.width}px;
			height: {element.height}px;
			transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);
			clip-path: {element.clipPath}
		"
	/>
	<div
		class="absolute bg-black/40 flex items-center justify-center left-0 top-0 origin-center"
		style="
		width: {element.width}px;
		height: {element.height}px;
		transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);
	"
	>
		<Loader />
	</div>
{:else if !isCropping}
	<div
		style="
			transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);
			width: {element.width}px;
			height: {element.height}px;"
		class="absolute left-0 top-0 transform origin-center"
	>
		<img
			id={`image-${element.id}`}
			src={element.url}
			alt={element.alt}
			class="object-cover absolute left-0 top-0 origin-center"
			style="
	clip-path: {element.clipPath}
"
		/>
	</div>
{/if}
