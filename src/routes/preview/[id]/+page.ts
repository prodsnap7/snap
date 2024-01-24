// export const ssr = false;
// export const csr = false;

import { getDesignById } from '$lib/api/designs';
import { redirect } from '@sveltejs/kit';

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
		console.error('Error loading data:', e);
		redirect(307, '/designs');
		return; // Ensure no further execution after redirect
	}
};

export const load = async ({ params, parent }) => {
	const design = await loadData(params.id);
	return {
		design
	};
};
