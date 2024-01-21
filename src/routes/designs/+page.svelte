<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Label from '$lib/components/ui/label/label.svelte';

	import Logo from '$lib/components/logo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, File, Folder, Spinner, X } from 'phosphor-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import { createNewDesign, getDesignsByUser } from '$lib/api/designs';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/ui/loader.svelte';
	import * as Card from '$lib/components/ui/card';

	let width = 2000;
	let height = 2000;

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

	const designsQuery = createQuery({
		queryKey: ['designs'],
		queryFn: getDesignsByUser
	});
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
							2000 <X size={16} class="mx-1" /> 1500 px
						</Label>
					</div>

					<div class="flex items-center space-x-2">
						<Checkbox
							id="2000x1500"
							checked={width === 900 && height === 700}
							onCheckedChange={(val) => {
								if (!val) return;
								width = 900;
								height = 700;
							}}
						/>
						<Label
							for="terms"
							class="text-sm flex font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							900 <X size={16} class="mx-1" /> 700 px
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

		{#if $designsQuery.isLoading}
			<Loader />
		{:else if $designsQuery.isError}
			<div class="text-center text-sm text-muted-foreground">Failed to load designs</div>
		{:else if $designsQuery.data.length === 0}
			<div class="text-center text-sm text-muted-foreground">No designs found</div>
		{:else}
			<div class="grid grid-cols-6 gap-2">
				{#each $designsQuery.data as design}
					<Card.Root
						onclick={() => {
							goto(`/designs/${design.id}`);
						}}
						class="w-full group overflow-hidden hover:border-2 hover:border-primary cursor-pointer"
					>
						<Card.Content class="p-0 overflow-hidden">
							{#if design.thumbnail}
								<img
									class="object-cover rounded h-[150px]"
									src={design.thumbnail}
									alt={design.name}
								/>
							{:else}
								<img
									class="object-cover rounded"
									src="https://picsum.photos/250/150"
									alt={design.name}
								/>
							{/if}
						</Card.Content>
						<Card.Header class="p-2 group-hover:text-primary">
							<Card.Title>{design.name}</Card.Title>
							<Card.Description>
								{design.canvas.width} x {design.canvas.height}
							</Card.Description>
						</Card.Header>
					</Card.Root>
				{/each}
			</div>
		{/if}
	</section>
</div>
