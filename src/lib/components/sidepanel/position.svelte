<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import {
		AlignBottom,
		AlignCenterHorizontal,
		AlignCenterVertical,
		AlignLeft,
		AlignRight,
		AlignTop,
		ArrowFatLineDown,
		ArrowFatLineUp,
		ArrowFatLinesDown,
		ArrowFatLinesUp,
		Lock
	} from 'phosphor-svelte';
	import { Label } from '$lib/components/ui/label';
	import Separator from '../ui/separator/separator.svelte';
	import Button from '../ui/button/button.svelte';
	import { selectedElementsStore } from '$lib/store/elements/selected-elements.svelte';
	import clsx from 'clsx';
</script>

<div id="position-sidepanel">
	<Tabs.Root value="arrange" class="w-full">
		<Tabs.List class="w-full grid grid-cols-2">
			<Tabs.Trigger value="arrange">Arrange</Tabs.Trigger>
			<Tabs.Trigger disabled value="layers">Layers</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="arrange">
			<div class="icon-button-grid">
				<button>
					<ArrowFatLineUp size={18} />
					Forward
				</button>
				<button>
					<ArrowFatLineDown size={18} />
					Backward
				</button>
				<button>
					<ArrowFatLinesUp size={18} />
					Front
				</button>
				<button>
					<ArrowFatLinesDown size={18} />
					Back
				</button>
			</div>

			<Separator class="my-4" />

			<div class="text-xs text-muted-foreground">Align to page</div>

			<div class="icon-button-grid">
				<button>
					<AlignTop size={18} />
					Top
				</button>
				<button>
					<AlignLeft size={18} />
					Left
				</button>
				<button>
					<AlignCenterVertical size={18} />
					Middle
				</button>
				<button>
					<AlignCenterHorizontal size={18} />
					Center
				</button>
				<button>
					<AlignBottom size={18} />
					Bottom
				</button>
				<button>
					<AlignRight size={18} />
					Right
				</button>
			</div>

			<Separator class="my-4" />

			<div class="text-xs text-muted-foreground">Position & Dimension</div>

			<div class="grid grid-cols-3 mt-4 gap-x-2 gap-y-4 input-grid">
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label class="text-xs" for="width">Width</Label>
					<input
						class="number-input"
						type="number"
						id="width"
						placeholder="200px"
						bind:value={selectedElementsStore.width}
					/>
				</div>
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label class="text-xs" for="height">Height</Label>
					<input
						class="number-input"
						type="number"
						id="height"
						placeholder="200px"
						bind:value={selectedElementsStore.height}
					/>
				</div>
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label class="text-xs" for="height">Ratio</Label>
					<Button
						class={clsx({ 'bg-muted': selectedElementsStore.resizeProportionally })}
						onclick={() => {
							selectedElementsStore.resizeProportionally =
								!selectedElementsStore.resizeProportionally;
						}}
						variant="outline"
						size="sm"
					>
						<Lock size={18} />
					</Button>
				</div>
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label class="text-xs" for="x">X</Label>
					<input
						id="x"
						class="number-input"
						type="number"
						placeholder="200px"
						bind:value={selectedElementsStore.x}
					/>
				</div>
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label class="text-xs" for="y">Y</Label>
					<input
						class="number-input"
						type="number"
						id="y"
						placeholder="200px"
						bind:value={selectedElementsStore.y}
					/>
				</div>
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label class="text-xs" for="rotate">Rotate</Label>
					<input
						bind:value={selectedElementsStore.rotation}
						class="number-input"
						type="number"
						id="rotate"
						placeholder="200px"
					/>
				</div>
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>

<style lang="postcss">
	.icon-button-grid {
		@apply my-4 grid grid-cols-2 gap-x-1 gap-y-6;
	}

	.icon-button-grid > button {
		@apply flex items-center gap-2 text-sm;
	}

	.input-grid label {
		@apply ml-1.5;
	}

	.input-grid input {
		@apply w-full rounded-sm border p-2 text-xs;
	}
</style>
