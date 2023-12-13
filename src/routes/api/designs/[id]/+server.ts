import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (request) => {

  // wait for 200ms
  await new Promise((resolve) => setTimeout(resolve, 200));
  const data = await loadData(request.params.id);

  return new Response(JSON.stringify(data));
}

const loadData = async (id: string) => {

  // wait for 200ms
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    id,
    name: "My Design",
    elements: JSON.stringify([
      {
        type: "shape",
        x: 20,
        y: 20,
        width: 100,
        height: 100,
        rotation: 0,
        fill: "red",
      },
      {
        type: "shape",
        x: 200,
        y: 200,
        width: 100,
        height: 100,
        rotation: 0,
        fill: "blue",
      },
    ]),
    canvas: JSON.stringify({
      width: 750,
      height: 650,
      background: "#ffffff",
      scale: 1,
    }),
  }

}