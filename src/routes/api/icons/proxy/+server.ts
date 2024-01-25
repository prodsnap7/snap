import type { RequestHandler } from "@sveltejs/kit";
import axios from "axios";

export const GET: RequestHandler = async ({ url }) => {
  const iconUrl = url.searchParams.get("iconUrl") ?? '';

  const res = await axios.get(iconUrl);

  return new Response(res.data);
}