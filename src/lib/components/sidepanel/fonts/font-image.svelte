<script lang="ts">
	import Loader from '$lib/components/ui/loader.svelte';
	import { CaretDown, CaretRight, Check } from 'phosphor-svelte';
	import { mode } from 'mode-watcher';
	import clsx from 'clsx';
	import type { TextBox } from '$lib/store';
	import * as Collapsible from '$lib/components/ui/collapsible';

	type Props = {
		font: any;
		text: TextBox;
		onFontClick: (font: any, style?: string) => Promise<void>;
	};

	const { font, text, onFontClick } = $props<Props>();

	let currentFontLoading = $state(false);
	let opened = $state(false);

	const handleFontClick = async (font: any, style?: string) => {
		currentFontLoading = true;
		await onFontClick(font, style);
		currentFontLoading = false;
	};
</script>

<Collapsible.Root>
	<Collapsible.Trigger class="w-full">
		<button
			onclick={() => handleFontClick(font.variants[0])}
			class="cursor-pointer pt-1.5 hover:bg-muted flex w-full justify-between rounded overflow-hidden items-center"
		>
			{#if font.variants.length > 1}
				<button onclick={() => (opened = !opened)}>
					{#if !opened}
						<CaretRight size={18} />
					{:else}
						<CaretDown size={18} />
					{/if}
				</button>
			{:else}
				<span class="w-6 h-6 shrink-0 opacity-0"></span>
			{/if}
			<div class="flex-1">
				<img
					class={clsx('w-auto h-6', {
						invert: $mode === 'dark',
						'invert-0': $mode === 'light'
					})}
					src={font.variants[0].imageUrl}
					alt={font.fontFamily}
				/>
			</div>
			{#if text.fontFamily === font.fontFamily && text.fontWeight === '400' && text.fontStyle === 'normal'}
				<Check size={18} />
			{/if}
			{#if currentFontLoading}
				<Loader />
			{/if}
		</button>
	</Collapsible.Trigger>

	{#if font.variants.length > 1}
		<Collapsible.Content class="bg-muted">
			{#each font.variants as variant}
				<button
					onclick={() => handleFontClick(variant)}
					class="cursor-pointer pl-6 pt-1.5 hover:bg-muted flex w-full justify-between rounded overflow-hidden items-center"
				>
					<div class="flex-1">
						<img
							class={clsx('w-auto h-6', {
								invert: $mode === 'dark',
								'invert-0': $mode === 'light'
							})}
							src={variant.imageUrl}
							alt={font.fontFamily}
						/>
					</div>
					{#if text.fontFamily === font.fontFamily && +text.fontWeight === variant.weight && text.fontStyle === variant.style}
						<Check size={18} />
					{/if}
					{#if currentFontLoading}
						<Loader />
					{/if}
				</button>
			{/each}
		</Collapsible.Content>
	{/if}
</Collapsible.Root>
