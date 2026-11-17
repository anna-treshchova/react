import type { SearchDestination, DateStringRange } from '@/entities/search';

export const generateSearchId = (
    destinationId: SearchDestination['id'],
    dates: DateStringRange,
    guests: number
): string | null => {
   if (!destinationId) return null;

    const checking = dates[0] || 'any-date';
    const checkout = dates[1] || 'any-date';

    return `${destinationId}_${checking}_${checkout}_${guests}`;
};