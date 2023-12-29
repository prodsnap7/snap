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
	class="absolute border border-primary bg-secondary/40"
	style="left: {bounds.x}px; top: {bounds.y}px; width: {bounds.width}px; height: {bounds.height}px;"
/>
