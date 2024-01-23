import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession()

  if (!session) {
    console.log("No session")
    throw redirect(303, '/login')
  }

  const { data, error } = await locals.supabase.from("designs").select("*");

  if (error) {
    return { error: new Error(error.message) }
  } else {
    return { data };
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const width = formData.get("width");
    const height = formData.get("height");

    const {
      data: { user },
    } = await locals.supabase.auth.getUser();

    const { data, error } = await locals.supabase.from("designs").insert([{
      user_id: user.id,
      thumbnail: "",
      name: "New Design",
      canvas: {
        width,
        height,
        scale: 1,
        backgroundColor: "white",
        elements: [],
        fonts: [],
        isSelected: false,
      },
    }]).select();


    if (!error) {
      throw redirect(303, `/designs/${data[0].id}`);
    } else {
      console.log(error)
    }
  }
}