<script lang="ts">
	import type { SvgElement } from '$lib/store';

	type Props = {
		element: SvgElement;
	};

	const { element } = $props<Props>();

	console.log(element.colors);
</script>

<div
	class="origin-center"
	style="
    width: {element.width}px;
    height: {element.height}px;
  "
>
	{@html element.data}
</div>
