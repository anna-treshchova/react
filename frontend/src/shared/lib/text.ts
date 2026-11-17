export const pluralize = (
    count: number,
    singular: string,
    plural: string = `${singular}s`
): string => `${count} ${count > 1 ? plural : singular}`;