<script lang="ts">
	import type { Shape } from '$lib/store';
	import clsx from 'clsx';
	import { sidepanelStore } from '../sidepanel/state.svelte';
	import { Separator } from '../ui/separator';
	import { CircleDashed } from 'phosphor-svelte';
	import * as Popover from '../ui/popover';
	import Slider from '../ui/slider/slider.svelte';
	import Input from '../ui/input/input.svelte';

	type State = 'fill' | 'stroke' | 'border' | '';
	let chosen = $state<State>('');

	const DASHARRAYS = [
		{ dash: '', style: 'solid' },
		{ dash: '4,4', style: 'dotted' },
		{ dash: '8,4', style: 'dashed' }
	];
	let { element } = $props<{ element: Shape }>();

	function onBorderClick() {
		chosen = 'border';
	}

	function onStrokeStyleClick(dash: string) {
		element.strokeType = dash;
		if (!element.strokeWidth) {
			element.strokeWidth = 1;
		}
	}

	function onFillClick() {
		chosen = 'fill';
		sidepanelStore.state = 'colors';
		sidepanelStore.val = element.fill;
		sidepanelStore.cb = (val: string) => {
			element.fill = val;
		};
	}

	$effect(() => {
		if (chosen === 'fill') {
			sidepanelStore.val = element.fill;
		} else if (chosen === 'stroke') {
			sidepanelStore.val = element.stroke;
		}
	});

	function onStrokeClick() {
		chosen = 'stroke';
		sidepanelStore.state = 'colors';
		sidepanelStore.val = element.stroke as string;
		sidepanelStore.cb = (val: string) => {
			element.stroke = val;
		};
	}
</script>

<button
	onclick={onFillClick}
	class={clsx('w-6 h-6 rounded border', {
		'border-primary': chosen === 'fill'
	})}
	style="background-color: {element.fill}"
></button>
<button
	onclick={onStrokeClick}
	class={clsx('w-6 h-6 rounded flex items-center justify-center border', {
		'border-primary': chosen === 'stroke'
	})}
>
	<span style="color: {element.stroke}" class="w-6 h-6 rounded ring-4 ring-inset ring-current" />
</button>

<Separator class="h-6" orientation="vertical" />

<Popover.Root portal={null}>
	<Popover.Trigger>
		<button
			onclick={onBorderClick}
			class={clsx('flex rounded-full border items-center justify-center', {
				'border-primary': chosen === 'border'
			})}
		>
			<CircleDashed size={28} />
		</button>
	</Popover.Trigger>
	<Popover.Content class="w-80 space-y-4">
		<div class="flex items-center gap-3">
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
			{#each DASHARRAYS as { dash, style }}
				<button
					onclick={() => onStrokeStyleClick(style)}
					class={clsx('rounded border w-12 h-8 flex items-center justify-center', {
						'border-primary': element.strokeType === style && element.strokeWidth
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

		<div class="space-y-4 px-2">
			<div class="flex items-center justify-between">
				<label for="border width" class="text-xs font-semibold">Border Radius</label>
				<Input class="w-12 h-6 border rounded p-2 text-xs" bind:value={element.radius} />
			</div>

			<Slider
				onValueChange={(val) => {
					element.radius = val[0];
				}}
				value={[element.radius]}
			/>
		</div>
	</Popover.Content>
</Popover.Root>
