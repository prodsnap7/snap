import client from './client';

export const getAllUploads = async () => {
  const res = await client.get('uploads')

  return res.data;
}

export const postUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return client.post('uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

export const removeBackgroundFromUrl = async (url: string) => {
  const res = await client.post('uploads/remove-bg', { url });

  return res.data;
}