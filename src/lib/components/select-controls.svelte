<script lang="ts">
  import { store } from "$lib/store";

  let dragging = false;

  function onmousedown(event: MouseEvent) {
    dragging = true;
  }

  $effect(() => {
    function onmouseup(event: MouseEvent) {
      dragging = false;
    }

    function onmousemove(event: MouseEvent) {
      if (dragging) {
        store.selectedElements.x += event.movementX;
        store.selectedElements.y += event.movementY;
      }
    }

    window.addEventListener("mouseup", onmouseup);
    window.addEventListener("mousemove", onmousemove);

    return () => {
      window.removeEventListener("mouseup", onmouseup);
      window.removeEventListener("mousemove", onmousemove);
    };
  })
</script>


<div
  onmousedown={onmousedown}
  tabindex="0"
  role="button"
  class="absolute border-2 border-indigo-600"
  style="
    width: {store.selectedElements.width}px;
    height: {store.selectedElements.height}px;
    left: {store.selectedElements.x}px;
    top: {store.selectedElements.y}px;"
/>