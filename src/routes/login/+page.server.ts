import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return fail(401, {
				status: 401,
				body: {
					error: error.message
				}
			});
		} else {
			throw redirect(303, '/designs');
		}
	}
} satisfies Actions;
