import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data, error } = await locals.supabase.from('designs').select('*').eq('id', params.id);

	if (error) {
		return { error: new Error(error.message) };
	} else {
		let { canvas, name } = data[0];
		let elements = [];
		if (canvas) {
			elements = canvas.elements || '[]';
		} else {
			canvas = {
				width: 800,
				height: 600,
				background: '#ffffff',
				elements: [],
				fonts: []
			};
		}

		return {
			design: {
				elements,
				canvas,
				id: params.id,
				name: name || 'Untitled'
			}
		};
	}
};
