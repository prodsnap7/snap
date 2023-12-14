<script lang="ts">
	type Props = {
		x: number;
		y: number;
		width: number;
		height: number;
		exclude?: State[];
		children?: any;
		rotation: number;
		onMove: (bounds: { x: number; y: number; width: number; height: number }) => void;
		onResize: (bounds: { x: number; y: number; width: number; height: number }) => void;
		onRotate: (rotation: number) => void;
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

	let frameid: number | null = null;
	let state = $state<State>('idle');
	let { x, y, width, height, rotation, exclude = [], onMove, onResize, children } = $props<Props>();

	function onmousedown(event: MouseEvent) {
		if (event.target instanceof HTMLElement) {
			if (event.target.classList.contains('move')) {
				state = 'moving';
			} else if (event.target.classList.contains('resizing-br')) {
				state = 'resizing-br';
			} else if (event.target.classList.contains('resizing-bl')) {
				state = 'resizing-bl';
			} else if (event.target.classList.contains('resizing-tr')) {
				state = 'resizing-tr';
			} else if (event.target.classList.contains('resizing-tl')) {
				state = 'resizing-tl';
			} else if (event.target.classList.contains('rotate')) {
				state = 'rotating';
			} else if (event.target.classList.contains('resizing-tm')) {
				state = 'resizing-tm';
			} else if (event.target.classList.contains('resizing-bm')) {
				state = 'resizing-bm';
			} else if (event.target.classList.contains('resizing-lm')) {
				state = 'resizing-lm';
			} else if (event.target.classList.contains('resizing-rm')) {
				state = 'resizing-rm';
			}
		}
	}

	$effect(() => {
		function onmouseup(event: MouseEvent) {
			state = 'idle';
		}

		function onmousemove(event: MouseEvent) {
			const ratio = width / height;
			const movementX = event.movementX;
			const movementY = event.movementY;
			if (frameid) {
				cancelAnimationFrame(frameid);
			}
			frameid = requestAnimationFrame(() => moveHandler(ratio, movementX, movementY));
		}

		function moveHandler(ratio: number, movementX: number, movementY: number) {
			const resizeProportionally = (
				deltaX: number,
				deltaY: number,
				anchorX: number,
				anchorY: number
			) => {
				const width = movementX > movementY ? deltaX : deltaX * ratio;
				const height = movementX > movementY ? deltaY / ratio : deltaY;
				onResize({ x: anchorX, y: anchorY, width, height });
			};

			if (state === 'moving') {
				onMove({ x: movementX, y: movementY, width: 0, height: 0 });
			} else if (state === 'resizing-br') {
				resizeProportionally(movementX, movementX, 0, 0);
			} else if (state === 'resizing-tl') {
				resizeProportionally(-movementX, -movementX, movementX, movementX / ratio);
			} else if (state === 'resizing-bl') {
				resizeProportionally(-movementX, movementY, movementX, 0);
			} else if (state === 'resizing-tr') {
				resizeProportionally(movementX, -movementY, 0, movementY);
			} else if (state === 'resizing-tm') {
				onResize({ x: 0, y: movementY, width: 0, height: -movementY });
			} else if (state === 'resizing-bm') {
				onResize({ x: 0, y: 0, width: 0, height: movementY });
			} else if (state === 'resizing-lm') {
				onResize({ x: movementX, y: 0, width: -movementX, height: 0 });
			} else if (state === 'resizing-rm') {
				onResize({ x: 0, y: 0, width: movementX, height: 0 });
			}
		}

		window.addEventListener('mouseup', onmouseup);
		window.addEventListener('mousemove', onmousemove);

		return () => {
			window.removeEventListener('mouseup', onmouseup);
			window.removeEventListener('mousemove', onmousemove);
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
</script>

{#snippet controller(classes)}
	<div role="button" tabindex="0" on:mousedown={onmousedown} class={'absolute ' + classes}></div>
{/snippet}

<div
	on:mousedown={onmousedown}
	tabindex="0"
	role="button"
	class="absolute border border-slate-800 cursor-move move"
	style="left: 0px; top: 0px; width: {width}px; height: {height}px; transform: translate({x}px, {y}px) rotate({rotation}deg);"
>
	{#each finalClasses as c}
		{@render controller(c)}
	{/each}

	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="postcss">
	.corner-control {
		@apply h-4 w-4 cursor-grab rounded-full border border-slate-400 bg-white;
	}
	.top-left {
		@apply left-0 top-0 -translate-x-1/2 -translate-y-1/2;
	}

	.top-right {
		@apply right-0 top-0 -translate-y-1/2 translate-x-1/2;
	}

	.bottom-left {
		@apply bottom-0 left-0 -translate-x-1/2 translate-y-1/2;
	}

	.bottom-right {
		@apply bottom-0 right-0 translate-x-1/2 translate-y-1/2;
	}

	.middle-control {
		@apply cursor-grab rounded border border-slate-400 bg-white;
	}

	.top-middle {
		@apply left-1/2 top-0 h-2 w-6 -translate-x-1/2 -translate-y-1/2;
	}

	.bottom-middle {
		@apply bottom-0 left-1/2 h-2 w-6 -translate-x-1/2 translate-y-1/2;
	}

	.left-middle {
		@apply left-0 top-1/2 h-6 w-2 -translate-x-1/2 -translate-y-1/2;
	}

	.right-middle {
		@apply right-0 top-1/2 h-6 w-2 -translate-y-1/2 translate-x-1/2;
	}
</style>
