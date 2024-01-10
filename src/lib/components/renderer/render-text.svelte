<script lang="ts">
	import type { TextBox } from '$lib/store';

	type Props = {
		text: TextBox;
		scale?: number;
		hide?: boolean;
	};

	const { text, hide = false, scale = 1 } = $props<Props>();
	let textRef = $state<HTMLDivElement>();

	$effect(() => {
		text.lineHeight;
		text.fontSize;
		text.content;
		text.fontStyle;
		text.fontWeight;
		text.fontUrl;
		text.fontFamily;
		text.letterSpacing;
		text.uppercase;
		text.width;

		console.log(
			'text font updated: ',
			text.fontFamily,
			text.fontStyle,
			text.fontWeight,
			Boolean(textRef)
		);

		text.height = textRef?.clientHeight || text.height;
	});
</script>

{#if !hide}
	<div
		bind:this={textRef}
		class="text-renderer overflow-hidden whitespace-pre-wrap cursor-pointer outline-none user-select-none"
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
