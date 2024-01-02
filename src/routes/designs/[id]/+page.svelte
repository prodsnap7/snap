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
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ArrowUUpLeft, ArrowUUpRight, Folder } from 'phosphor-svelte';

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
			<div class="mr-4 md:flex">
				<Input class="px-1 text-sm h-8" value={store.name} />
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
