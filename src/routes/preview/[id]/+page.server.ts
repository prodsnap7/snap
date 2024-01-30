// export const ssr = false;
// export const csr = false;

import { getDesignById } from '$lib/api/designs';
import { elementsStore, type CanvasObject, getPathFromPoints, getfonts } from '$lib/store/index.js';
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

export const load = async ({ params }) => {
	const design = await loadData(params.id);
	const { canvas } = design!;
	const els = JSON.parse(design!.elements).map((e: string) => JSON.parse(e));
	const elements = els.map((element: CanvasObject) => {
		if (element.type === 'curve') {
			return {
				...element,
				path: getPathFromPoints(element.points!, element.pathType),
			}
		} 

		return element;
	})
	return {
		canvas: {
			width: canvas.width,
			height: canvas.height,
			background: canvas.background,
		},
		elements,
		fonts: getfonts(els),
	};
};
