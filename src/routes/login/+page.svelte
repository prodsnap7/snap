<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/logo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import { auth } from '$lib/store/auth.svelte';
	import { supabase } from '$lib/utils/supabase.js';
	import clsx from 'clsx';
	import { Spinner } from 'phosphor-svelte';
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	let scale = $state(1);
	let rotate = $state(0);
	let loading = $state(false);

	let canvas: HTMLDivElement | null = $state(null);
	let el: HTMLDivElement | null = $state(null);

	let email = $state('');
	let password = $state('');

	onMount(() => {
		const interval = setInterval(() => {
			if (!el || !canvas) return;
			if (Math.random() < 0.4) {
				x = Math.random() * (canvas.clientWidth - el.clientWidth);
				y = Math.random() * (canvas.clientHeight - el.clientHeight);
			} else if (Math.random() < 0.7) {
				// scale = Math.random() * 4;
				// scale between 0.5 and 2.5
				scale = Math.random() * 2 + 0.5;
			} else {
				rotate = Math.random() > 0.5 ? 0 : 45;
			}
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	});

	async function onclick() {
		loading = true;
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		loading = false;
		if (!error) {
			goto('/designs');
		} else {
			console.error(error);
		}
	}
</script>

<div class="w-screen h-screen grid grid-cols-12">
	<div class="col-span-4 bg-white flex items-center justify-center">
		<Card.Root class={clsx('w-80')}>
			<Card.Header>
				<Card.Title>Sign In</Card.Title>
				<Card.Description>Sign in to access your account</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-6">
				<div class="space-y-2">
					<label for="email">Email</label>
					<Input name="email" bind:value={email} type="email" />
				</div>

				<div class="space-y-2">
					<label for="password">Password</label>
					<Input name="password" bind:value={password} type="password" />
				</div>

				<Button {onclick} class="w-full" type="submit">
					Sign In
					<Spinner class={clsx('ml-2', { hidden: !loading })} />
				</Button>
			</Card.Content>
		</Card.Root>
	</div>
	<div bind:this={canvas} class="relative col-span-8 bg-gradient-to-br from-teal-100 to-cyan-300">
		<div
			bind:this={el}
			class="absolute w-32 h-20 bg-transparent transition duration-[2000ms] ease-in-out text-center flex justify-center items-center"
			style="transform: translate({x}px, {y}px) scale({scale}) rotate({rotate}deg);"
		>
			<Logo />
		</div>
	</div>
</div>
