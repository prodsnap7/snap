<script lang="ts">
	import { store } from "$lib/store";
	import type { Shape } from "$lib/store/elements/shape.svelte";
	import { Renderer } from "../renderer";
  import { shapes } from "./shapes";

  let scale = 0.6

  function addShape(shape: Shape) {
    store.elements.cloneElement(shape)
  }
</script>

<div class="mb-4">
  <h2 class="text-xl font-bold">Shapes</h2>
</div>
<div class="flex flex-wrap items-center gap-3">
  {#each shapes as shape}
    <div on:click={() => addShape(shape)} tabindex="0" role="button" on:keydown={() => addShape(shape)} style="width: {shape.width * scale}px; height: {shape.height * scale}px;"
    class="relative flex-initial">
      <Renderer element={shape} {scale} />
    </div>
  {/each}
</div>