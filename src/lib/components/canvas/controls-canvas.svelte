<script lang="ts">
	import { store, type CanvasElement } from "$lib/store";
	import SelectControls from "../select-controls.svelte";

  const { elements, canvas, selectedElements } = store;

  function onmousedown(event: MouseEvent, element: CanvasElement) {
    console.log("onmousedown", event, element);
    // if shift is pressed then add to selected elements
    if (event.shiftKey) {
      selectedElements.addElements([element]);
    } else {
      selectedElements.setElements([element]);
    }
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
        onmousedown={(e) => onmousedown(e,element)}
        role="button"
        tabindex="0"
        class="absolute cursor-pointer"
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