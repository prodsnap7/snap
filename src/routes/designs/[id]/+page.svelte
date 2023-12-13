<script>
  import { page } from "$app/stores";
	import Canvas from "$lib/components/canvas/canvas.svelte";
  import ControlsCanvas from "$lib/components/canvas/controls-canvas.svelte";
  import { Sidepanel } from "$lib/components/sidepanel";
	import { store } from "$lib/store";
	import { onMount } from "svelte";

  onMount(async () => {
    const res = await fetch(`/api/designs/${$page.params.id}`)
    const data = await res.json();

    store.init(data)
  })

</script>

<div class="w-screen h-screen flex flex-col">
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
    <div class="container flex h-14 items-center">
      <div class="mr-4 hidden md:flex">
        <input value={store.name} class="text-xs justify-self-end bg-transparent p-2 rounded outline-none border" />
      </div>
    </div>
  </header>

  <main class="flex flex-1">
    <div class="min-w-[400px] w-[400px] border-r">
      <Sidepanel />
    </div>

    <!-- Main content section -->
    <section class="flex flex-col w-full bg-gray-100">
      <div class="h-14 w-full"></div>

      <div class="flex-1 flex items-center justify-center relative">
        <Canvas />
        <ControlsCanvas />
      </div>
    </section>
  </main>
</div>