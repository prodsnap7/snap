<script lang="ts">
	import { Group, TextBox, store } from '$lib/store';
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

	function onEditClick() {
		if (
			store.selectedElements.elements.length === 1 &&
			store.selectedElements.elements[0] instanceof TextBox
		) {
			store.selectedElements.elements[0].state = 'editing';
		}
	}
</script>

<div
	style="
      left: {store.selectedElements.bounds.x}px;
      top: {store.selectedElements.bounds.y}px;
      width: {store.selectedElements.bounds.width}px;
      height: {store.selectedElements.bounds.height}px;
			transform: rotate({store.selectedElements.rotation}deg);
    "
	class="absolute pointer-events-none"
>
	<div
		style="
        left: 50%;
        top: -40px;
        transform: translateX(-50%);
      "
		class="absolute origin-center shadow-xl pointer-events-auto"
	>
		<div
			class="p-1.5 px-2 gap-2 shadow-sm rounded flex items-center bg-secondary border border-gray-400"
		>
			{#if selected.length > 1}
				<button onclick={groupSelected} class="text-xs select-none"> Group </button>
			{:else if selected.length === 1 && selected[0].type === 'group'}
				<button onclick={() => unGroupSelected(selected[0] as Group)} class="text-xs select-none">
					Ungroup
				</button>
			{:else if selected.length === 1 && selected[0].type === 'text'}
				<button onclick={onEditClick} class="text-xs select-none"> Edit </button>
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
