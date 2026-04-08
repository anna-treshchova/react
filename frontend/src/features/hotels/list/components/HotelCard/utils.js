import dayjs from 'dayjs';

export const calcNights = (start, end) => {
    if (!start || !end) return 2;

    const diff = dayjs(end).diff(dayjs(start), 'day');
    return diff > 0 ? diff : 1;
}

export const calcTotalPrice = (pricePerNight, nights) => {
    return pricePerNight * nights;
}