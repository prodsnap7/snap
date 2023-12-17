<script lang="ts">
	import { getGridLines, store } from '$lib/store';
	import Line from './line.svelte';

	const { width, height } = store.canvas;
	const lines = getGridLines();

	$inspect(lines);
</script>

<svg {width} {height} class="absolute inset-0">
	<defs>
		<marker id="circle" markerWidth="6" markerHeight="6" refX="3" refY="3">
			<circle cx="3" cy="3" r="2" class="fill-red-900 stroke-red-900" />
		</marker>
	</defs>
	{#each lines as line}
		<Line {...line} />
	{/each}
</svg>
