import { supabase } from '$lib/utils/supabase';
import { redirect } from '@sveltejs/kit';

export const ssr = false;
export const csr = true;

export const load = async ({ params }) => {
	const { data } = await supabase.auth.getSession();

	if (!data.session) {
		throw redirect(303, '/login');
	}

	const { data: design, error } = await supabase.from('designs').select('*').eq('id', params.id);

	if (error) {
		return { error: new Error(error.message) };
	} else {
		return {
			design: {
				...design[0],
				elements: design[0].canvas.elements
			}
		};
	}
};
