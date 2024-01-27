import client from './client';
import { supabase } from '$lib/utils/supabase';
import axios from 'axios';

export const getDesignsByUser = async () => {
	// const res = await client.get('/designs');

	// return res.data.map(convertToPartialDesignType);

	const { data, error } = await supabase.from('designs').select();

	if (error) {
		throw error;
	} else {
		return data;
	}
};

export const createNewDesign = async ({ width, height }: { width: number; height: number }) => {
	const designData = {
		name: 'Untitled',
		canvas: {
			width,
			height,
			background: '#ffffff',
			elements: '[]',
			fonts: '[]'
		}
	};

	// const data = convertToPartialCreateDesignDTO(designData);

	const { data, error } = await supabase.from('designs').insert([designData]).select();

	if (error) {
		throw error;
	} else {
		return data[0];
	}
};

export const updateDesign = async (
	{ id, data }: { id: string; data: Partial<DesignType> },
	generateImage = false
) => {
	const { data: design, error } = await supabase.from('designs').update(data).eq('id', id).select();
	if (error) {
		throw error;
	}

	if (generateImage) {
		const name = data.name || 'Untitled';
		await axios.post('/api/screenshot', { id, filename: name.replace(/\s/g, '_')})
	}

	return design[0];
};

export const getDesignById = async (id: string) => {
	const { data, error } = await supabase.from('designs').select().eq('id', id);

	if (error) {
		throw error;
	} else {
		return data[0];
	}
};
// Define the DesignType interface
interface DesignType {
	id: string;
	name: string;
	userId: string;
  thumbnail?: string;
	canvas: {
		width?: number;
		height?: number;
		background?: string;
		elements?: string;
		fonts?: string;
	};
}