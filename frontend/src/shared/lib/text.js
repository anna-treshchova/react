export const pluralize = (count, singular, plural = `${singular}s`) => (
    `${count} ${count > 1 ? plural : singular}`
)
