import type { Destination } from '@/entities/destinations';

export const getDestLabel = (
    destinations: Destination[] = [],
    id: string | null,
) => {
    if (!id) return null;
    const selected = destinations.find(d => d.id === id);
    return selected?.label || null;
}