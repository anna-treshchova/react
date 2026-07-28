import { ERROR_CODES, ERROR_TO_HTTP_STATUS } from './error.constants.js';

export const errorHandler = (err, req, res, next) => {
    const reqLine = `[${req.method} ${req.originalUrl}]`;
    const reqContext = err.context ? ` | Context: ${JSON.stringify(err.context)}`: '';

    const statusCode = err.isOperational
        ? ERROR_TO_HTTP_STATUS[err.code] || 400
        : 500;

    if (err.isOperational) {
        console.warn(`[${err.code}] ${reqLine}${reqContext}: ${err.message}`);

        return res.status(statusCode).json({
            errorCode: err.code,
           ...(err.details ?? {})
        })
    }

    console.error(`[${ERROR_CODES.system.INTERNAL_SERVER_ERROR.code}] ${reqLine}${reqContext}:`, err);
    res.status(statusCode).json({ errorCode: ERROR_CODES.system.INTERNAL_SERVER_ERROR.code });
}