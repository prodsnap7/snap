<script lang="ts">
	import { canvasStore, activeElementStore } from '$lib/store';
	import { Circle, Rectangle } from 'phosphor-svelte';
	import MoveHandler from '$lib/components/move-handler.svelte';
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

	let status: 'resizing-br' | 'resizing-bl' | 'resizing-tr' | 'resizing-tl' | 'none' =
		$state('none');

	function onmousedown(event: MouseEvent) {
		event.stopPropagation();
		if (event.target instanceof HTMLElement) {
			if (event.target.classList.contains('resizing-br')) {
				status = 'resizing-br';
			} else if (event.target.classList.contains('resizing-bl')) {
				status = 'resizing-bl';
			} else if (event.target.classList.contains('resizing-tr')) {
				status = 'resizing-tr';
			} else if (event.target.classList.contains('resizing-tl')) {
				status = 'resizing-tl';
			}
		}
	}

	$effect(() => {
		console.log('status: ', status);
		function onmouseup() {
			status = 'none';
		}

		function onmousemove(event: MouseEvent) {
			if (image && image.type === 'image') {
				console.log('resize image');
				const ratio = image.width / image.height;
				moveHandler(ratio, event);
			}
		}

		function moveHandler(ratio: number, e: MouseEvent) {
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
					image.updateBounds({
						x,
						y,
						width,
						height
					});
				}
			}
			const resizeProportionally = (
				deltaX: number,
				deltaY: number,
				anchorX: number,
				anchorY: number
			) => {
				const width = e.movementX > e.movementY ? deltaX : deltaX * ratio;
				const height = e.movementX > e.movementY ? deltaY / ratio : deltaY;
				onResize({ x: anchorX, y: anchorY, width, height });
			};

			const movementX = e.movementX;
			const movementY = e.movementY;

			if (status === 'resizing-br') {
				resizeProportionally(movementX, movementX, 0, 0);
			} else if (status === 'resizing-tl') {
				resizeProportionally(-movementX, -movementX, movementX, movementX / ratio);
			} else if (status === 'resizing-bl') {
				resizeProportionally(-movementX, movementY, movementX, 0);
			} else if (status === 'resizing-tr') {
				resizeProportionally(movementX, -movementY, 0, movementY);
			}
		}

		window.addEventListener('pointerup', onmouseup);
		window.addEventListener('pointermove', onmousemove);

		return () => {
			window.removeEventListener('pointerup', onmouseup);
			window.removeEventListener('pointermove', onmousemove);
		};
	});
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
				class="absolute transform origin-center"
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
					class="object-cover absolute left-0 top-0 origin-center pointer-events-none"
				/>
				<div class="absolute inset-0 bg-black/50 pointer-events-none" />
				<div class="-inset-1 absolute border-2 border-primary" />
				<div {onmousedown} class="absolute -top-3 -left-3 cursor-nwse-resize resizing-tl">
					<svg
						class="fill-gray-50 pointer-events-none stroke-gray-600"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path
							id="_1944785510__b"
							d="M10 18.95a2.51 2.51 0 0 1-3-2.45v-7a2.5 2.5 0 0 1 2.74-2.49L10 7h6a3 3 0 0 1 3 3h-9v8.95z"
						></path>
					</svg>
				</div>
				<div
					{onmousedown}
					class="absolute rotate-90 -top-3 -right-3 cursor-nesw-resize resizing-tr"
				>
					<svg
						class="fill-gray-50 pointer-events-none stroke-gray-600"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path
							id="_1944785510__b"
							d="M10 18.95a2.51 2.51 0 0 1-3-2.45v-7a2.5 2.5 0 0 1 2.74-2.49L10 7h6a3 3 0 0 1 3 3h-9v8.95z"
						></path>
					</svg>
				</div>
				<div
					{onmousedown}
					class="absolute -rotate-90 -bottom-3 -left-3 cursor-nesw-resize resizing-bl"
				>
					<svg
						class="fill-gray-50 pointer-events-none stroke-gray-600"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path
							id="_1944785510__b"
							d="M10 18.95a2.51 2.51 0 0 1-3-2.45v-7a2.5 2.5 0 0 1 2.74-2.49L10 7h6a3 3 0 0 1 3 3h-9v8.95z"
						></path>
					</svg>
				</div>
				<div
					{onmousedown}
					class="absolute rotate-180 -bottom-3 -right-3 cursor-nwse-resize resizing-br"
				>
					<svg
						class="fill-gray-50 pointer-events-none stroke-gray-600"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path
							id="_1944785510__b"
							d="M10 18.95a2.51 2.51 0 0 1-3-2.45v-7a2.5 2.5 0 0 1 2.74-2.49L10 7h6a3 3 0 0 1 3 3h-9v8.95z"
						></path>
					</svg>
				</div>
				<img
					id={`image-${image.id}`}
					src={image.url}
					alt={image.alt}
					class="object-cover absolute left-0 top-0 origin-center pointer-events-none"
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
