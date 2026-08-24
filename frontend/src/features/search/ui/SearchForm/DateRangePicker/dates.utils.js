import dayjs from 'dayjs';

export const toDayjsStrings = (dates = []) => {
    return dates.map(d => (d ? d.format('YYYY-MM-DD') : null))
}

export const toDayjsDates = (dates = []) => {
    return dates.map(d => (d ? dayjs(d) : null))
}

export const disablePastDate = (current) => {
    const today = dayjs().startOf('day');
    return current && current < today;
};
