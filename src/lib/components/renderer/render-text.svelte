<script lang="ts">
	import type { TextBox } from '$lib/store';

	type Props = {
		text: TextBox;
		scale?: number;
	};

	const { text, scale = 1 } = $props<Props>();
</script>

<div
	class="text-renderer overflow-hidden whitespace-pre-wrap cursor-pointer outline-none user-select-none"
	style="
    font-size: {text.fontSize}px;
    font-family: {text.fontFamily};
    font-weight: {text.fontWeight};
    font-style: {text.fontStyle};
    color: {text.color};
    text-decoration: {text.decoration};
    text-align: {text.align};
    width: {text.width}px;
    letter-spacing: {text.letterSpacing}px;
    line-height: {text.lineHeight * text.fontSize}px;
  "
>
	{text.content}
</div>
