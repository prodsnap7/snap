<script lang="ts">
	import Loader from '$lib/components/ui/loader.svelte';
	import { CaretDown, CaretRight } from 'phosphor-svelte';
	import { mode } from 'mode-watcher';
	import clsx from 'clsx';

	type Props = {
		font: any;
		loading: boolean;
		onFontClick: (font: any, style?: string) => Promise<void>;
	};

	const { font, loading, onFontClick } = $props<Props>();

	let currentFontLoading = $state(false);
	let opened = $state(false);

	const handleFontClick = async (font: any, style?: string) => {
		currentFontLoading = true;
		await onFontClick(font, style);
		currentFontLoading = false;
	};
</script>

<div class="">
	<span
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
		{#if currentFontLoading}
			<Loader />
		{/if}
	</span>
</div>
