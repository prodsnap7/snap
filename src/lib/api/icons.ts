import client from './client';

export async function searchIcons(val: string) {
  const res =  await client.get('/icons?q=' + val);
  return res.data;
}