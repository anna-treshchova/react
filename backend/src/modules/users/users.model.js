import { v4 as uuidv4 } from 'uuid';
import { PATHS } from '#config/paths.js';
import { readJSONSync, writeJSON } from '#utils/db.js';

const usersCache = readJSONSync(PATHS.data.users) || [];

export const findUserById = async (id) => {
    return usersCache.find(u => u.id === id) || null;
}

export const findUserByEmail = async (email) => {
    return usersCache.find(u => u.email === email) || null;
}

export const createUser = async (email) => {
    const newUser = {
        id: `user_${uuidv4()}`,
        email,
        name: null,
        role: 'user',
        createdAt: new Date().toISOString(),
    }
    usersCache.push(newUser);

    await writeJSON(PATHS.data.users, usersCache);

    return newUser;
}
