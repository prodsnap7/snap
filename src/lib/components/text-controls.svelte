<script lang="ts">
	import type { TextBox } from '$lib/store';
	import type { FormEventHandler } from 'svelte/elements';

	type Props = {
		element: TextBox;
	};

	const { element } = $props<Props>();
	let isEditing = $derived(element.state === 'editing');
</script>

{#if isEditing}
	<div
		id="text-controls"
		class="absolute top-0 left-0 origin-center"
		style="transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg);"
	>
		<input
			class="text-renderer overflow-hidden whitespace-pre-wrap cursor-pointer outline-none user-select-none"
			style="
        font-size: {element.fontSize}px;
        font-family: {element.fontFamily};
        font-weight: {element.fontWeight};
        font-style: {element.fontStyle};
        color: blue;
        text-decoration: {element.decoration};
        text-align: {element.align};
        width: {element.width}px;
        letter-spacing: {element.letterSpacing}px;
        line-height: {element.lineHeight * element.fontSize}px;
      "
			bind:value={element.content}
		/>
	</div>
{/if}
