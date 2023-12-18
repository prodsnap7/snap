<script lang="ts">
	import { page } from '$app/stores';
	import { Shape, store } from '$lib/store';
	import clsx from 'clsx';
	import { sidepanelStore } from '../sidepanel/state.svelte';

	const activeElement = $derived(store.activeElement.element);

	let chosen = $state<'fill' | 'stroke' | ''>('');

	function onFillClick() {
		console.log('onFillClick');
		chosen = 'fill';
		$page.url.searchParams.set('sidepanel', 'colors');
		sidepanelStore.state = 'colors';
		sidepanelStore.val = (activeElement as Shape).fill as string;
		sidepanelStore.cb = (val: string) => {
			(store.activeElement.element as Shape).fill = val;
		};
	}

	$effect(() => {
		if (chosen === 'fill') {
			sidepanelStore.val = (activeElement as Shape).fill as string;
		} else if (chosen === 'stroke') {
			sidepanelStore.val = (activeElement as Shape).stroke as string;
		}
	});

	function onStrokeClick() {
		console.log('onStrokeClick');
		chosen = 'stroke';
		$page.url.searchParams.set('sidepanel', 'colors');
		sidepanelStore.state = 'colors';
		sidepanelStore.val = (activeElement as Shape).stroke as string;
		sidepanelStore.cb = (val: string) => {
			(store.activeElement.element as Shape).stroke = val;
		};
	}
</script>

<div class="flex items-center gap-2 justify-between" id="toolbar">
	{#if activeElement && activeElement.type === 'shape'}
		<button
			onclick={onFillClick}
			class={clsx('w-6 h-6 rounded', {
				'ring-2 ring-offset-2 ring-offset-gray-100 ring-slate-700': chosen === 'fill'
			})}
			style="background-color: {activeElement.fill}"
		></button>
		<button
			onclick={onStrokeClick}
			class={clsx('w-6 h-6 rounded', {
				'ring-2 ring-offset-2 ring-offset-gray-100 ring-slate-700': chosen === 'stroke'
			})}
			style="background-color: {activeElement.stroke}"
		></button>
	{/if}
	<div class="flex-1" />
</div>
