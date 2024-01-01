<script lang="ts">
	import { canvasStore, activeElementStore } from '$lib/store';
	import MoveHandler from '../move-handler.svelte';

	let image = $derived(activeElementStore.element);

	function onResize({
		x,
		y,
		width,
		height
	}: {
		x: number;
		y: number;
		width: number;
		height: number;
	}) {
		if (image && image.type === 'image') {
			image.clipPath.updateBounds({ x, y, width, height });
		}
	}

	function onMove({ x, y }: { x: number; y: number }) {
		if (image && image.type === 'image') {
			image.clipPath.updateBounds({ x, y, width: 0, height: 0 });
		}
	}
</script>

{#if image && image.type === 'image'}
	<div id="crop-canvas-container" class="absolute inset-0 flex items-center justify-center">
		<div
			id="crop-canvas"
			class="relative"
			style="width: {canvasStore.width}px; height: {canvasStore.height}px"
		>
			<div
				id="crop-controls"
				style="left: {image.x}px; top: {image.y}px; width: {image.width}px; height: {image.height}px;"
				class="absolute border border-primary transform origin-center"
			>
				<img
					id={`image-${image.id}`}
					src={image.url}
					alt={image.alt}
					class="object-cover absolute left-0 top-0 origin-center"
				/>
				<div class="absolute inset-0 bg-black/50 pointer-events-none" />
				<img
					id={`image-${image.id}`}
					src={image.url}
					alt={image.alt}
					class="object-cover absolute left-0 top-0 origin-center"
					style="
            clip-path: {image.clipPath.clip}
          "
				/>
				<MoveHandler
					bounds={image.clipPath.rect}
					rotation={image.rotation}
					exclude={['rotating']}
					onRotate={() => {}}
					{onMove}
					{onResize}
				/>
				<div
					class="pointer-events-none absolute top-0 h-full w-px bg-white opacity-50"
					style="transform: translate({image.width / 4}px, 0px);"
				></div>
				<div
					class="pointer-events-none absolute top-0 h-full w-px bg-white opacity-50"
					style="transform: translate({(image.width * 3) / 4}px, 0px);"
				></div>
				<div
					class="pointer-events-none absolute top-0 h-px w-full bg-white opacity-50"
					style="transform: translate(0px, {(image.height * 1) / 4}px);"
				></div>
				<div
					class="pointer-events-none absolute top-0 h-px w-full bg-white opacity-50"
					style="transform: translate(0px, {(image.height * 3) / 4}px);"
				></div>
			</div>
		</div>
		"
	</div>
{/if}
