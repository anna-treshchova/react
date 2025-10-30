import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timer) // Cleanup викликається як при unmount, так і при rerender, якщо змінюються залежності у useEffect
    }, [value, delay]);

    return debouncedValue;
}

// Custom hook — це просто винесена частина логіки компонента