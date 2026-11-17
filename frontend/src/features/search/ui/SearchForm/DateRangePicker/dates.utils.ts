import dayjs, { type Dayjs } from 'dayjs';
import type { DateStringRange, DayjsDateRange } from '@/entities/search';

export const toDayjsStrings = (dates: DayjsDateRange): DateStringRange => {
    const [start, end] = dates;

    return [
        start ? start.format('YYYY-MM-DD')  : null,
        end ? end.format('YYYY-MM-DD') : null
    ]
}

export const toDayjsDates = (dates: DateStringRange): DayjsDateRange => {
    const [start, end] = dates;

    return [
        start ? dayjs(start) : null,
        end ? dayjs(end) : null
    ]
}

export const disablePastDate = (current: Dayjs): boolean => {
    const today = dayjs().startOf('day');
    return current.isBefore(today, 'day');
};