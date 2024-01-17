<script lang="ts">
	import type { TextBox } from '$lib/store';
	import FontFaceObserver from 'fontfaceobserver';
	import { onMount } from 'svelte';
	import Skeleton from '../ui/skeleton/skeleton.svelte';

	type Props = {
		text: TextBox;
		scale?: number;
	};

	const { text, scale = 1 } = $props<Props>();
	let textRef = $state<HTMLDivElement>();

	$effect(() => {
		text.lineHeight;
		text.fontSize;
		text.content;
		text.fontStyle;
		text.fontWeight;
		text.fontUrl;
		text.fontFamily;
		text.loading;
		text.letterSpacing;
		text.uppercase;
		text.width;

		text.height = textRef?.clientHeight || text.height;
	});

	onMount(async () => {
		text.loading = true;
		const observer = new FontFaceObserver(text.fontFamily, {
			weight: text.fontWeight,
			style: text.fontStyle
		});
		await observer.load();
		text.height = textRef?.clientHeight || text.height;
		text.loading = false;
	});
</script>

{#if text.state === 'editing'}{:else if text.loading}
	<div
		style="height: {text.height}px; width: {text.width}px;"
		class="absolute top-0 left-0 space-y-4"
	>
		{#each new Array(Math.floor(text.height / 16)) as _, i}
			<Skeleton class="h-4 w-full" />
		{/each}
	</div>
{:else}
	<div
		bind:this={textRef}
		class="text-renderer relative overflow-hidden whitespace-pre-wrap cursor-pointer outline-none user-select-none"
		style="
    font-size: {text.fontSize * text.scale}px;
    font-family: {text.fontFamily};
    font-weight: {text.fontWeight};
    font-style: {text.fontStyle};
    color: {text.color};
    text-decoration: {text.decoration};
    text-align: {text.align};
    width: {text.width}px;
		height: auto;
    letter-spacing: {text.letterSpacing}px;
    line-height: {text.lineHeight * text.fontSize * text.scale}px;
		text-transform: {text.uppercase ? 'uppercase' : 'none'};
		"
	>
		{text.content}
	</div>
{/if}
