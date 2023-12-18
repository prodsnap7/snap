<script lang="ts">
	import { store } from '$lib/store';
	import { Check, MagnifyingGlass, PlusCircle } from 'phosphor-svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import '@simonwep/pickr/dist/themes/nano.min.css';
	import Color from 'color';
	import Pickr from '@simonwep/pickr';
	import { sidepanelStore } from './state.svelte';

	let pickr = null;
	$effect(() => {
		pickr = Pickr.create({
			el: '#color-picker',
			theme: 'nano',
			default: '#262626',
			useAsButton: true,
			position: 'left-middle',
			components: {
				preview: true,
				opacity: true,
				hue: true,
				interaction: {
					hex: true,
					rgba: true,
					input: true,
					save: true
				}
			}
		});
	});

	let searchVal = $state('');
	let searchResults = $state([]);
	const usedColors = store.elements.colors;
	const colorMutation = createMutation({
		mutationFn: async ({ val }: { val: string }) => {
			const color = Color(val.replace(/\s+/g, '')).rgb().string();
			console.log('val', val);
			const res = await fetch(
				`https://www.thecolorapi.com/scheme?rgb=${color}&mode=analogic&count=12`
			);
			const data = await res.json();
			searchResults = data.colors.map((color: any) => color.hex.value);
		}
	});

	function onkeypress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			console.log('searchVal', searchVal);
			$colorMutation.mutate({ val: searchVal });
		}
	}

	function onColorClick(color: string) {
		if (sidepanelStore.cb) {
			sidepanelStore.cb(color);
			sidepanelStore.val = color;
		}
	}
</script>

<div class="p-2 my-4 rounded-sm flex items-center gap-2 border border-gray-400">
	<MagnifyingGlass color="#262626" size={24} />
	<input
		class="h-6 outline-none"
		bind:value={searchVal}
		{onkeypress}
		placeholder="gray or #262626"
	/>
</div>

<div class="mb-4">
	<h2 class="font-bold text-sm">Used Colors</h2>
</div>

<div class="grid grid-cols-6 gap-2">
	<div
		class="w-9 h-9 rounded flex items-center justify-center bg-gradient-to-t from-cyan-500 via-sky-500 to-indigo-500 hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-100 hover:ring-slate-700"
		id="color-picker"
	>
		<PlusCircle color="#efefef" size={24} />
	</div>
	{#each usedColors as color}
		<button
			onclick={() => onColorClick(color)}
			class="w-9 h-9 rounded border border-gray-300 cursor-pointer flex items-center justify-center hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-100 hover:ring-slate-700"
			style="background-color: {color}"
		>
			<Check size={24} color={color === sidepanelStore.val ? '#efefef' : 'transparent'} />
		</button>
	{/each}
</div>

{#if searchResults.length > 0 && searchVal}
	<div class="my-4">
		<h2 class="font-bold text-sm">Search Results</h2>
	</div>
	<div class="grid grid-cols-6 gap-2">
		{#each searchResults as color}
			<div
				class="w-9 h-9 rounded border border-gray-300 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-100 hover:ring-slate-700"
				style="background-color: {color}"
			></div>
		{/each}
	</div>
{/if}
