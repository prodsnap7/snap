export async function load({ params, url }) {
    let sidepanel = url.searchParams.get('sidepanel');

    return {
      url: {
        sidepanel,
      },
      design: await loadData(params.id)
    };
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
      }
    ]),
    canvas: JSON.stringify({
      width: 750,
      height: 650,
      background: "#ffffff",
      scale: 1,
    }),
  }

}

// export const csr = true;
export const ssr = false;