<script lang="ts">
	import { store } from '$lib/store';
	import MoveHandler from './move-handler.svelte';
	import PointControls from './point-controls.svelte';
	import { snapToGrid } from '$lib/utils/snap-utils';

	const selected = $derived(store.selectedElements.elements);

	function getPoints() {
		const points = [];
		for (const element of selected) {
			if (element.type === 'curve') {
				points.push(...element.points);
			}
		}
		return points;
	}
	const points = $derived(getPoints());

	function onMove({ x, y }: { x: number; y: number }) {
		const currentEl = {
			x: store.selectedElements.x + x,
			y: store.selectedElements.y + y,
			width: store.selectedElements.width,
			height: store.selectedElements.height
		};

		const otherEls = [
			...store.unselectedElements,
			{ x: 0, y: 0, width: store.canvas.width, height: store.canvas.height }
		];

		const snap = snapToGrid(currentEl, otherEls, 3);

		store.selectedElements.updateBounds({
			x: snap.x - store.selectedElements.x,
			y: snap.y - store.selectedElements.y,
			width: 0,
			height: 0
		});
	}

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
		const currentEl = {
			x: store.selectedElements.x + x,
			y: store.selectedElements.y + y,
			width: store.selectedElements.width + width,
			height: store.selectedElements.height + height
		};

		const otherEls = [
			...store.unselectedElements,
			{ x: 0, y: 0, width: store.canvas.width, height: store.canvas.height }
		];

		const snap = snapToGrid(currentEl, otherEls, 5);

		store.selectedElements.updateBounds({
			x: snap.x - store.selectedElements.x,
			y: snap.y - store.selectedElements.y,
			width: snap.width - store.selectedElements.width,
			height: snap.height - store.selectedElements.height
		});
	}
</script>

{#if selected.length > 1}
	<MoveHandler
		x={store.selectedElements.bounds.x}
		y={store.selectedElements.bounds.y}
		width={store.selectedElements.bounds.width}
		height={store.selectedElements.bounds.height}
		rotation={store.selectedElements.rotation}
		exclude={['rotating', 'resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		{onMove}
		onResize={({ width, height, x, y }) => {
			store.selectedElements.updateBounds({ x, y, width, height });
		}}
		onRotate={() => {}}
	></MoveHandler>
{:else if selected.length === 1 && selected[0].type === 'curve'}
	<MoveHandler
		x={store.selectedElements.x}
		y={store.selectedElements.y}
		width={store.selectedElements.width}
		height={store.selectedElements.height}
		rotation={store.selectedElements.rotation}
		exclude={[
			'rotating',
			'resizing-tm',
			'resizing-bm',
			'resizing-lm',
			'resizing-rm',
			'resizing-br',
			'resizing-bl',
			'resizing-tr',
			'resizing-tl'
		]}
		{onMove}
		onResize={({ width, height, x, y }) => {
			store.selectedElements.width = width;
			store.selectedElements.height = height;
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onRotate={() => {}}
	>
		{#each points as point}
			<PointControls {point} />
		{/each}
	</MoveHandler>
{:else if selected.length === 1 && selected[0].type === 'group'}
	<MoveHandler
		x={store.selectedElements.bounds.x}
		y={store.selectedElements.bounds.y}
		width={store.selectedElements.bounds.width}
		height={store.selectedElements.bounds.height}
		rotation={store.selectedElements.rotation}
		exclude={['resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		{onMove}
		onResize={({ width, height, x, y }) => {
			store.selectedElements.width = width;
			store.selectedElements.height = height;
			store.selectedElements.x = x;
			store.selectedElements.y = y;
		}}
		onRotate={(r) => {
			store.selectedElements.rotation = r;
		}}
	></MoveHandler>
{:else if selected.length === 1}
	<MoveHandler
		x={store.selectedElements.x}
		y={store.selectedElements.y}
		width={store.selectedElements.width}
		height={store.selectedElements.height}
		rotation={store.selectedElements.rotation}
		{onMove}
		{onResize}
		onRotate={(rotation) => {
			store.selectedElements.rotation = rotation;
		}}
	/>
{/if}
