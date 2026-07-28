import { useEffect, useState } from 'react';

export const useDelayedValue = (value, delay = 400) => {
    const [delayedValue, setDelayedValue] = useState(value);

    useEffect(() => {
        if (value) {
            setDelayedValue(value);
            return;
        }
        const timer = setTimeout(() => {
            setDelayedValue(value);
        }, delay)

        return () => clearTimeout(timer);
    }, [value, delay]);

    return delayedValue;
}