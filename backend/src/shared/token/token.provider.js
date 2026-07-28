import jwt from 'jsonwebtoken';
import { ERROR_CODES } from '#shared/constants/errors.js';

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
        return { payload };
    } catch (jwtErr) {

        const errorCode = jwtErr.name === 'TokenExpiredError'
            ? ERROR_CODES.auth.token.TOKEN_EXPIRED
            : ERROR_CODES.auth.token.INVALID_TOKEN

        return { errorCode };
    }
}