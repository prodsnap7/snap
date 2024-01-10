import client from './client';

type FontType = {
    category: string;
    fontFamily: string;
    variants: { imageUrl: string; name: string; }[];
    kind: string;
}

export function fetchAllFonts({ pageParam }: { pageParam?: number }) {
    return client.get('/fonts?page=' + pageParam) as Promise<{ data: { fonts: FontType[], nextPage: number } }>;
}