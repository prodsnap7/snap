<script lang="ts">
	import { store } from '$lib/store';
	import MoveHandler from './move-handler.svelte';
	import PointControls from './point-controls.svelte';

	const { selectedElements } = store;
</script>

{#if selectedElements.elements.length > 1}
	<MoveHandler
		x={selectedElements.x}
		y={selectedElements.y}
		width={selectedElements.width}
		height={selectedElements.height}
		rotation={selectedElements.rotation}
		exclude={['resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		onMove={({ x, y }) => {
			selectedElements.x = x;
			selectedElements.y = y;
		}}
		onResize={({ width, height, x, y }) => {
			selectedElements.width = width;
			selectedElements.height = height;
			selectedElements.x = x;
			selectedElements.y = y;
		}}
		onRotate={(rotation) => {
			selectedElements.rotation = rotation;
		}}
	/>
{:else if selectedElements.elements.length === 1 && selectedElements.elements[0].type === 'curve'}
	<MoveHandler
		x={selectedElements.x}
		y={selectedElements.y}
		width={selectedElements.width}
		height={selectedElements.height}
		rotation={selectedElements.rotation}
		exclude={[
			'resizing-tm',
			'resizing-bm',
			'resizing-lm',
			'resizing-rm',
			'resizing-br',
			'resizing-bl',
			'resizing-tr',
			'resizing-tl'
		]}
		onMove={({ x, y }) => {
			selectedElements.x = x;
			selectedElements.y = y;
		}}
		onResize={({ width, height, x, y }) => {
			selectedElements.width = width;
			selectedElements.height = height;
			selectedElements.x = x;
			selectedElements.y = y;
		}}
		onRotate={(rotation) => {
			selectedElements.rotation = rotation;
		}}
	>
		{#each selectedElements.elements[0].points as point}
			<PointControls {point} />
		{/each}
	</MoveHandler>
{:else if selectedElements.elements.length === 1}
	<MoveHandler
		x={selectedElements.x}
		y={selectedElements.y}
		width={selectedElements.width}
		height={selectedElements.height}
		rotation={selectedElements.rotation}
		onMove={({ x, y }) => {
			selectedElements.x = x;
			selectedElements.y = y;
		}}
		onResize={({ width, height, x, y }) => {
			selectedElements.width = width;
			selectedElements.height = height;
			selectedElements.x = x;
			selectedElements.y = y;
		}}
		onRotate={(rotation) => {
			selectedElements.rotation = rotation;
		}}
	/>
{/if}
