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
		canvasWidth: width,
		canvasHeight: height,
		fonts: [],
		background: '#ffffff',
		elements: '[]',
		canvas: {
			width,
			height,
			background: '#ffffff',
			elements: '[]',
			fonts: []
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
		fonts?: string[];
	};
}

// Define the CreateDesignDTO class
export class CreateDesignDTO {
	id?: string;
	name?: string;
	userId?: string;
	canvasWidth?: number;
	canvasHeight?: number;
	background?: string;
	elements?: string;
	fonts?: string[];
  thumbnail?: string;
}

// Function to convert Partial<DesignType> to Partial<CreateDesignDTO>
function convertToPartialCreateDesignDTO(design: Partial<DesignType>): Partial<CreateDesignDTO> {
	const dto = new CreateDesignDTO();

	dto.id = design.id;
	dto.name = design.name;
	dto.userId = design.userId;

	// Check if canvas is provided before trying to access its properties
	if (design.canvas) {
		dto.canvasWidth = design.canvas.width;
		dto.canvasHeight = design.canvas.height;
		dto.background = design.canvas.background;
		dto.elements = design.canvas.elements;
		dto.fonts = design.canvas.fonts;
	}

	return dto;
}

// Function to convert Partial<CreateDesignDTO> to Partial<DesignType>
function convertToPartialDesignType(dto: Partial<CreateDesignDTO>): Partial<DesignType> {
	const design: Partial<DesignType> = {};

	design.id = dto.id;
	design.name = dto.name;
	design.userId = dto.userId;

	// Initialize canvas only if any of its properties are present
	if (
		dto.canvasWidth !== undefined ||
		dto.canvasHeight !== undefined ||
		dto.background !== undefined ||
		dto.elements !== undefined ||
		dto.fonts !== undefined
	) {
		design.canvas = {};

		if (typeof dto.canvasWidth === 'number') {
			design.canvas.width = dto.canvasWidth;
		}
		if (typeof dto.canvasHeight === 'number') {
			design.canvas.height = dto.canvasHeight;
		}
		if (typeof dto.background === 'string') {
			design.canvas.background = dto.background;
		}
		if (typeof dto.elements === 'string') {
			design.canvas.elements = dto.elements;
		}
		if (Array.isArray(dto.fonts)) {
			design.canvas.fonts = dto.fonts;
		}

    if (typeof dto.thumbnail === 'string') {
      design.thumbnail = dto.thumbnail;
    }
	}

	return design;
}
