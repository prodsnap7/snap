import axios from 'axios';
import { getUserToken } from '$lib/firebase';

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