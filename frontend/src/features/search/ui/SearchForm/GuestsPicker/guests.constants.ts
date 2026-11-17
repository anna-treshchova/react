import type { GuestCategories } from '@/entities/search';

interface GuestOption {
    field: keyof GuestCategories;
    label: string;
    description: string;
}

export const GUESTS_OPTIONS = [
    { field: 'adults', label: 'Adults', description: 'Ages 13 or above' },
    { field: 'children', label: 'Children', description: 'Ages 2 – 12' },
    { field: 'infants', label: 'Infants', description: 'Under 2' },
    { field: 'pets', label: 'Pets', description: 'Service animals aren’t pets' },
] as const satisfies readonly GuestOption[];

export const GUESTS_LIMITS = {
    adults: 10,
    children: 10,
    infants: 5,
    pets: 2,
} as const satisfies Record<keyof GuestCategories, number>;
