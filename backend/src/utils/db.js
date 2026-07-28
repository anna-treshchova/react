import fs from 'fs';

export const readJSONSync = (filePath) => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');

        if (!fileData || fileData.trim() === '') {
            return [];
        }

        return JSON.parse(fileData);
    } catch(err) {
        if (err.code === 'ENOENT') {
            return null;
        }
        console.error(`[FATAL STARTUP ERROR] Database file ${filePath} is corrupted or inaccessible!`, err)
        throw err;
    }
}

export const writeJSON = async (filePath, data) => {
    let jsonData;

    try {
        jsonData = JSON.stringify(data,  null, 2);
        await fs.promises.writeFile(filePath, jsonData, 'utf-8')

    } catch(err) {
        err.context = {
            ...err.context,
            filePath,
            operation: jsonData ? 'fs.promises.writeFile' : 'JSON.stringify'
        }

        throw err;
    }
}

