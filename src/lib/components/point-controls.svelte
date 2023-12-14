<script lang="ts">
	import type { Point } from '$lib/store';

	type Props = {
		point: Point;
	};

	const { point } = $props<Props>();
	let dragging = $state(false);

	function onmousedown(event: MouseEvent) {
		dragging = true;
	}

	$effect(() => {
		function onmouseup(event: MouseEvent) {
			dragging = false;
		}

		function onmousemove(event: MouseEvent) {
			if (dragging) {
				point.x += event.movementX;
				point.y += event.movementY;
			}
		}

		window.addEventListener('mouseup', onmouseup);
		window.addEventListener('mousemove', onmousemove);

		return () => {
			window.removeEventListener('mouseup', onmouseup);
			window.removeEventListener('mousemove', onmousemove);
		};
	});
</script>

<span
	on:mousedown={onmousedown}
	role="button"
	tabindex="0"
	style="left: {point.x}px; top: {point.y}px;"
	class="absolute w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow cursor-pointer border"
/>
