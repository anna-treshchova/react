export const pluralize = (count, singular, plural = `${singular}s`) => (
    `${count} ${count > 1 ? plural : singular}`
)
export const truncate = (str, max = 100) => {
    if (!str) return '';
    return str.length > max ? str.slice(0, max) + '...' : str;
}
