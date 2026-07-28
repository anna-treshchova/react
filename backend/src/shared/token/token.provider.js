import jwt from 'jsonwebtoken';
import { ERROR_CODES } from '../errors/index.js';
const { token: TOKEN_ERRORS } = ERROR_CODES.auth;

export const generateAccessToken = (payload = {}) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
            algorithm: 'HS256'
        }
    );
}

export const verifyAccessToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return { payload, errorCode: null };
    } catch (jwtErr) {
        const errorConfig = jwtErr.name === 'TokenExpiredError'
            ? TOKEN_ERRORS.TOKEN_EXPIRED
            : TOKEN_ERRORS.INVALID_TOKEN

        return { payload: null, errorConfig };
    }
}