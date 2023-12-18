<script lang="ts">
	import { Group, store } from '$lib/store';
	import { Copy, Trash } from 'phosphor-svelte';

	const selected = $derived(store.selectedElements.elements);

	function deleteSelected() {
		store.deleteSelected();
	}

	function groupSelected() {
		store.groupSelected();
	}

	function unGroupSelected(element: Group) {
		const ungrouped = element.ungroup();
		store.elements.removeElement(element);
		store.selectedElements.clear();
		store.elements.addElements(ungrouped);
		store.selectedElements.addElements(ungrouped);
	}
</script>

<div
	style="
      left: {store.selectedElements.x}px;
      top: {store.selectedElements.y}px;
      width: {store.selectedElements.width}px;
      height: {store.selectedElements.height}px;
    "
	class="absolute"
>
	<div
		style="
        left: 50%;
        top: -40px;
        transform: translateX(-50%);
      "
		class="absolute origin-center"
	>
		<div
			class="p-1.5 px-2 gap-2 shadow-sm rounded flex items-center bg-white border border-gray-400"
		>
			{#if selected.length > 1}
				<button onclick={groupSelected} class="text-xs select-none"> Group </button>
			{:else if selected.length === 1 && selected[0].type === 'group'}
				<button onclick={() => unGroupSelected(selected[0] as Group)} class="text-xs select-none">
					Ungroup
				</button>
			{/if}
			<button>
				<Copy />
			</button>
			<button onclick={deleteSelected}>
				<Trash />
			</button>
		</div>
	</div>
</div>
