import { isRecord } from './type-guards';

export const saveToStorage = (key: string, value: unknown) => {
    if (typeof window === 'undefined') return;

    try {
        const serializedValue = JSON.stringify(value);

        if (serializedValue !== undefined) {
            localStorage.setItem(key, serializedValue);
        }
    } catch (err) {
        console.error(`Error saving ${key} to localStorage:`, err);
    }
}

export const removeFromStorage = (keys: string | string[]) => {
    if (typeof window === 'undefined') return;

    try {
        const keysArray = Array.isArray(keys) ? keys : [keys];

        keysArray.forEach(key => {
            localStorage.removeItem(key);
        })

    } catch (err) {
        console.error(`Error removing keys ${JSON.stringify(keys)} from localStorage:`, err);
    }
}

export const loadFromStorage = <T = unknown>(key: string): T | null => {
    if (typeof window === 'undefined') return null;

    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : null;
    } catch (err) {
        console.error(`Error reading/parsing ${key} from localStorage:`, err);
        removeFromStorage(key)
        return null;
    }
}

export const updateStorageField = (key: string, field: string, newValue: unknown) => {
    const data = loadFromStorage(key);

    if (!isRecord(data)) {
        console.log(`Update failed: no valid object found for key ${key} in localStorage`);
        return;
    }

    const updatedData = {
        ...data,
        [field]: newValue,
    }

    saveToStorage(key, updatedData);
}