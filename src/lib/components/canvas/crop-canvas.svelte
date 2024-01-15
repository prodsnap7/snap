<script lang="ts">
	import { canvasStore, activeElementStore } from '$lib/store';
	import { Circle, Rectangle } from 'phosphor-svelte';
	import MoveHandler from '../move-handler.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	let image = activeElementStore.element;

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
			image.clipX += x;
			image.clipY += y;
			image.clipWidth += width;
			image.clipHeight += height;
			image.updateClipBounds({
				x,
				y,
				width,
				height
			});
		}
	}

	function onMove({ x, y }: { x: number; y: number }) {
		if (image && image.type === 'image') {
			image.clipX += x;
			image.clipY += y;
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
				<div
					style="
						left: 50%;
						top: -60px;
						transform: translateX(-50%);
					"
					class="absolute origin-center shadow-xl pointer-events-auto"
				>
					<div
						class="p-1.5 px-2 gap-2 shadow-sm rounded z-10 flex items-center bg-background border border-primary"
					>
						<ToggleGroup.Root
							value={image.clipType}
							onValueChange={(val) => {
								if (image && val && image.type === 'image') {
									// image.clipPath.setType(val as 'circle' | 'rectangle');
									image.clipType = val as 'circle' | 'rectangle';
								}
							}}
							type="single"
						>
							<ToggleGroup.Item value="circle">
								<Circle size={15} />
							</ToggleGroup.Item>
							<ToggleGroup.Item value="rectangle">
								<Rectangle size={15} />
							</ToggleGroup.Item>
						</ToggleGroup.Root>
					</div>
				</div>
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
            clip-path: {image.clipPath}
          "
				/>
				<MoveHandler
					bounds={{
						x: image.clipX,
						y: image.clipY,
						width: image.clipWidth,
						height: image.clipHeight
					}}
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
	</div>
{/if}
