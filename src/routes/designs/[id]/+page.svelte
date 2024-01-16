<script lang="ts">
	import Canvas from '$lib/components/canvas/canvas.svelte';
	import { goto } from '$app/navigation';
	import ControlsCanvas from '$lib/components/canvas/controls-canvas.svelte';
	import CropCanvas from '$lib/components/canvas/crop-canvas';
	import { Sidepanel } from '$lib/components/sidepanel';
	import Toolbar from '$lib/components/toolbar/toolbar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { canvasStore, store } from '$lib/store';
	import Logo from '$lib/components/logo-mini.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Menubar from '$lib/components/ui/menubar';
	import * as Popover from '$lib/components/ui/popover';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import {
		ArrowUUpLeft,
		ArrowUUpRight,
		Check,
		Download,
		CloudArrowUp,
		FilePng,
		Folder,
		CloudCheck,
		MoonStars,
		SunDim
	} from 'phosphor-svelte';
	import { toggleMode, mode } from 'mode-watcher';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	// import page data
	import clsx from 'clsx';
	import type { PageData } from './$types';
	import { auth } from '$lib/store/auth.svelte';
	import FontLoader from '$lib/components/font-loader.svelte';

	export let data: PageData;
	store.init(data.design!);

	async function signout() {
		await auth.signOut();
		goto('/login');
	}
</script>

<FontLoader fontUrls={store.elements.fonts} />
<div class="w-screen h-screen flex flex-col">
	<header class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
		<div class="px-4 flex h-14 gap-8 items-center text-primary">
			<Logo />

			<Button
				onclick={() => {
					goto('/designs');
				}}
				variant="ghost"
				class="text-sm">Home</Button
			>

			<Menubar.Root class="p-0 shadow-none rounded-none border-none">
				<Menubar.Menu>
					<Menubar.Trigger>
						<Button variant="ghost" class="text-sm">File</Button>
					</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>
							Save <Menubar.Shortcut>⌘S</Menubar.Shortcut>
						</Menubar.Item>
						<Menubar.Item>
							Save to Folder
							<Menubar.Shortcut>
								<Folder size={16} />
							</Menubar.Shortcut>
						</Menubar.Item>
						<Menubar.Item>New Design</Menubar.Item>
						<Menubar.Separator />
						<Menubar.Sub>
							<Menubar.SubTrigger>Share</Menubar.SubTrigger>
							<Menubar.SubContent>
								<Menubar.Item>Email link</Menubar.Item>
								<Menubar.Item>Messages</Menubar.Item>
								<Menubar.Item>Notes</Menubar.Item>
							</Menubar.SubContent>
						</Menubar.Sub>
						<Menubar.Separator />
						<Menubar.Item>
							Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
						</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
			</Menubar.Root>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="ghost" class="text-sm">Resize</Button>
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
								bind:value={canvasStore.width}
								class="w-full h-full ml-2 oultine-none text-xs focus:outline-none bg-background"
							/>
						</div>
						<div
							class="w-20 h-8 flex rounded-sm border items-center p-1 gap-1 focus-within:border-primary"
						>
							<span class="text-sm text-muted-foreground">H</span>
							<input
								type="number"
								bind:value={canvasStore.height}
								class="w-full h-full ml-2 oultine-none text-xs focus:outline-none bg-background"
							/>
						</div>

						<div class="p-1.5 h-8 border pointer-events-none text-center">px</div>
					</div>
				</Popover.Content>
			</Popover.Root>

			<div class="flex items-center gap-2 w-28">
				<Separator class="h-6" orientation="vertical" />
				<Button
					onclick={() => {
						store.undo();
					}}
					variant="ghost"
					disabled={!store.canUndo}
					class="disabled:opacity-50 disabled:cursor-no-drop"
				>
					<ArrowUUpLeft size={20} />
				</Button>
				<Button
					onclick={() => {
						store.redo();
					}}
					class="disabled:opacity-50 disabled:cursor-no-drop"
					variant="ghost"
					disabled={!store.canRedo}
				>
					<ArrowUUpRight size={20} />
				</Button>

				<Separator class="h-6" orientation="vertical" />

				<Popover.Root>
					<Popover.Trigger>
						<Button variant="ghost" class="text-sm">
							{canvasStore.scale * 100}%
						</Button>
					</Popover.Trigger>

					<Popover.Content>
						<div class="space-y-4 px-2">
							<div class="flex items-center justify-between">
								<label for="border width" class="text-xs font-semibold">Zoom</label>
								<Input
									class="w-12 h-6 border rounded p-2 text-xs"
									value={canvasStore.scale * 100}
								/>
							</div>

							<Slider
								min={0.2}
								max={1}
								step={0.01}
								onValueChange={(val) => {
									// Round the scale value to avoid floating point precision issues
									canvasStore.scale = val[0];
								}}
								value={[canvasStore.scale]}
							/>
						</div>
					</Popover.Content>
				</Popover.Root>
			</div>

			<div class="flex-1" />
			<div class="mr-2 flex items-center gap-2">
				<Button
					onclick={() => {
						store.saveToLocalStorage();
					}}
					variant="outline"
					size="sm"
					class={clsx('py-[1px]', {
						'bg-primary/10': !store.saving,
						'bg-gradient-to-r from-sky-500 to-blue-500 text-white': store.saving
					})}
				>
					{#if store.saving}
						<CloudArrowUp class="animate-pulse fill-current" size={26} />
					{:else}
						<CloudCheck class="fill-primary" size={26} />
					{/if}
				</Button>

				<Separator class="h-6" orientation="vertical" />

				<Input class="px-1 text-sm h-8" bind:value={store.name} />

				<Popover.Root>
					<Popover.Trigger>
						<Button size="sm" class="font-semibold">
							<Download class="mr-2" size={20} />
							Download
						</Button>
					</Popover.Trigger>
					<Popover.Content>
						<div class="font-semibold my-2">Download Your Design</div>
						<Input class="w-full my-4" bind:value={store.name} />
						<div class="p-2 bg-secondary/50 rounded-sm">
							<div class="flex items-center justify-between">
								<span class="flex text-xs font-bold">
									<FilePng class="mr-1" size={20} />
									PNG
								</span>
								<Check size={20} />
							</div>
							<p class="text-sm text-muted-foreground my-2">
								To keep high quality in complex images.
							</p>
							<div class="flex items-center gap-1">
								<Slider step={0.25} min={0.25} max={4} value={[1]} />
								1x
							</div>
						</div>

						<Button size="sm" class="w-full mt-4">
							<Download class="mr-2" size={20} />
							Download
						</Button>
					</Popover.Content>
				</Popover.Root>

				<Popover.Root portal="null">
					<Popover.Trigger>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
					</Popover.Trigger>

					<Popover.Content>
						<Button variant="ghost" onclick={signout} class="text-sm">Sign Out</Button>
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
			</div>
		</div>
	</header>

	<main class="flex flex-1">
		<div class="sm:hidden min-w-[400px] w-[400px] border-r">
			<Sidepanel />
		</div>

		<!-- Main content section -->
		<section class="flex flex-col w-full bg-primary/5 overflow-hidden">
			<div class="h-14 w-full p-2 bg-background border-b shadow-xs">
				<Toolbar />
			</div>

			<div class="flex-1 overflow-auto relative">
				<Canvas />
				{#if canvasStore.state === 'cropping'}
					<CropCanvas />
				{:else}
					<ControlsCanvas />
				{/if}
			</div>
		</section>
	</main>
</div>
