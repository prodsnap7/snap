<script lang="ts">
  import { store } from "$lib/store";
	import MoveHandler from "./move-handler.svelte";
</script>

{#if store.selectedElements.elements.length > 0}
  <MoveHandler
    x={store.selectedElements.x}
    y={store.selectedElements.y}
    width={store.selectedElements.width}
    height={store.selectedElements.height}
    rotation={store.selectedElements.rotation}
    onMove={({ x, y }) => {
      store.selectedElements.x = x;
      store.selectedElements.y = y;
    }}
    onResize={({ width, height, x, y }) => {
      store.selectedElements.width = width;
      store.selectedElements.height = height;
      store.selectedElements.x = x;
      store.selectedElements.y = y;
    }}
    onRotate={(rotation) => {
      store.selectedElements.rotation = rotation;
    }}
  />
{/if}