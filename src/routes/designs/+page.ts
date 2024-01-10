
import { goto } from '$app/navigation';
import { auth } from '$lib/store/auth.svelte';


export async function load() {
  let isAuthenticated = false;

  await auth.checkAuth((isLoggedIn) => {
    isAuthenticated = isLoggedIn;
  });

  if (!isAuthenticated) {
    goto('/login');
  }

  return {};
}

export const ssr = false;