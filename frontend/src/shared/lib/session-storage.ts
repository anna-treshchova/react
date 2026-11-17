export const getSessionItem = (key: string): unknown => {
    if (typeof window === 'undefined') return null;

    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
}

export const setSessionItem = (key: string, value: unknown): void => {
    if (typeof window === 'undefined') return;

    try {
        sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
        // Ignore storage write errors
    }
}

export const removeSessionItem = (key: string): void => {
    if (typeof window === 'undefined') return;

    try {
        sessionStorage.removeItem(key);
    } catch {
        // Ignore storage write errors
    }
}
