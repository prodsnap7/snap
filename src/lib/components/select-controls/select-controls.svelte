<script lang="ts">
	import { Group, Curve, store, TextBox } from '$lib/store';
	import MoveHandler from '../move-handler.svelte';
	import PointControls from '../point-controls.svelte';
	import { snapToGrid } from '$lib/utils/snap-utils';
	import TextControls from './text-controls.svelte';
	import GroupControls from './group-controls.svelte';

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

	function updateBounds({
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

		const snap = snapToGrid(currentEl, otherEls, 2);

		return {
			x: snap.x - store.selectedElements.bounds.x,
			y: snap.y - store.selectedElements.bounds.y,
			width: snap.width - store.selectedElements.bounds.width,
			height: snap.height - store.selectedElements.bounds.height
		};
	}

	function onMove({ x, y }: { x: number; y: number }) {
		const bounds = updateBounds({ x, y, width: 0, height: 0 });

		store.selectedElements.move(bounds);
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
		const bounds = updateBounds({ x, y, width, height });

		store.selectedElements.updateBounds(bounds);
	}

	function onRotate(rotation: number) {
		store.selectedElements.rotation = rotation;
	}

	const bounds = $derived(store.selectedElements.bounds);
</script>

{#if selected.length > 1}
	<MoveHandler
		{bounds}
		rotation={store.selectedElements.rotation}
		exclude={['rotating', 'resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		{onMove}
		{onRotate}
		{onResize}
	></MoveHandler>
{:else if store.selectedElements.isCurve}
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
	></MoveHandler>
	{#each points as point}
		<PointControls {point} />
	{/each}
{:else if store.selectedElements.isGroup}
	<GroupControls
		element={store.selectedElements.elements[0] as Group}
		{onMove}
		{onRotate}
		{onResize}
	/>
{:else if store.selectedElements.isImage}
	<MoveHandler
		{bounds}
		rotation={store.selectedElements.rotation}
		exclude={['resizing-tm', 'resizing-bm', 'resizing-lm', 'resizing-rm']}
		{onMove}
		{onRotate}
		{onResize}
	></MoveHandler>
{:else if store.selectedElements.isText}
	<TextControls
		element={store.selectedElements.elements[0] as TextBox}
		{onRotate}
		{onMove}
		{onResize}
	/>
{:else if selected.length === 1}
	<MoveHandler {bounds} rotation={store.selectedElements.rotation} {onMove} {onResize} {onRotate} />
{/if}
