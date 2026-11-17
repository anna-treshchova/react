export const removeEmptyFilters = <T extends object>(
    filters: T
): Partial<T> => {
   return Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => Boolean(value))
    ) as Partial<T>
}