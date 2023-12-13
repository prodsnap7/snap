<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import clsx from 'clsx';
	import ElementsPanel from './elements-panel.svelte';

  function onclick(val: string) {
    $page.url.searchParams.set("sidepanel", val);
    sidepanelState = val;
  } 

  let sidepanelState = $page.url.searchParams.get("sidepanel") || "elements";

</script>

<div class="flex w-full h-full">
  <nav class="min-w-[80px] border-r flex items-center flex-col gap-4 py-6">
    <button on:click={() => onclick("elements")} class="rounded p-1 flex flex-col items-center gap-1 hover:bg-secondary/95">
      <span class={clsx("px-2 py-1.5 rounded",{ "bg-primary/20": sidepanelState === "elements" })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shapes"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>
      </span>
      <span class="text-xs">Elements</span>
    </button>
    <button on:click={() => onclick("upload")} class="rounded p-1 flex flex-col items-center gap-1 hover:bg-secondary/95">
      <span class={clsx("px-2 py-1.5 rounded",{ "bg-primary/20": sidepanelState === "upload" })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
      </span>
      <span class="text-xs">Upload</span>
    </button>
  </nav>

  <div class="p-4">
    {#if sidepanelState === "elements"}
      <div transition:fade>
      <ElementsPanel />
      </div>
    {/if}
  </div>
</div>