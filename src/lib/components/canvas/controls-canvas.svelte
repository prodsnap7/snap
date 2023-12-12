<script lang="ts">
	import { store, type CanvasElement } from "$lib/store";
	import SelectControls from "../select-controls.svelte";

  const { elements, canvas } = store;

  function onmousedown(element: CanvasElement) {
    store.addSelectedElements([element]);
  }
</script>
<div class="absolute inset-0 flex items-center justify-center">
  <div class="absolute"
    style="
    width: {canvas.width}px;
    height: {canvas.height}px;
  ">
    {#each elements.elements as element}
      <div
        onmousedown={() => onmousedown(element)}
        role="button"
        tabindex="0"
        class="absolute border-2 border-blue-400 cursor-pointer"
        style="
          width: {element.width}px;
          height: {element.height}px;
          transform: rotate({element.rotation}deg);
          left: {element.x}px;
          top: {element.y}px;
        "
      />
    {/each}
    <SelectControls />
  </div>

</div>