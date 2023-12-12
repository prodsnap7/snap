export async function load({ params, url }) {
    let sidepanel = url.searchParams.get('sidepanel');
    return { sidepanel };
}