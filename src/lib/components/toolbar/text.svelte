<script lang="ts">
	import type { TextBox } from '$lib/store';
	import { TextAa } from 'phosphor-svelte';

	type Props = {
		element: TextBox;
	};

	let { element } = $props<Props>();

	function onColorClick() {}
</script>

<button onclick={onColorClick} class="flex flex-col items-center">
	<TextAa color={element.color} />
	<div class="w-6 h-2 rounded-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500" />
</button>
