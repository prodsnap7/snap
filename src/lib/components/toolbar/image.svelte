<script lang="ts">
	import { canvasStore } from '$lib/store';
	import { Crop } from 'phosphor-svelte';
	import Button from '../ui/button/button.svelte';
	import clsx from 'clsx';

	function onCropClick() {
		if (canvasStore.state === 'cropping') {
			canvasStore.state = 'normal';
			return;
		}
		canvasStore.state = 'cropping';
	}
</script>

<Button
	class={clsx('p-1 cursor-pointer border border-transparent', {
		'border-primary': canvasStore.state === 'cropping'
	})}
	variant={canvasStore.state === 'cropping' ? 'secondary' : 'ghost'}
	onclick={onCropClick}
>
	<Crop size={24} />
</Button>
