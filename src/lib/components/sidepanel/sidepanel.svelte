<script>
  import { Shapes } from 'lucide-svelte';
  import { page } from '$app/stores';
  import clsx from 'clsx';
	import ElementsPanel from './elements-panel.svelte';
</script>

<div class="flex w-full h-full">
  <nav class="min-w-[80px] border-r flex items-center flex-col gap-4 py-6">
    <button class="rounded flex flex-col items-center gap-1 hover:bg-secondary/95">
      <span class={clsx("px-2 py-1.5 rounded",{ "bg-secondary/95": $page.data.url.sidepanel === "elements" })}>
        <Shapes />
      </span>
      <span class="text-xs">Elements</span>
    </button>
  </nav>

  <div class="p-4">
    {#if $page.data.url.sidepanel === "elements"}
      <ElementsPanel />
    {/if}
  </div>
</div>