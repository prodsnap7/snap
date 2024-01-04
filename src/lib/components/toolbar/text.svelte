<script lang="ts">
	import type { TextBox } from '$lib/store';
	import {
		CaretDown,
		TextAa,
		TextAlignLeft,
		TextAlignCenter,
		TextAlignRight,
		TextAlignJustify,
		TextB,
		TextItalic,
		TextStrikethrough,
		TextT,
		TextUnderline,
		Textbox,
		List,
		ListNumbers,
		ListBullets
	} from 'phosphor-svelte';
	import { sidepanelStore } from '../sidepanel/state.svelte';
	import Separator from '../ui/separator/separator.svelte';
	import * as Popover from '../ui/popover';
	import { Toggle } from '$lib/components/ui/toggle';
	import Slider from '../ui/slider/slider.svelte';
	import * as ToggleGroup from '../ui/toggle-group';
	import Input from '../ui/input/input.svelte';
	import Button from '../ui/button/button.svelte';

	type Props = {
		element: TextBox;
	};

	let { element } = $props<Props>();

	function onColorClick() {
		sidepanelStore.state = 'colors';
		sidepanelStore.val = element.color;
		sidepanelStore.cb = (val: string) => {
			element.color = val;
		};
	}

	function onBoldToggle(val: boolean) {
		if (val) {
			element.fontWeight = 'bold';
		} else {
			element.fontWeight = 'normal';
		}
	}

	function onItalicToggle(val: boolean) {
		if (val) {
			element.fontStyle = 'italic';
		} else {
			element.fontStyle = 'normal';
		}
	}

	function onUnderlineToggle(val: boolean) {
		if (val) {
			element.decoration = 'underline';
		} else {
			element.decoration = 'none';
		}
	}

	function onUpperCaseToggle(val: boolean) {
		element.uppercase = val;
	}

	function strikethroughToggle(val: boolean) {
		if (val) {
			element.decoration = 'line-through';
		} else {
			element.decoration = 'none';
		}
	}

	function onTextAlignToggle(val: string | undefined) {
		if (!val) return;
		element.align = val as 'left' | 'center' | 'right' | 'justify';
	}

	const fontSize = $derived(Math.ceil(element.fontSize) * element.scale);
</script>

<Popover.Root portal="null">
	<Popover.Trigger>
		<Textbox size={28} />
	</Popover.Trigger>

	<Popover.Content class="w-60">
		<div class="text-xs font-semibold my-2">Text Alignment</div>
		<ToggleGroup.Root
			value={element.align}
			onValueChange={onTextAlignToggle}
			size="sm"
			type="single"
			class="justify-start"
		>
			<ToggleGroup.Item value="left" aria-label="Align left">
				<TextAlignLeft size={20} />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="center" aria-label="Align center">
				<TextAlignCenter size={20} />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="right" aria-label="Align right">
				<TextAlignRight size={20} />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="justify" aria-label="Align justify">
				<TextAlignJustify size={20} />
			</ToggleGroup.Item>
		</ToggleGroup.Root>

		<div class="space-y-4 my-3">
			<div class="flex items-center justify-between">
				<label for="border width" class="text-xs font-semibold">Letter Spacing</label>
				<Input class="w-12 h-6 border rounded p-2 text-xs" bind:value={element.letterSpacing} />
			</div>

			<Slider
				min={-30}
				max={30}
				step={0.1}
				onValueChange={(val) => {
					element.letterSpacing = val[0];
				}}
				value={[element.letterSpacing]}
			/>
		</div>

		<div class="space-y-4 my-3">
			<div class="flex items-center justify-between">
				<label for="border width" class="text-xs font-semibold">Line Height</label>
				<Input class="w-12 h-6 border rounded p-2 text-xs" bind:value={element.lineHeight} />
			</div>

			<Slider
				min={-10}
				max={10}
				step={0.01}
				onValueChange={(val) => {
					element.lineHeight = val[0];
				}}
				value={[element.lineHeight]}
			/>
		</div>
	</Popover.Content>
</Popover.Root>

<Separator orientation="vertical" class="h-6" />

<Popover.Root portal="null">
	<Popover.Trigger>
		<button class="h-8 w-8 rounded border">{Math.ceil(fontSize)}</button>
	</Popover.Trigger>

	<Popover.Content class="w-60">
		<div class="space-y-4 px-2">
			<div class="flex items-center justify-between">
				<label for="border width" class="text-xs font-semibold">Font Size</label>
				<Input class="w-12 h-6 border rounded p-2 text-xs" value={fontSize} />
			</div>

			<Slider
				min={5}
				step={1}
				onValueChange={(val) => {
					element.fontSize = val[0];
				}}
				value={[element.fontSize]}
			/>
		</div>
	</Popover.Content>
</Popover.Root>

<Separator orientation="vertical" class="h-6" />

<Button onclick={onColorClick} variant="ghost" class="p-1 border flex flex-col items-center">
	<TextT size={22} color={element.color} />
	<div class="w-6 h-2 rounded-sm bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500" />
</Button>

<div class="space-x-0">
	<Toggle
		pressed={element.fontWeight === 'bold' || element.fontWeight === '700'}
		onPressedChange={onBoldToggle}
		class="px-1 py-0"
		aria-label="Toggle bold"
	>
		<TextB size={20} />
	</Toggle>
	<Toggle
		pressed={element.fontStyle === 'italic'}
		onPressedChange={onItalicToggle}
		class="px-1 py-0"
		aria-label="Toggle italic"
	>
		<TextItalic size={20} />
	</Toggle>
	<Toggle
		pressed={element.decoration === 'underline'}
		onPressedChange={onUnderlineToggle}
		class="px-1 py-0"
		aria-label="Toggle underline"
	>
		<TextUnderline size={20} />
	</Toggle>

	<Toggle
		pressed={element.decoration === 'line-through'}
		onPressedChange={strikethroughToggle}
		class="px-1 py-0"
		aria-label="Toggle strike-through"
	>
		<TextStrikethrough size={20} />
	</Toggle>
	<Toggle
		pressed={element.uppercase}
		onPressedChange={onUpperCaseToggle}
		class="px-1 py-0"
		aria-label="Toggle uppercase"
	>
		<TextAa size={20} />
	</Toggle>
</div>

<Separator orientation="vertical" class="h-6" />

<button
	class="flex items-center justify-between px-1.5 py-1 w-32 rounded-sm border text-ellipsis hover:bg-secondary"
>
	<span>
		{element.fontFamily}
	</span>
	<CaretDown />
</button>
