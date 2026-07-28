import { AppError, ERROR_CODES } from '#shared/errors/index.js';
import { authenticateToken } from './auth.service.js';

const { token: TOKEN_ERRORS } = ERROR_CODES.auth;

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new AppError(TOKEN_ERRORS.NO_TOKEN_PROVIDED));
        }

        const token = authHeader.split(' ')[1];

        const payload = await authenticateToken(token) || {};

        if (!payload?.id || !payload?.role) {
            return next(new AppError(TOKEN_ERRORS.INVALID_TOKEN));
        }

        req.user = payload;
        req.token = token;

        next();
    } catch (err) {
        next(err);
    }
}


export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }

        const token = authHeader.split(' ')[1];

        const payload = await authenticateToken(token) || {};

        if (!payload?.id || !payload?.role) {
            const { code, message } = TOKEN_ERRORS.INVALID_TOKEN;

            console.warn(`[OPTIONAL_AUTH] ${code}: ${message}`);
            return next();
        }

        req.user = payload;
        req.token = token;

        next();
    } catch (err) {
        console.warn(`[OPTIONAL_AUTH] ${err.code}: ${err.message}`);
        next();
    }
}
