export const ssr = false;

import { goto } from '$app/navigation';
import { getDesignById } from '$lib/api/designs';
import { auth } from '$lib/store/auth.svelte';
import type { PageLoad } from './$types';

const loadData = async (id: string) => {
	try {
		let { canvas, name } = await getDesignById(id);
		let elements = '[]';
		if (canvas) {
			elements = canvas.elements || '[]';
		} else {
			canvas = {
				width: 800,
				height: 600,
				background: '#ffffff',
				elements: '[]',
				fonts: []
			};
		}

		return {
			elements,
			canvas,
			id,
			name: name || 'Untitled'
		};
	} catch (e) {
		goto('/designs');
	}
};

export const load: PageLoad = async ({ params, parent }) => {
	await parent();
	let isAuthenticated = false;

  await auth.checkAuth((isLoggedIn) => {
    isAuthenticated = isLoggedIn;
  });

  if (!isAuthenticated) {
    goto('/login');
  }

	const data = await loadData(params.id);

	return {
		design: data
	};
};
