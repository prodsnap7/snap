<script lang="ts">
	import Canvas from '$lib/components/canvas/canvas.svelte';
	import ControlsCanvas from '$lib/components/canvas/controls-canvas.svelte';
	import CropCanvas from '$lib/components/canvas/crop-canvas.svelte';
	import { Sidepanel } from '$lib/components/sidepanel';
	import Toolbar from '$lib/components/toolbar/toolbar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { canvasStore, store } from '$lib/store';
	import type { PageData } from './$types';
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
		FilePng,
		Folder,
		X
	} from 'phosphor-svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';

	export let data: PageData;
	store.init(data.design);
</script>

<div class="w-screen h-screen flex flex-col">
	<header class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
		<div class="px-4 flex h-14 gap-8 items-center text-primary">
			<Logo />

			<Button variant="ghost" class="text-sm">Home</Button>

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
							class="w-20 h-8 flex rounded-sm border items-center p-1 gap-1 focus-within:ring focus-within:ring-primary"
						>
							<span class="text-sm text-muted-foreground">W</span>
							<input
								class="w-full h-full ml-2 oultine-none text-xs focus:outline-none bg-background"
							/>
						</div>
						<div
							class="w-20 h-8 flex rounded-sm border items-center p-1 gap-1 focus-within:ring focus-within:ring-primary"
						>
							<span class="text-sm text-muted-foreground">H</span>
							<input
								class="w-full h-full ml-2 oultine-none text-xs focus:outline-none bg-background"
							/>
						</div>

						<div class="p-1.5 h-8 border pointer-events-none text-center">px</div>
					</div>
				</Popover.Content>
			</Popover.Root>

			<div class="flex items-center gap-2 w-28">
				<Separator class="h-6" orientation="vertical" />
				<Button variant="ghost">
					<ArrowUUpLeft size={20} />
				</Button>
				<Button variant="ghost">
					<ArrowUUpRight size={20} />
				</Button>
				<Separator class="h-6" orientation="vertical" />
			</div>

			<div class="flex-1" />
			<div class="mr-2 flex items-center gap-2">
				<Input class="px-1 text-sm h-8" bind:value={store.name} />

				<Popover.Root>
					<Popover.Trigger>
						<Button class="font-semibold">
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

						<Button class="w-full mt-4">
							<Download class="mr-2" size={20} />
							Download
						</Button>
					</Popover.Content>
				</Popover.Root>

				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</div>
		</div>
	</header>

	<main class="flex flex-1">
		<div class="sm:hidden min-w-[400px] w-[400px] border-r">
			<Sidepanel />
		</div>

		<!-- Main content section -->
		<section class="flex flex-col w-full bg-primary/5">
			<div class="h-14 w-full p-2 bg-background border-b shadow-xs">
				<Toolbar />
			</div>

			<div class="flex-1 flex items-center justify-center relative">
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
