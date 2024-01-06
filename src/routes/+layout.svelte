<script lang="ts">
	import '../app.pcss';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';

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
