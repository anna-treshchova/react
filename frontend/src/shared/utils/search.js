export const generateSearchId = ({ destinationId, dates, guests }) => {
    const dest = destinationId || 'any-dest';
    const checking = dates[0] || 'any-date';
    const checkout = dates[1] || 'any-date';

    return `${dest}_${checking}_${checkout}_${guests}`;
}