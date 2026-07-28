export const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error(`Error saving ${key} to localStorage:`, err);
    }
}

export const removeFromStorage = (keys) => {
    try {
        const keysArray = [].concat(keys);

        keysArray.forEach(key => {
            localStorage.removeItem(key);
        })

    } catch (err) {
        console.error(`Error removing keys ${JSON.stringify(keys)} from localStorage:`, err);
    }
}

export const loadFromStorage = (key) => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : null;
    } catch (err) {
        console.error(`Error reading/parsing ${key} from localStorage:`, err);
        removeFromStorage(key)
        return null;
    }
}

export const updateStorageField = (key, field, newValue) => {
    const data = loadFromStorage(key);

    if (!data) {
        console.log(`Update failed: no data found for key ${key} in localStorage`);
        return
    }

    const updatedData = {
        ...data,
        [field]: newValue,
    }

    saveToStorage(key, updatedData);
}