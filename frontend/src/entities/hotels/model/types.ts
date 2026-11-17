import { Destination } from '@/entities/destinations/@x/hotels';

export interface HotelsQueryFilters {
    page: number;
    limit: number;
    destinationId: Destination['id'] | null;
    guests: number;
    pets: number;
}

export type GetHotelsQueryParams = Partial<HotelsQueryFilters>;

export interface Hotel {
    id: string;
    name: string;
    rating: number,
    price_per_night: number,
    image: string,
    favorite: boolean,
}

export interface HotelsResponse {
    hotels: Hotel[];
    total: number;
}

export type GetHotelDetailsQueryParams = Hotel['id'];

interface Details {
    max_guests: number;
    bedrooms: number;
    beds: number,
    baths: number;
}

export interface HotelDetails {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country_code: string;
    rating: number,
    price_per_night: number,
    images: string[],
    details: Details;
    amenities: string[];
    favorite: boolean,
}

export interface HotelDetailsResponse {
    hotel: HotelDetails;
}