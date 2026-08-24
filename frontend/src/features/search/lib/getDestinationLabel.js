export const getDestLabel = (destinations = [], id) => {
    const selected = destinations.find(d => d.id === id);
    return selected?.label || null;
}