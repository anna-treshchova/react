import type { Dayjs } from 'dayjs';
import { Destination } from '@/entities/destinations/@x/search';

export interface SearchDestination {
    id: Destination['id'] | null;
    label: Destination['label'] | null;
}

export interface GuestCategories {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

export type DateStringRange = [string | null, string | null];
export type DayjsDateRange = [Dayjs | null, Dayjs | null];

export interface SearchCriteria {
    destination: SearchDestination;
    guestCategories: GuestCategories;
    dates: DateStringRange;
    page: number;
}