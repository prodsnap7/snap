<script lang="ts">
	import { store } from '$lib/store';
	import MoveHandler from './move-handler.svelte';
	import PointControls from './point-controls.svelte';
</script>

{#if store.selectedElements.elements.length > 1}
	<div
		style="
		left: {store.selectedElements.width - store.selectedElements.x}px;
		top: {store.selectedElements.y}px;
		transform: rotate({store.selectedElements.rotation}deg);
		"
		class="translate-y-1/2 -translate-x-1/2 absolute origin-center"
	>
		Hello
	</div>
	<MoveHandler
		x={store.selectedElements.x}
		y={store.selectedElements.y}
		width={store.selectedElements.width}
		height={store.selectedElements.height}
		rotation={store.selectedElements.rotation}
		exclude={['resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		onMove={({ x, y }) => {
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onResize={({ width, height, x, y }) => {
			store.selectedElements.width = width;
			store.selectedElements.height = height;
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onRotate={(rotation) => {
			store.selectedElements.rotation = rotation;
		}}
	/>
{:else if store.selectedElements.elements.length === 1 && store.selectedElements.elements[0].type === 'curve'}
	<MoveHandler
		x={store.selectedElements.x}
		y={store.selectedElements.y}
		width={store.selectedElements.width}
		height={store.selectedElements.height}
		rotation={store.selectedElements.rotation}
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
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onResize={({ width, height, x, y }) => {
			store.selectedElements.width = width;
			store.selectedElements.height = height;
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onRotate={(rotation) => {
			store.selectedElements.rotation = rotation;
		}}
	>
		{#if store.selectedElements.elements[0]}
			{#each store.selectedElements.elements[0].points as point}
				<PointControls {point} />
			{/each}
		{/if}
	</MoveHandler>
{:else if store.selectedElements.elements.length === 1}
	<MoveHandler
		x={store.selectedElements.x}
		y={store.selectedElements.y}
		width={store.selectedElements.width}
		height={store.selectedElements.height}
		rotation={store.selectedElements.rotation}
		onMove={({ x, y }) => {
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onResize={({ width, height, x, y }) => {
			store.selectedElements.width = width;
			store.selectedElements.height = height;
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onRotate={(rotation) => {
			store.selectedElements.rotation = rotation;
		}}
	/>
{/if}
