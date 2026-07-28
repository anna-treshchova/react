import { APP_ERRORS } from './constants.js';

export const errorHandler = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.status).json({
            errorCode: err.code,
           ...(err.details ? { details: err.details } : {})
        })
    }

    const reqLine = `[${req.method} ${req.originalUrl}]`
    const reqContext = err.context ? ` Context: ${JSON.stringify(err.context)}`: '';

    console.error(`[SERVER_ERROR] ${reqLine}${reqContext}: `, err);
    res.status(500).json({ errorCode: 'SERVER_ERROR' });
}