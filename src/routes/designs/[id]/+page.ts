export const ssr = false;

import { getDesignById } from "$lib/api/designs";
import type { PageLoad } from "./$types";


const loadData = async (id: string) => {

  let { canvas, name } = await getDesignById(id);

  let elements = "[]"
  if (canvas) {
    elements = canvas.elements || "[]";
  } else {
    canvas = {
      width: 800,
      height: 600,
      background: "#ffffff",
      elements: "[]",
      fonts: [],
    }
  }

  return {
    elements,
    canvas,
    name: name || "Untitled",
  }

}

export const load: PageLoad = async ({ params }) => {
  const data = await loadData(params.id);
  return {
    design: data,
  }
}