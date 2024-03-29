<script lang="ts">
	import {
		Curve,
		activeElementStore,
		Shape,
		PathShape,
		TextBox,
		Image,
		canvasStore,
		elementsStore
	} from '$lib/store';
	import * as Popover from '../ui/popover';
	import Slider from '../ui/slider/slider.svelte';
	import CurveToolbar from './curve';
	import ShapeToolbar from './shape.svelte';
	import PathShapeToolbar from './path-shape.svelte';
	import TextToolbar from './text.svelte';
	import ImageToolbar from './image.svelte';
	import Button from '../ui/button/button.svelte';
	import Separator from '../ui/separator/separator.svelte';
	import { sidepanelStore } from '../sidepanel/state.svelte';
	import clsx from 'clsx';
	import { Trash } from 'phosphor-svelte';
	import { selectedElementsStore } from '$lib/store/elements/selected-elements.svelte';

	let chosen = $state('');

	function onPositionClick() {
		sidepanelStore.state = 'position';
	}

	function onFillClick() {
		chosen = 'fill';
		sidepanelStore.state = 'colors';
		sidepanelStore.val = canvasStore.background;
		sidepanelStore.cb = (val: string) => {
			canvasStore.background = val;
		};
	}

	function onDeleteClick() {
		if (selectedElementsStore.elements.length > 0) {
			selectedElementsStore.clear();
		} else {
			elementsStore.clear();
		}
	}
</script>

<div class="flex items-center gap-2 justify-between h-full px-2" id="toolbar">
	{#if activeElementStore.element}
		{#if activeElementStore.element instanceof PathShape}
			<PathShapeToolbar element={activeElementStore.element} />
		{:else if activeElementStore.element instanceof Shape}
			<ShapeToolbar element={activeElementStore.element} />
		{:else if activeElementStore.element instanceof Curve}
			<CurveToolbar element={activeElementStore.element} />
		{:else if activeElementStore.element instanceof TextBox}
			<TextToolbar element={activeElementStore.element} />
		{:else if activeElementStore.element instanceof Image}
			<ImageToolbar />
		{/if}
		<div class="flex-1" />

		<Button
			onclick={onPositionClick}
			class={clsx('px-1', { 'bg-muted': sidepanelStore.state === 'position' })}
			size="sm"
			variant="ghost">Position</Button
		>

		<Separator orientation="vertical" class="h-8" />
		<Popover.Root portal={null}>
			<Popover.Trigger>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><g fill="currentColor" fill-rule="evenodd"
						><path
							d="M3 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
						></path><path
							d="M11 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
							opacity=".45"
						></path><path
							d="M19 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
							opacity=".15"
						></path><path
							d="M7 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
							opacity=".7"
						></path><path
							d="M15 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
							opacity=".3"
						></path></g
					></svg
				>
			</Popover.Trigger>

			<Popover.Content class="w-60">
				<div class="space-y-4 px-2">
					<div class="flex items-center justify-between">
						<label for="border width" class="text-xs font-semibold">Transparency</label>
						<input
							class="w-12 h-6 border rounded p-2 text-xs"
							bind:value={activeElementStore.element.opacity}
						/>
					</div>

					<Slider
						min={0}
						step={0.01}
						max={1}
						onValueChange={(val) => {
						activeElementStore.element!.opacity = val[0];
					}}
						value={[activeElementStore.element.opacity]}
					/>
				</div>
			</Popover.Content>
		</Popover.Root>
	{:else if canvasStore.state === 'selected'}
		<button
			onclick={onFillClick}
			class={clsx('w-6 h-6 rounded border', {
				'border-primary': chosen === 'fill'
			})}
			style="background-color: {canvasStore.background}"
		></button>

		<div class="flex-1" />

		<button onclick={onDeleteClick}>
			<Trash />
		</button>
	{/if}
</div>
