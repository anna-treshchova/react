const SCROLL_RESTORATION_KEY = 'react-router-scroll-positions'
const SCROLL_RESTORATION_META_KEY = 'hotels_scroll_restoration_meta';

export const getSavedScrollY = () => {
    if (typeof window === 'undefined') return 0;

    try {
        const positions = JSON.parse(sessionStorage.getItem(SCROLL_RESTORATION_KEY) || '{}');
        const key = window.history.state?.key || 'default';
        return positions[key] || 0;
    } catch {
        return 0;
    }
}

export const clearSavedScrollY = () => {
    if (typeof window === 'undefined') return;

    try {
        const positions = JSON.parse(sessionStorage.getItem(SCROLL_RESTORATION_KEY) || '{}');
        const key = window.history.state?.key || 'default';

        if (key in positions) {
            delete positions[key];
            sessionStorage.setItem(SCROLL_RESTORATION_KEY, JSON.stringify(positions))
        }
    } catch {
        // Ignore storage and parsing errors
    }
}

export const saveScrollRestorationMeta = (count, top ) => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(SCROLL_RESTORATION_META_KEY, JSON.stringify({ count, top }));
}

export const getScrollRestorationMeta = () => {
    if (typeof window === 'undefined') return null;

    const savedValue = sessionStorage.getItem(SCROLL_RESTORATION_META_KEY) ?? null;

    if (!savedValue) return null;

    try {
        const parsedState = JSON.parse(savedValue);

        const isCountValid = typeof parsedState.count === 'number' && parsedState.count >= 0;
        const isTopValid = typeof parsedState.top === 'number' || parsedState.top === null;

        if (isCountValid && isTopValid) {
            return parsedState;
        }

        return null;
    } catch {
        return null;
    }
}

export const clearScrollRestorationMeta = () => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(SCROLL_RESTORATION_META_KEY);
}