import { json, type RequestHandler } from "@sveltejs/kit";
import { PUBLIC_APP_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import puppeteer from "puppeteer";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
// import { supabase } from "$lib/utils/supabase";

export const POST: RequestHandler = async (event) => {
  const supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event
  })
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return json({ error: "Not logged in" })
  }
  // get the id and filename from the request body
  const { id, filename } = await event.request.json();
  // create supabase client
  const url = PUBLIC_APP_URL + "/preview/" + id;
  console.log("Taking screenshot of: ", url)
  const file = await screenshotDOMElement(url);
  // upload the file to supabase storage
  const name = `${session.user.id}/${filename}.png`;

  console.log("Uploading file: ", name);
  const { data, error } = await supabase.storage.from("designs").upload(name, file, {
    contentType: "image/png",
    cacheControl: "3600",
  });

  if (error) {
    return json({ error: error.message });
  }

  const fileUrl = `${PUBLIC_APP_URL}/storage/v1/object/public/designs/${data.path}`;
  // update the design with the new image url
  console.log("Updating design with url: ", fileUrl);
  const { data: design, error: designError } = await supabase.from("designs").update({ thumbnail: fileUrl }).eq("id", id).single();

  if (designError) {
    return json({ error: designError?.message });
  }

  return json({ data: design });
}

async function screenshotDOMElement(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // wait 2s after #preview-canvas is rendered
  await page.waitForSelector("#canvas", { timeout: 2000 });
  const element = await page.$("#canvas");

  if (!element) {
    throw new Error("Could not find element");
  }
  const screenshotBuffer = await element.screenshot();

  await browser.close();

  return screenshotBuffer;
}