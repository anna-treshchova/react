import dayjs from 'dayjs';
import type { DateStringRange } from '@/entities/search/@x/hotels';
import { Hotel } from '../../model';

const DEFAULT_NIGHTS_COUNT = 2;

export const calcNights = (dates: DateStringRange | undefined): number => {
    if (!dates || !dates[0] || !dates[1]) {
        return DEFAULT_NIGHTS_COUNT;
    }

    const [start, end] = dates;

    const diff = dayjs(end).diff(dayjs(start), 'day');
    return diff > 0 ? diff : 1;
}

export const calcTotalPrice = (
    pricePerNight: Hotel['price_per_night'],
    nights: number
) => {
    return pricePerNight * nights;
}