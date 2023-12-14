<script lang="ts">
  import type { CanvasElement } from "$lib/store/elements/element.svelte";
	import RenderCurve from "./render-curve.svelte";
	import RenderShape from "./render-shape.svelte";

  type Props = {
    element: CanvasElement;
    scale?: number;
  };

  let { element, scale } = $props<Props>();
  scale = scale ?? 1;
</script>

{#if element.type === "shape"}
<div 
  class="absolute top-0 left-0"
  style="transform: translate({element.x}px, {element.y}px) rotate({element.rotation}deg)">
<RenderShape {scale} shape={element} />
</div>
{:else if element.type === "curve"}
<div 
  class="absolute origin-center top-0 left-0"
  >
<RenderCurve {scale} curve={element} />
</div>
{/if}