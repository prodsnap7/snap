<script lang="ts">
	type Props = {
		bounds: {
			x: number;
			y: number;
			width: number;
			height: number;
		};
	};

	let { bounds } = $props<Props>();
</script>

<div
	id="drag-overlay"
	class="absolute border border-gray-300 bg-gray-400/10"
	style="left: {bounds.x}px; top: {bounds.y}px; width: {bounds.width}px; height: {bounds.height}px;"
/>
