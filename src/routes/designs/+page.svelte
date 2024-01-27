<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import Logo from '$lib/components/logo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, File, Folder, Spinner, X, SunDim, MoonStars } from 'phosphor-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import { createNewDesign, getDesignsByUser } from '$lib/api/designs';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/ui/loader.svelte';
	import * as Card from '$lib/components/ui/card';
	import { toggleMode, mode } from 'mode-watcher';
	import Input from '$lib/components/ui/input/input.svelte';
	import { supabase } from '$lib/utils/supabase';

	let width = $state(900);
	let height = $state(700);
	let loading = $state(false);

	const { data } = $props();

	const handleCreateDesign = async () => {
		loading = true;
		try {
			const data = await createNewDesign({
				width: width,
				height: height
			});

			goto(`/designs/${data.id}`);
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (!error) {
			goto('/login');
		} else {
			console.error(error);
		}
	};
</script>

<div class="h-screen">
	<nav class="h-16 mb-10 flex items-center px-4 gap-3 border-b border-primary/20">
		<Logo />
		<div class="flex-1"></div>

		<Button variant="secondary">
			<Folder size={20} class="mr-2" />
			My Designs
		</Button>

		<Popover.Root portal={null}>
			<Popover.Trigger>
				<Avatar.Root>
					<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</Popover.Trigger>

			<Popover.Content>
				<button onclick={handleSignOut}>Sign Out</button>
			</Popover.Content>
		</Popover.Root>

		<button class="ml-2" onclick={toggleMode}>
			{#if $mode === 'dark'}
				<SunDim size={26} />
				<span class="sr-only">Switch to light mode</span>
			{:else}
				<MoonStars size={26} />

				<span class="sr-only">Switch to dark mode</span>
			{/if}
		</button>
	</nav>

	<section class="container">
		<Card.Root class="w-full">
			<Card.Header>
				<Card.Title>Create New Design</Card.Title>
				<Card.Description>Start a new design from scratch</Card.Description>
			</Card.Header>

			<Card.Content>
				<div class="flex items-end space-x-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="width">Width</Label>
						<Input id="width" name="width" bind:value={width} />
					</div>

					<div class="flex flex-col space-y-1.5">
						<Label for="height">Height</Label>
						<Input id="height" name="height" bind:value={height} />
					</div>

					<div class="py-2 px-4 rounded-sm border border-accent pointer-events-none text-center">
						px
					</div>
					<Button onclick={handleCreateDesign}>Create</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="container my-8">
		<h2 class="text-lg font-semibold mb-4">Recent Designs</h2>

		{#if !data.designs}
			<Loader />
		{:else if data.designs.length === 0}
			<div class="text-center text-sm text-muted-foreground">No designs found</div>
		{:else}
			<div class="flex flex-wrap items-center gap-4">
				{#each data.designs as design}
					<div
						tabindex="0"
						role="button"
						onmousedown={() => {
							goto(`/designs/${design.id}`);
						}}
						class="space-y-2 cursor-pointer group hover:scale-105 hover:text-primary duration-500"
					>
						<div class="rounded border group-hover:border-primary overflow-hidden">
							{#if design.thumbnail}
								<img
									class="h-[200px] object-cover -my-1"
									src={encodeURI(design.thumbnail)}
									alt={design.name}
								/>
							{:else}
								<img class="object-cover" src="https://picsum.photos/250/200" alt={design.name} />
							{/if}
						</div>
						<div class="space-y-1">
							<h2 class="text-lg font-semibold">{design.name}</h2>
							<p class="text-sm text-muted-foreground">
								{design.canvas.width} x {design.canvas.height}
							</p>
						</div>
					</div>
					<!-- <Card.Root
						onclick={() => {
							goto(`/designs/${design.id}`);
						}}
						class="w-full group overflow-hidden border-2 border-transparent shadow hover:border-primary cursor-pointer"
					>
						<Card.Content class="p-0 overflow-hidden">
							{#if design.thumbnail}
								<img
									class="object-cover rounded h-[150px]"
									src={encodeURI(design.thumbnail)}
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
					</Card.Root> -->
				{/each}
			</div>
		{/if}
	</section>
</div>
