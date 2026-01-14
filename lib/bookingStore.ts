import apiUrl from '@/lib/env'

export interface Court {
    id: string;
    name: string;
    description: string;
    pricePerHour: number;
    image: string;
    features: string[];
}

async function fetchCourts(): Promise<Court[]> {
    try {
        const res = await fetch(`${apiUrl}/courts`);
        if (!res.ok) {
            throw new Error('Failed to fetch courts');
        }
        const json = await res.json();
        return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
        return [];
    }
}
export const getCourts = async () => {
    return await fetchCourts();
}

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};