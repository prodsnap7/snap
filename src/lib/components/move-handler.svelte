<script lang="ts">
  type Props = {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    onMove: (bounds: { x: number; y: number; width: number; height: number }) => void;
    onResize: (bounds: { x: number; y: number; width: number; height: number }) => void;
    onRotate: (rotation: number) => void;
  }

  type State = "idle" | "moving" | "rotating" | "resizing-br" | "resizing-bl" | "resizing-tr" | "resizing-tl" | "resizing-tm" | "resizing-bm" | "resizing-lm" | "resizing-rm";

  let frameid: number | null = null;
  let state = $state<State>("idle");
  let { x, y, width, height, rotation, onMove, onResize, onRotate } = $props<Props>();

  function onmousedown(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains("move")) {
        state = "moving";
      } else if (event.target.classList.contains("resize-br")) {
        state = "resizing-br";
      } else if (event.target.classList.contains("resize-bl")) {
        state = "resizing-bl";
      } else if (event.target.classList.contains("resize-tr")) {
        state = "resizing-tr";
      } else if (event.target.classList.contains("resize-tl")) {
        state = "resizing-tl";
      } else if (event.target.classList.contains("rotate")) {
        state = "rotating";
      }
    }
  }

  $effect(() => {
    function onmouseup(event: MouseEvent) {
      state = "idle";
    }

    function onmousemove(event: MouseEvent) {
      if (frameid) {
        cancelAnimationFrame(frameid);
      }
      frameid = requestAnimationFrame(() => moveHandler(event));
    }
    function moveHandler(event: MouseEvent) {
      const ratio = width / height;
      const movementX = event.movementX;
      const movementY = event.movementY;
      if (state === "moving") {
        onMove({
          x: event.movementX,
          y: event.movementY,
          width: 0,
          height: 0
        });
      } else if (state === "rotating") {
        // onRotate(rotation + event.movementX);
      } else if (state === "resizing-br") {
          const delta = movementX;
          onResize({ x: 0, y: 0, width: delta, height: delta });
      } else if (state === "resizing-tl") {
          const delta = movementX;
          onResize({ x: delta, y: delta, width: -delta, height: -delta });
      } else if (state === "resizing-bl") {
          const deltaX = movementX;
          const deltaY = movementY;
          onResize({ x: deltaX, y: 0, width: -deltaX, height: deltaY });
      } else if (state === "resizing-tr") {
          const deltaX = movementX;
          const deltaY = movementY;
          onResize({ x: 0, y: deltaY, width: deltaX, height: -deltaY });
      } else if (state === "resizing-tm") {
          const delta = movementY;
          onResize({ x: 0, y: delta, width: 0, height: -delta });
      } else if (state === "resizing-bm") {
          const delta = movementY;
          onResize({ x: 0, y: 0, width: 0, height: delta });
      } else if (state === "resizing-lm") {
          const delta = movementX;
          onResize({ x: delta, y: 0, width: -delta, height: 0 });
      } else if (state === "resizing-rm") {
          const delta = movementX;
          onResize({ x: 0, y: 0, width: delta, height: 0 });
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
  on:mousedown={onmousedown}
  tabindex="0"
  role="button"
  class="absolute border-2 border-slate-900 move"
  style="left: {x}px; top: {y}px; width: {width}px; height: {height}px; transform: rotate({rotation}deg);"
  >
  <div role="button" tabindex="0" on:mousedown={onmousedown} class="absolute top-left corner-control resize-tl" />
  <div role="button" tabindex="0" on:mousedown={onmousedown} class="absolute top-right corner-control resize-tr" />
  <div role="button" tabindex="0" on:mousedown={onmousedown} class="absolute bottom-left corner-control resize-bl" />
  <div role="button" tabindex="0" on:mousedown={onmousedown} class="absolute bottom-right corner-control resize-br" />
</div>


<style lang="postcss">
  .corner-control {
    @apply h-4 w-4 bg-white border border-slate-400 rounded-full;

  }
  .top-left {
    @apply top-0 left-0 -translate-x-1/2 -translate-y-1/2;
  }

  .top-right {
    @apply top-0 right-0 translate-x-1/2 -translate-y-1/2;
  }

  .bottom-left {
    @apply bottom-0 left-0 -translate-x-1/2 translate-y-1/2;
  }

  .bottom-right {
    @apply bottom-0 right-0 translate-x-1/2 translate-y-1/2;
  }
   
</style>