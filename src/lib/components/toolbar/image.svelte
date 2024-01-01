<script lang="ts">
	import { canvasStore } from '$lib/store';
	import Button from '../ui/button/button.svelte';

	function onCropClick() {
		if (canvasStore.state === 'cropping') {
			canvasStore.state = 'normal';
			return;
		}
		canvasStore.state = 'cropping';
	}
</script>

<Button variant="outline" onclick={onCropClick}>Crop</Button>
