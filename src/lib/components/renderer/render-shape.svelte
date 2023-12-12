<script lang="ts">
	import type { IShape } from "$lib/store/elements/shape.svelte";

  type Props = {
    shape: IShape;
    scale?: number;
  }
  const { shape, scale = 1 } = $props<Props>();
</script>

<div
  style="
    width: {shape.width * scale}px;
    height: {shape.height * scale}px;
    background-color: {shape.fill};
    border-radius: {shape.radius}px;
    border: {shape.strokeWidth}px {shape.strokeType} {shape.stroke};
    opacity: {shape.opacity};
    transform: rotate({shape.rotation}deg);
  "
/>