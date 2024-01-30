import { decode } from 'base64-arraybuffer'
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { supabase } from '$lib/utils/supabase';
import client from './client';

export const getAllUploads = async () => {
	const { data, error } = await supabase.from('uploads').select();

	if (error) {
		throw error;
	} else {
		console.log('uploads: ', data);
		return data;
	}
};

export const postUpload = async (file: File) => {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session) {
		const userId = session.user.id;
		const timestamp = new Date().getTime();
		const filenameWithoutExtension = file.name.split('.')[0];
		const { data, error } = await supabase.storage
			.from('uploads')
			.upload(`${userId}/${filenameWithoutExtension}-${timestamp}`, file, {
				cacheControl: '3600',
				upsert: true
			});

    console.log('data: ', data);

		if (error) {
			console.log('Error uploading file: ', error);
		} else {
      const fileUrl = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${data.path}`
      // add to uploads table
      const res = await supabase.from('uploads').insert({
        filename: file.name,
        url: fileUrl,
      })

      if (res.error) {
        console.log('Error inserting into uploads table: ', res.error);
      }
		}
	} 

  
};

export const removeBackgroundFromUrl = async (url: string) => {
	const res = await client.post('uploads/remove-bg', { url });

  const base64 = res.data.split('base64,')[1]
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) return;
  const userId = session.user.id;
  const timestamp = new Date().getTime();
  // upload res.data to supabase storage and add to uploads table
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(`${userId}/remove-bg-${timestamp}`, decode(base64), {
      cacheControl: '3600',
      upsert: true,
      contentType: 'image/png'
    });

  if (error) {
    console.log('Error uploading file: ', error);
  } else {
    const fileUrl = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${data.path}`
    // add to uploads table
    const res = await supabase.from('uploads').insert({
      filename: 'remove-bg.png',
      url: fileUrl,
    })

    if (res.error) {
      console.log('Error inserting into uploads table: ', res.error);
    } else {
      console.log('res: ', fileUrl, res.data);
      return { url: fileUrl }
    }
  }
	return { url: '' }
};
