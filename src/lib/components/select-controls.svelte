<script lang="ts">
	import { Group, Curve, store } from '$lib/store';
	import MoveHandler from './move-handler.svelte';
	import PointControls from './point-controls.svelte';
	import { snapToGrid } from '$lib/utils/snap-utils';

	const selected = $derived(store.selectedElements.elements);

	function getPoints() {
		const points = [];
		for (const element of selected) {
			if (element instanceof Curve) {
				points.push(...element.points);
			}
		}
		return points;
	}
	const points = $derived(getPoints());

	function onMove({ x, y }: { x: number; y: number }) {
		const currentEl = {
			x: store.selectedElements.bounds.x + x,
			y: store.selectedElements.bounds.y + y,
			width: store.selectedElements.bounds.width,
			height: store.selectedElements.bounds.height
		};

		const otherEls = [
			...store.unselectedElements.map((el) => el.bounds),
			{ x: 0, y: 0, width: store.canvas.width, height: store.canvas.height }
		];

		const snap = snapToGrid(currentEl, otherEls, 3);

		store.selectedElements.updateBounds({
			x: snap.x - store.selectedElements.bounds.x,
			y: snap.y - store.selectedElements.bounds.y,
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
			x: store.selectedElements.bounds.x + x,
			y: store.selectedElements.bounds.y + y,
			width: store.selectedElements.bounds.width + width,
			height: store.selectedElements.bounds.height + height
		};

		const otherEls = [
			...store.unselectedElements.map((el) => el.bounds),
			{ x: 0, y: 0, width: store.canvas.width, height: store.canvas.height }
		];

		const snap = snapToGrid(currentEl, otherEls, 5);

		store.selectedElements.updateBounds({
			x: snap.x - store.selectedElements.bounds.x,
			y: snap.y - store.selectedElements.bounds.y,
			width: snap.width - store.selectedElements.bounds.width,
			height: snap.height - store.selectedElements.bounds.height
		});
	}

	const bounds = $derived(store.selectedElements.bounds);
</script>

{#if selected.length > 1}
	<MoveHandler
		{bounds}
		rotation={store.selectedElements.rotation}
		exclude={['rotating', 'resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		{onMove}
		{onResize}
		onRotate={(r) => {
			store.selectedElements.rotation = r;
		}}
	></MoveHandler>
{:else if selected.length === 1 && selected[0] instanceof Curve}
	<MoveHandler
		{bounds}
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
		{onResize}
		onRotate={() => {}}
	>
		{#each points as point}
			<PointControls {point} />
		{/each}
	</MoveHandler>
{:else if selected.length === 1 && selected[0] instanceof Group}
	<MoveHandler
		{bounds}
		rotation={store.selectedElements.rotation}
		exclude={['resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		{onMove}
		{onResize}
		onRotate={(r) => {
			store.selectedElements.rotation = r;
		}}
	></MoveHandler>
{:else if selected.length === 1}
	<MoveHandler
		{bounds}
		rotation={store.selectedElements.rotation}
		{onMove}
		{onResize}
		onRotate={(rotation) => {
			store.selectedElements.rotation = rotation;
		}}
	/>
{/if}
