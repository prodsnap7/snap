<script lang="ts">
  import type { CanvasElement } from "$lib/store/elements/element.svelte";
	import RenderShape from "./render-shape.svelte";

  type Props = {
    element: CanvasElement;
    scale?: number;
  };

  let { element, scale } = $props<Props>();
  scale = scale ?? 1;
</script>

<div 
  class="absolute top-0 left-0"
  style="transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg)">
{#if element.type === "shape"}
<RenderShape {scale} shape={element} />
{/if}
</div>