import axios from 'axios';
import { getUserToken } from '$lib/firebase';
import { createClient } from '@supabase/supabase-js';

// Create an Axios instance
const client = axios.create();

// Add a request interceptor
client.interceptors.request.use(async(config) => {
  // Get the session token
  const token = await getUserToken();

  // If token is present, set Authorization header
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

export default client;

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
)