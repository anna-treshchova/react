export const getNumber = (value: string | null): number => Number(value) || 0;

export const setParam = (
    params: URLSearchParams,
    key: string,
    value: string | number | null
): void => {
    if (value) params.set(key, String(value));
}