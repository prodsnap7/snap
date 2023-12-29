<script lang="ts">
	import { sidepanelStore } from '$lib/components/sidepanel/state.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover';
	import type { Curve, MarkerType } from '$lib/store';
	import clsx from 'clsx';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { BezierCurve, CircleDashed, LineSegment } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import StartMarkers from './start-markers.svelte';
	import EndMarkers from './end-markers.svelte';

	type Props = {
		element: Curve;
	};

	const DASHARRAYS = [
		{ dash: '', style: 'solid' },
		{ dash: '4,4', style: 'dotted' },
		{ dash: '8,4', style: 'dashed' }
	];

	const TYPES = ['none', 'outline-arrow', 'outline-circle', 'fill-arrow', 'fill-circle'];

	let { element } = $props<Props>();
	let chosen = $state('');
	function onStrokeClick() {
		chosen = 'stroke';
		sidepanelStore.state = 'colors';
		sidepanelStore.val = element.stroke as string;
		sidepanelStore.cb = (val: string) => {
			element.stroke = val;
		};
	}

	$effect(() => {
		if (chosen === 'stroke') {
			sidepanelStore.val = element.stroke;
		}
	});

	function onBorderClick() {
		chosen = 'border';
	}

	function onStrokeStyleClick(dash: string) {
		element.strokeDasharray = dash;
		if (!element.strokeWidth) {
			element.strokeWidth = 1;
		}
	}
</script>

<button
	onclick={onStrokeClick}
	class={clsx('w-6 h-6 rounded flex items-center justify-center border', {
		'border-primary': chosen === 'stroke'
	})}
>
	<span style="color: {element.stroke}" class="w-6 h-6 rounded ring-4 ring-inset ring-current" />
</button>

<Separator class="h-6" orientation="vertical" />

<Popover.Root portal="null">
	<Popover.Trigger>
		<button
			onclick={onBorderClick}
			class={clsx('flex border rounded-full items-center justify-center', {
				'border-primary': chosen === 'border'
			})}
		>
			<CircleDashed size={28} />
		</button>
	</Popover.Trigger>
	<Popover.Content class="space-y-4">
		<div class="flex flex-nowrap items-center gap-3">
			<button
				onclick={() => {
					element.strokeWidth = 0;
				}}
				class={clsx('rounded border w-12 h-8 flex items-center justify-center', {
					'border-primary': element.strokeWidth === 0
				})}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-ban"
					><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg
				>
			</button>
			{#each DASHARRAYS as { dash }}
				<button
					onclick={() => onStrokeStyleClick(dash)}
					class={clsx('rounded border w-12 h-8 flex items-center justify-center', {
						'border-primary': element.strokeDasharray === dash && element.strokeWidth
					})}
				>
					<svg width={30} height={2}>
						<line
							x1="0"
							y1="0"
							x2="30"
							y2="0"
							stroke-dasharray={dash}
							stroke="currentColor"
							stroke-width="2"
						/>
					</svg>
				</button>
			{/each}
		</div>

		<div class="space-y-4 px-2">
			<div class="flex items-center justify-between">
				<label for="border width" class="text-xs font-semibold">Border Width</label>
				<Input class="w-12 h-6 border rounded p-2 text-xs" bind:value={element.strokeWidth} />
			</div>

			<Slider
				onValueChange={(val) => {
					element.strokeWidth = val[0];
				}}
				value={[element.strokeWidth]}
			/>
		</div>
	</Popover.Content>
</Popover.Root>

<Separator class="h-6" orientation="vertical" />

<Popover.Root portal="null">
	<Popover.Trigger>
		<Button
			onclick={() => {
				chosen = 'marker';
			}}
			class={clsx('p-0 border', {
				'border-primary': chosen === 'marker'
			})}
			variant="ghost"
		>
			<StartMarkers type={element.startMarker} />
			<EndMarkers type={element.endMarker} />
		</Button>
	</Popover.Trigger>
	<Popover.Content>
		<label class="text-sm font-semibold" for="markers">Start</label>
		<div class="space-x-1">
			{#each TYPES as type}
				<Button
					variant="ghost"
					class={clsx('px-2 py-1.5 border', {
						'border-primary': element.startMarker === type
					})}
					onclick={() => {
          element.startMarker = type as MarkerType;
        }}
				>
					<StartMarkers {type} />
				</Button>
			{/each}
		</div>

		<label class="font-semibold text-sm" for="markers">End</label>
		<div class="space-x-1">
			{#each TYPES as type}
				<Button
					class={clsx('px-2 py-1.5 border', {
						'border-primary': element.endMarker === type
					})}
					variant="ghost"
					onclick={() => {
          element.endMarker = type as MarkerType;
        }}
				>
					<EndMarkers {type} />
				</Button>
			{/each}
		</div>

		<div class="space-y-4 px-2">
			<div class="flex items-center justify-between">
				<label for="border width" class="text-xs font-semibold">Size</label>
				<Input class="w-12 h-6 border rounded p-2 text-xs" bind:value={element.markerSize} />
			</div>

			<Slider
				onValueChange={(val) => {
					element.markerSize = val[0];
				}}
				value={[element.markerSize]}
			/>
		</div>
	</Popover.Content>
</Popover.Root>

<Separator class="h-6" orientation="vertical" />

{#if element.pathType === 'quadratic'}
	<Button
		onclick={() => {
			element.pathType = 'linear';
		}}
		variant="ghost"
		class="p-1"
	>
		<LineSegment size={20} />
	</Button>
{:else if element.pathType === 'linear'}
	<Button
		onclick={() => {
			element.pathType = 'quadratic';
		}}
		variant="ghost"
		class="p-1"
	>
		<BezierCurve size={20} />
	</Button>
{/if}
