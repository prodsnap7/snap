import axios from 'axios';
import { getUserToken } from '$lib/firebase';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

// Create an Axios instance
const client = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json'
	}
});

// Add a request interceptor
client.interceptors.request.use(
	async (config) => {
		// Get the session token
		const token = await getUserToken();

		// If token is present, set Authorization header
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);

export default client;

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);
