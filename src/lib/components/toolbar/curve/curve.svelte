<script lang="ts">
	import { sidepanelStore } from '$lib/components/sidepanel/state.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import type { Curve } from '$lib/store';
	import clsx from 'clsx';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { CircleDashed } from 'phosphor-svelte';

	type Props = {
		element: Curve;
	};

	const DASHARRAYS = [
		{ dash: '', style: 'solid' },
		{ dash: '4,4', style: 'dotted' },
		{ dash: '8,4', style: 'dashed' }
	];

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
		'ring-2 ring-offset-2 ring-offset-gray-100 ring-slate-700': chosen === 'stroke'
	})}
>
	<span style="color: {element.stroke}" class="w-6 h-6 rounded ring-4 ring-inset ring-current" />
</button>

<Separator class="h-6" orientation="vertical" />

<Popover.Root portal="null">
	<Popover.Trigger>
		<button
			onclick={onBorderClick}
			class={clsx('flex rounded-full items-center justify-center', {
				'ring-4 ring-slate-200': chosen === 'border'
			})}
		>
			<CircleDashed size={28} />
		</button>
	</Popover.Trigger>
	<Popover.Content class="w-80 space-y-4">
		<div class="flex items-center gap-3">
			<button
				onclick={() => {
					console.log('onStrokeStyleClick', 'none');
					element.strokeWidth = 0;
				}}
				class={clsx('rounded border w-12 h-8 flex items-center justify-center', {
					'ring-2 ring-offset-2 ring-offset-gray-100 ring-slate-700': element.strokeWidth === 0
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
						'ring-2 ring-offset-2 ring-offset-gray-100 ring-slate-700':
							element.strokeDasharray === dash && element.strokeWidth
					})}
				>
					<svg width={30} height={2}>
						<line
							x1="0"
							y1="0"
							x2="30"
							y2="0"
							stroke-dasharray={dash}
							stroke="black"
							stroke-width="2"
						/>
					</svg>
				</button>
			{/each}
		</div>

		<div class="space-y-4 px-2">
			<div class="flex items-center justify-between">
				<label for="border width" class="text-xs font-semibold">Border Width</label>
				<input class="w-12 h-6 border rounded p-2 text-xs" bind:value={element.strokeWidth} />
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
