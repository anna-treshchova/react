import { promises as fs } from 'fs';

export async function readJSON(filePath, key = null) {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const db = JSON.parse(fileData);
    return key ? db[key] : db;
}