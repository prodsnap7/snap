<script>
	import { Renderer } from "../renderer";
  import { shapes } from "./shapes";

  let scale = 0.6
</script>

<div class="mb-4">
  <h2 class="text-xl font-bold">Shapes</h2>
</div>
<div class="flex flex-wrap items-center gap-3">
  {#each shapes as shape}
    <div style="width: {shape.width * scale}px; height: {shape.height * scale}px;"
    class="relative flex-initial">
      <Renderer element={shape} {scale} />
    </div>
  {/each}
</div>