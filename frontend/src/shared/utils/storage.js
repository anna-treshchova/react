export const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.log('Error saving data to localStorage:', err);
    }
}

export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.log('Error removing data from localStorage:', err);
    }
}

export const loadFromStorage = (key) => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : null;
    } catch (err) {
        console.log('Error reading/parsing localStorage:', err);

        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.log('Error removing localStorage data:', err);
        }
        return null;
    }
}

export const updateStorageField = (key, field, newValue) => {
    try{
        const data = loadFromStorage(key);

        if (!data) {
            console.log(`Update failed: no data found for ${key}`);
            return
        }

        const updatedData = {
            ...data,
            [field]: newValue,
        }

        saveToStorage(key, updatedData);
    } catch (err) {
        console.log('Error updating field in localStorage:', err);
    }
}