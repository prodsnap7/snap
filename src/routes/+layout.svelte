<script lang="ts">
	import '../app.pcss';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	// export let data;

	// let { supabase, session } = data;
	// $: ({ supabase, session } = data);

	// let { data } = $props();

	// $effect(() => {
	// 	const res = data.supabase.auth.onAuthStateChange((event, _session) => {
	// 		if (_session?.expires_at !== data.session?.expires_at) {
	// 			invalidate('supabase:auth');
	// 		}
	// 	});

	// 	return () => res.data.subscription.unsubscribe();
	// });

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
