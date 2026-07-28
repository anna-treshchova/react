import { AppError, ERROR_CODES } from '#shared/errors/index.js';
import { authenticateToken } from '#modules/auth/auth.service.js';

const { token: TOKEN_ERRORS } = ERROR_CODES.auth;

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new AppError(TOKEN_ERRORS.NO_TOKEN_PROVIDED));
        }

        const token = authHeader.split(' ')[1];

        const user = await authenticateToken(token);

        if (!user?.id || !user?.role) {
            return next(new AppError(TOKEN_ERRORS.INVALID_TOKEN));
        }

        req.user = user;
        req.token = token;

        next();
    } catch (err) {
        next(err);
    }
}
