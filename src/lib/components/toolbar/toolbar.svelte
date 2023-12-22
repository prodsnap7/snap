<script lang="ts">
	import { activeElementStore } from '$lib/store';
	import * as Popover from '../ui/popover';
	import Slider from '../ui/slider/slider.svelte';
	import CurveToolbar from './curve';
	import Shape from './shape.svelte';
</script>

{#if activeElementStore.element}
	<div class="flex items-center gap-2 justify-between" id="toolbar">
		{#if activeElementStore.element.type === 'shape'}
			<Shape element={activeElementStore.element} />
		{:else if activeElementStore.element.type === 'curve'}
			<CurveToolbar element={activeElementStore.element} />
		{/if}
		<div class="flex-1" />

		<Popover.Root portal="null">
			<Popover.Trigger>
				<button class="transparent-square h-8 w-8 rounded-lg border" />
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
	</div>
{/if}

<style>
	.transparent-square {
		background: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
			linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
		background-position:
			0 0,
			5px 5px;
		background-size: 10px 10px;
		position: relative;
		overflow: hidden;
	}
</style>
