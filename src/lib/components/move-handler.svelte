<script lang="ts">
	import clsx from 'clsx';
	import { ArrowsCounterClockwise, ArrowsOutCardinal } from 'phosphor-svelte';

	type Props = {
		bounds: { x: number; y: number; width: number; height: number };
		exclude?: State[];
		children?: any;
		rotation: number;
		transformOrigin?: string;
		scale?: number;
		onMove: (bounds: { x: number; y: number; width: number; height: number }) => void;
		onResize: (bounds: { x: number; y: number; width: number; height: number }) => void;
		onRotate: (rotation: number) => void;
		onMouseDown?: (event: MouseEvent) => void;
	};

	type State =
		| 'idle'
		| 'moving'
		| 'rotating'
		| 'resizing-br'
		| 'resizing-bl'
		| 'resizing-tr'
		| 'resizing-tl'
		| 'resizing-tm'
		| 'resizing-bm'
		| 'resizing-lm'
		| 'resizing-rm';

	let frameid = $state<number | null>(null);
	let status = $state<State>('idle');
	let {
		bounds,
		transformOrigin = 'center center',
		rotation,
		exclude = [],
		onMove,
		onResize,
		children,
		onMouseDown,
		onRotate
	} = $props<Props>();

	let center = $state<{ x: number; y: number }>({ x: 0, y: 0 });

	function onmousedown(event: MouseEvent) {
		event.stopPropagation();
		if (event.target instanceof HTMLElement) {
			if (event.target.classList.contains('move')) {
				status = 'moving';
				onMouseDown?.(event);
			} else if (event.target.classList.contains('resizing-br')) {
				status = 'resizing-br';
			} else if (event.target.classList.contains('resizing-bl')) {
				status = 'resizing-bl';
			} else if (event.target.classList.contains('resizing-tr')) {
				status = 'resizing-tr';
			} else if (event.target.classList.contains('resizing-tl')) {
				status = 'resizing-tl';
			} else if (event.target.classList.contains('rotate-control')) {
				status = 'rotating';
				center = {
					x: x + width / 2,
					y: y + height / 2
				};
			} else if (event.target.classList.contains('resizing-tm')) {
				status = 'resizing-tm';
			} else if (event.target.classList.contains('resizing-bm')) {
				status = 'resizing-bm';
			} else if (event.target.classList.contains('resizing-lm')) {
				status = 'resizing-lm';
			} else if (event.target.classList.contains('resizing-rm')) {
				status = 'resizing-rm';
			}
		}
	}

	let canvasPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });

	$effect(() => {
		const canvas = document.getElementById('canvas');
		if (canvas) {
			const { x, y } = canvas.getBoundingClientRect();
			canvasPosition = { x, y };
		}

		function onmouseup(event: MouseEvent) {
			status = 'idle';
			event.stopPropagation();
		}

		function onmousemove(event: MouseEvent) {
			const ratio = width / height;
			if (frameid) {
				cancelAnimationFrame(frameid);
			}
			frameid = requestAnimationFrame(() => moveHandler(ratio, event));
			// moveHandler(ratio, movementX, movementY);
		}

		function rotatePoint(x: number, y: number, angle: number) {
			const radians = (Math.PI / 180) * angle;
			const cos = Math.cos(radians);
			const sin = Math.sin(radians);
			return {
				x: x * cos - y * sin,
				y: x * sin + y * cos
			};
		}

		function moveHandler(ratio: number, e: MouseEvent) {
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

			const adjustedMovement = rotatePoint(e.movementX, e.movementY, -rotation);
			const movementX = adjustedMovement.x;
			const movementY = adjustedMovement.y;

			if (status === 'moving') {
				onMove({ x: e.movementX, y: e.movementY, width: 0, height: 0 });
			} else if (status === 'resizing-br') {
				resizeProportionally(movementX, movementX, 0, 0);
			} else if (status === 'resizing-tl') {
				resizeProportionally(-movementX, -movementX, movementX, movementX / ratio);
			} else if (status === 'resizing-bl') {
				resizeProportionally(-movementX, movementY, movementX, 0);
			} else if (status === 'resizing-tr') {
				resizeProportionally(movementX, -movementY, 0, movementY);
			} else if (status === 'resizing-tm') {
				onResize({ x: 0, y: movementY, width: 0, height: -movementY });
			} else if (status === 'resizing-bm') {
				onResize({ x: 0, y: 0, width: 0, height: movementY });
			} else if (status === 'resizing-lm') {
				onResize({ x: movementX, y: 0, width: -movementX, height: 0 });
			} else if (status === 'resizing-rm') {
				onResize({ x: 0, y: 0, width: movementX, height: 0 });
			} else if (status === 'rotating') {
				const R2D = 180 / Math.PI;
				const posX = e.clientX - canvasPosition.x;
				const posY = e.clientY - canvasPosition.y;
				const x = posX - center.x;
				const y = posY - center.y;
				const d = R2D * Math.atan2(y, x);
				const currentRotation = d;
				onRotate(currentRotation + 270);
			}
		}

		window.addEventListener('pointerup', onmouseup);
		window.addEventListener('pointermove', onmousemove);

		return () => {
			window.removeEventListener('pointerup', onmouseup);
			window.removeEventListener('pointermove', onmousemove);
		};
	});

	const include = [
		'resizing-br',
		'resizing-bl',
		'resizing-tr',
		'resizing-tl',
		'resizing-tm',
		'resizing-bm',
		'resizing-lm',
		'resizing-rm'
	] as const;
	const classMap: Record<(typeof include)[number], string> = {
		'resizing-br': 'resizing-br corner-control bottom-right',
		'resizing-bl': 'resizing-bl corner-control bottom-left',
		'resizing-tr': 'resizing-tr corner-control top-right',
		'resizing-tl': 'resizing-tl corner-control top-left',
		'resizing-tm': 'resizing-tm middle-control top-middle',
		'resizing-bm': 'resizing-bm middle-control bottom-middle',
		'resizing-lm': 'resizing-lm middle-control left-middle',
		'resizing-rm': 'resizing-rm middle-control right-middle'
	} as const;
	const classes = include.filter((c) => !exclude.includes(c));
	// get the classes from the classMap and classes
	const finalClasses = classes.map((c) => classMap[c]);

	function onMoveHandlerMouseUp(event: MouseEvent) {}

	let x = $derived(bounds.x);
	let y = $derived(bounds.y);
	let width = $derived(bounds.width);
	let height = $derived(bounds.height);

	function updateCursorStyles(rotationAngle: number): void {
		const normalizeAngle = (angle: number): number => {
			angle = angle % 360;
			return angle < 0 ? angle + 360 : angle;
		};

		const adjustedAngle = normalizeAngle(rotationAngle);

		const cursorMap: { [key: number]: { [key: string]: string } } = {
			0: {
				'top-middle': 'ns-resize',
				'bottom-middle': 'ns-resize',
				'left-middle': 'ew-resize',
				'right-middle': 'ew-resize',
				'top-left': 'nwse-resize',
				'top-right': 'nesw-resize',
				'bottom-left': 'nesw-resize',
				'bottom-right': 'nwse-resize'
			},
			90: {
				'top-middle': 'ew-resize',
				'bottom-middle': 'ew-resize',
				'left-middle': 'ns-resize',
				'right-middle': 'ns-resize',
				'top-left': 'nesw-resize',
				'top-right': 'nwse-resize',
				'bottom-left': 'nwse-resize',
				'bottom-right': 'nesw-resize'
			},
			180: {
				'top-middle': 'ns-resize',
				'bottom-middle': 'ns-resize',
				'left-middle': 'ew-resize',
				'right-middle': 'ew-resize',
				'top-left': 'nwse-resize',
				'top-right': 'nesw-resize',
				'bottom-left': 'nesw-resize',
				'bottom-right': 'nwse-resize'
			},
			270: {
				'top-middle': 'ew-resize',
				'bottom-middle': 'ew-resize',
				'left-middle': 'ns-resize',
				'right-middle': 'ns-resize',
				'top-left': 'nesw-resize',
				'top-right': 'nwse-resize',
				'bottom-left': 'nwse-resize',
				'bottom-right': 'nesw-resize'
			}
		};

		const closestAngle = [0, 90, 180, 270].reduce((prev, curr) =>
			Math.abs(curr - adjustedAngle) < Math.abs(prev - adjustedAngle) ? curr : prev
		);

		const cursors = cursorMap[closestAngle];

		for (const handle in cursors) {
			const element = document.querySelector(`.${handle}`) as HTMLElement;
			if (element) {
				element.style.cursor = cursors[handle];
			}
		}
	}

	$effect(() => {
		updateCursorStyles(rotation);
	});
