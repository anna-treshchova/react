export const getNumber = (value) => Number(value) || 0;

export const setParam = (params, key, value) => {
    if (value) params.set(key, String(value));
}