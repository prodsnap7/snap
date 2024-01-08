<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { File, Folder } from 'phosphor-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<div class="h-screen">
	<nav class="h-16 mb-10 flex items-center px-4 gap-3 border-b border-primary/20">
		<Logo />
		<div class="flex-1"></div>

		<Button>
			<File size={20} class="mr-2" />
			New Design
		</Button>

		<Button variant="secondary">
			<Folder size={20} class="mr-2" />
			My Designs
		</Button>

		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</nav>

	<section class="container">
		<h2 class="text-lg font-semibold mb-4">Recent Designs</h2>
	</section>
</div>
