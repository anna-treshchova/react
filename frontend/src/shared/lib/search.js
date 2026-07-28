export const generateSearchId = (destinationId, dates = [], guests) => {
   if (!destinationId) return null;

    const checking = dates[0] || 'any-date';
    const checkout = dates[1] || 'any-date';

    return `${destinationId}_${checking}_${checkout}_${guests}`;
};