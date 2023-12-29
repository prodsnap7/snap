import type { RequestHandler } from "./$types";
import axios from "axios";

export const GET: RequestHandler = async (request) => {
  const pexelsUrl = "https://api.pexels.com/v1/popular?per_page=20&page=1";
  
  // make the request to the Pexels API with the API key
  return axios.get(pexelsUrl, {
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
  }) 
}