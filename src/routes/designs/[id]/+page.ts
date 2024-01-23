import type { PageLoad } from './$types';

export const ssr = false;
export const csr = true;

// export const load: PageLoad = async ({ parent, params }) => {
	// const { supabase } = await parent();
	// const { data, error } = await supabase.from('designs').select('*').eq('id', params.id);

	// if (error) {
	// 	return { error: new Error(error.message) };
	// } else {
	// 	let { canvas, name } = data[0];
	// 	let elements = [];
	// 	if (canvas) {
	// 		elements = canvas.elements || '[]';
	// 	} else {
	// 		canvas = {
	// 			width: 800,
	// 			height: 600,
	// 			background: '#ffffff',
	// 			elements: [],
	// 			fonts: []
	// 		};
	// 	}

	// 	return {
	// 		design: {
	// 			elements,
	// 			canvas,
	// 			id: params.id,
	// 			name: name || 'Untitled'
	// 		}
	// 	};
	// }

	// return {
	// 	design: {
	// 		elements: [],
	// 		canvas: {
	// 			width: 800,
	// 			height: 600,
	// 			background: '#ffffff',
	// 			elements: [],
	// 			fonts: []
	// 		},
	// 		id: params.id,
	// 		name: 'Untitled'
	// 	}
	// }
// };
