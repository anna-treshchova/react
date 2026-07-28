import { PATHS } from '#config/paths.js';
import { readJSONSync, writeJSON } from '#utils/db.js';

let verificationsCache = readJSONSync(PATHS.data.verifications) || [];
let blacklistedTokensCache = readJSONSync(PATHS.data.blacklistedTokens) || [];

export const findVerification = async (email) => {
    return verificationsCache.find(v => v.email === email) || null;
}

export const createVerification = async (email, { code, expiresAt }) => {
    const nowISO = new Date().toISOString();

    verificationsCache = verificationsCache.filter(
        v => v.email !== email && v.expiresAt > nowISO
    );

    const newRecord = {
        email,
        code,
        attempts: 0,
        createdAt: nowISO,
        expiresAt,
    }

    verificationsCache.push(newRecord);
    await writeJSON(PATHS.data.verifications, verificationsCache);

    return newRecord;
}

export const incrementVerificationAttempts = async (record) => {
    record.attempts++;
    await writeJSON(PATHS.data.verifications, verificationsCache);
    return record.attempts;
}

export const deleteVerification = async (email) => {
    verificationsCache = verificationsCache.filter(v => v.email !== email);
    await writeJSON(PATHS.data.verifications, verificationsCache);
}

export const findBlacklistedToken = async (token) => {
    return blacklistedTokensCache.find(item => item.token === token);
}

export const createBlacklistedToken = async (token, expiresAtMs) => {
    const nowISO = new Date().toISOString();

    blacklistedTokensCache = blacklistedTokensCache.filter(v => v.expiresAt > nowISO);

    const newBlacklistedToken = {
        token,
        expiresAt: new Date(expiresAtMs).toISOString()
    }

    blacklistedTokensCache.push(newBlacklistedToken);

    await writeJSON(PATHS.data.blacklistedTokens, blacklistedTokensCache);
}



