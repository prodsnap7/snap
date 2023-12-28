<script lang="ts">
	import type { TextBox } from '$lib/store';

	type Props = {
		text: TextBox;
		scale?: number;
		hide?: boolean;
	};

	const { text, hide = false, scale = 1 } = $props<Props>();

	$inspect(text.scale);
</script>

{#if !hide}
	<div
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
		height: {text.height}px;
    letter-spacing: {text.letterSpacing}px;
    line-height: {text.lineHeight * text.fontSize * text.scale}px;
		text-transform: {text.uppercase ? 'uppercase' : 'none'};
		"
	>
		{text.content}
	</div>
{/if}
