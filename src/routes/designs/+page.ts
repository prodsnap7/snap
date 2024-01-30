import { supabase } from "$lib/utils/supabase"
import { redirect } from "@sveltejs/kit";

export const ssr = false

export const load = async () => {
  const { data } = await supabase.auth.getSession()

  console.log("session data: ", data);


  if (!data.session) {
    throw redirect(303, "/login")
  }

  const { data: designs, error } = await supabase.from("designs").select("*")

  if (error) {
    return { error: new Error(error.message) }
  } else {
    return { designs }
  }
}