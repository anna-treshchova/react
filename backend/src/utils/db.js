import fs from 'fs/promises';

export const readJSON = async (filePath, key = null) => {
    try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(fileData);
        return key ? db[key] : db;
    } catch(err) {
        if (err.code === 'ENOENT') {
            return null;
        }
        throw err;
    }
}

export const writeJSON = (filePath, data, key = null) => {
    const structuredData = key ? { [key]: data } : data;
    const jsonData = JSON.stringify(structuredData,  null, 2);

    return fs.writeFile(filePath, jsonData, 'utf-8');
}

