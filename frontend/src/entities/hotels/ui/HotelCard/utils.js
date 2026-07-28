import dayjs from 'dayjs';

const DEFAULT_NIGHTS_COUNT = 2;

export const calcNights = (dates) => {
    if (!dates || !dates[0] || !dates[1]) {
        return DEFAULT_NIGHTS_COUNT;
    }

    const [start, end] = dates;

    const diff = dayjs(end).diff(dayjs(start), 'day');
    return diff > 0 ? diff : 1;
}

export const calcTotalPrice = (pricePerNight, nights) => {
    return pricePerNight * nights;
}