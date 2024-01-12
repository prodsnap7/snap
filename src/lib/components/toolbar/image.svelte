<script lang="ts">
	import { Image, canvasStore, store } from '$lib/store';
	import { Crop } from 'phosphor-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Button from '../ui/button/button.svelte';
	import clsx from 'clsx';
	import Separator from '../ui/separator/separator.svelte';
	import { removeBackgroundFromUrl } from '$lib/api/uploads';

	let selectedImage = $state<Image | null>(null);

	$effect(() => {
		if (store.activeElement.element instanceof Image) {
			selectedImage = store.activeElement.element;
		} else {
			selectedImage = null;
		}
	});

	function onCropClick() {
		if (canvasStore.state === 'cropping') {
			canvasStore.state = 'normal';
			return;
		}
		canvasStore.state = 'cropping';
	}

	function onRemoveBackgroundClick() {
		if (!selectedImage) return;
		selectedImage.loading = true;
		removeBackgroundFromUrl(selectedImage.url)
			.then((res) => {
				selectedImage!.url = res.url;
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				selectedImage!.loading = false;
			});
	}
</script>

{#if selectedImage}
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button
				class={clsx('p-1 cursor-pointer border border-transparent', {
					'border-primary': canvasStore.state === 'cropping'
				})}
				variant={canvasStore.state === 'cropping' ? 'secondary' : 'ghost'}
				onclick={onCropClick}
			>
				<Crop size={24} />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<span class="text-xs">Crop Image</span>
		</Tooltip.Content>
	</Tooltip.Root>

	<Separator class="h-6" orientation="vertical" />
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button
				onclick={onRemoveBackgroundClick}
				class={clsx('p-1 cursor-pointer border border-transparent')}
				variant="ghost"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-image-off"
					><line x1="2" x2="22" y1="2" y2="22" /><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" /><line
						x1="13.5"
						x2="6"
						y1="13.5"
						y2="21"
					/><line x1="18" x2="21" y1="12" y2="15" /><path
						d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"
					/><path d="M21 15V5a2 2 0 0 0-2-2H9" /></svg
				>
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<span class="text-xs">Remove Image Background</span>
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
