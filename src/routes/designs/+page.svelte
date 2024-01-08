<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Label from '$lib/components/ui/label/label.svelte';
	import Logo from '$lib/components/logo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, File, Folder, Spinner, X } from 'phosphor-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { createNewDesign } from '$lib/api/designs';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/ui/loader.svelte';

	let width = $state(2000);
	let height = $state(2000);

	const createDesignMutation = createMutation({
		mutationFn: createNewDesign,
		onSuccess: (id) => {
			goto(`/designs/${id}`);
		}
	});

	const handleCreateDesign = async () => {
		$createDesignMutation.mutate({
			width: width,
			height: height
		});
	};
</script>

<div class="h-screen">
	<nav class="h-16 mb-10 flex items-center px-4 gap-3 border-b border-primary/20">
		<Logo />
		<div class="flex-1"></div>

		<Popover.Root portal={null}>
			<Popover.Trigger>
				<Button>
					<File size={20} class="mr-2" />
					New Design
				</Button>
			</Popover.Trigger>

			<Popover.Content>
				<div class="mb-4 text-sm font-semibold">Custom Size</div>
				<div class="flex text-xs items-center gap-2">
					<div
						class="w-20 h-8 flex rounded-sm border items-center p-1 gap-1 focus-within:border-primary"
					>
						<span class="text-sm text-muted-foreground">W</span>
						<input
							type="number"
							bind:value={width}
							class="w-full h-full ml-2 oultine-none text-xs focus:outline-none bg-background"
						/>
					</div>
					<div
						class="w-20 h-8 flex rounded-sm border items-center p-1 gap-1 focus-within:border-primary"
					>
						<span class="text-sm text-muted-foreground">H</span>
						<input
							type="number"
							bind:value={height}
							class="w-full h-full ml-2 oultine-none text-xs focus:outline-none bg-background"
						/>
					</div>

					<div class="p-1.5 h-8 border pointer-events-none text-center">px</div>
					<Button onclick={handleCreateDesign} size="sm">
						{#if $createDesignMutation.isPending}
							<Loader />
						{:else}
							<Check size={20} />
						{/if}
					</Button>
				</div>

				<Separator class="my-4" />

				<div class="mb-4 text-sm font-semibold">Presets</div>

				<div class="space-y-4">
					<div class="flex items-center space-x-2">
						<Checkbox
							id="2000x2000"
							checked={width === 2000 && height === 2000}
							onCheckedChange={(val) => {
								if (!val) return;
								width = 2000;
								height = 2000;
							}}
						/>
						<Label
							for="terms"
							class="text-sm inline-flex font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							2000 <X size={16} class="mx-1" /> 2000 px
						</Label>
					</div>

					<div class="flex items-center space-x-2">
						<Checkbox
							id="1500x1500"
							checked={width === 1500 && height === 1500}
							onCheckedChange={(val) => {
								if (!val) return;
								width = 1500;
								height = 1500;
							}}
						/>
						<Label
							for="terms"
							class="text-sm inline-flex font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							1500 <X size={16} class="mx-1" /> 1500 px
						</Label>
					</div>

					<div class="flex items-center space-x-2">
						<Checkbox
							id="2000x1500"
							checked={width === 2000 && height === 1500}
							onCheckedChange={(val) => {
								if (!val) return;
								width = 2000;
								height = 1500;
							}}
						/>
						<Label
							for="terms"
							class="text-sm flex font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							2000 <X size={16} class="mx-1" /> 1000 px
						</Label>
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>

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
