import dayjs from 'dayjs';

export const formatDates = (checkin, checkout, timestamp = null) => {
    if (!checkin || !checkout) return '';

    const start = dayjs(checkin);
    const end = dayjs(checkout);

    if (!start.isValid() || !end.isValid()) return '';

    if (timestamp) {
        const searchTime = dayjs(timestamp);
        if (start.isBefore(searchTime, 'day')) return '';
    }

    const sameMonth = start.month() === end.month();

    return sameMonth
        ? `${start.format('MMM D')} – ${end.format('D')}`
        : `${start.format('MMM D')} – ${end.format('MMM D')}`
}

export const getDestLabel = (destinations, id) => {
    const selected = destinations.find(d => d.id === id);
    return selected?.label || null;
}