</script>

{#snippet controller(classes)}
	<div
		role="button"
		tabindex="0"
		on:mousedown={onmousedown}
		class={clsx('absolute ' + classes, { 'opacity-20': status !== 'idle' })}
	></div>
{/snippet}

<div
	id="move-handler"
	{onmousedown}
	onmouseup={onMoveHandlerMouseUp}
	tabindex="0"
	role="button"
	class={clsx('absolute border border-primary cursor-move move')}
	style="
		left: 0px;
		top: 0px;
		width: {width}px;
		height: {height}px;
		transform: translate({x}px, {y}px) rotate({rotation}deg);
		transform-origin: {transformOrigin};
	"
>
	<div
		class="absolute inset-0 flex items-center justify-center pointer-events-none text-center text-xs select-none"
	>
		{#if status === 'rotating'}
			<div class="px-2 py-1.5 rounded text-slate-100 shadow bg-slate-800 pointer-events-none">
				{(rotation - 360).toFixed(0)}&deg;
			</div>
		{:else if status.startsWith('resizing-br')}
			<div class="px-2 py-1.5 rounded text-slate-100 shadow bg-slate-800 pointer-events-none">
				{width.toFixed(0)} x {height.toFixed(0)}
			</div>
		{:else if status === 'moving'}
			<div class="px-2 py-1.5 rounded text-slate-100 shadow bg-slate-800 pointer-events-none">
				{x.toFixed(0)} x {y.toFixed(0)}
			</div>
		{/if}
	</div>
	{#if !exclude.includes('rotating')}
		<div
			role="button"
			tabindex="0"
			{onmousedown}
			class={clsx('absolute rotate-control flex items-center justify-center', {
				'opacity-20': status !== 'idle'
			})}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-refresh-cw pointer-events-none"
				><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path
					d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
				/><path d="M8 16H3v5" /></svg
			>
		</div>
	{/if}
	{#each finalClasses as c}
		{@render controller(c)}
	{/each}

	{#if height < 20}
		<div
			{onmousedown}
			role="button"
			tabindex="0"
			class="absolute -bottom-10 left-1/2 flex items-center justify-center bg-white text-slate-700 border border-slate-500 move -translate-x-1/2 h-6 w-6 rounded-full"
		>
			<ArrowsOutCardinal class="pointer-events-none" size={18} />
		</div>
	{/if}
</div>

{#if children}
	{@render children()}
{/if}

<style lang="postcss">
	.corner-control {
		@apply h-2.5 w-2.5 cursor-grab rounded-full border-2 border-primary bg-white hover:bg-primary;
	}
	.top-left {
		@apply left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nw-resize;
	}

	.top-right {
		@apply right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-ne-resize;
	}

	.bottom-left {
		@apply bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-sw-resize;
	}

	.bottom-right {
		@apply bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-se-resize;
	}

	.middle-control {
		@apply cursor-grab rounded border-2 border-primary bg-white hover:bg-primary;
	}

	.top-middle {
		@apply left-1/2 top-0 h-1.5 w-4 -translate-x-1/2 -translate-y-1/2 cursor-n-resize;
	}

	.bottom-middle {
		@apply bottom-0 left-1/2 h-1.5 w-4 -translate-x-1/2 translate-y-1/2 cursor-s-resize;
	}

	.left-middle {
		@apply left-0 top-1/2 h-4 w-1.5 -translate-x-1/2 -translate-y-1/2 cursor-w-resize;
	}

	.right-middle {
		@apply right-0 top-1/2 h-4 w-1.5 -translate-y-1/2 translate-x-1/2 cursor-e-resize;
	}

	.rotate-control {
		@apply -bottom-10 left-1/2 h-5 w-5 -translate-x-1/2 cursor-rotate rounded-full border border-primary bg-white text-primary hover:bg-primary hover:text-white;
	}
</style>
