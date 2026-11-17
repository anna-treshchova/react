import {
    GLOBAL_ERROR_CODES,
    GLOBAL_ERROR_MESSAGES,
    type GlobalErrorCode
} from '../constants/error-codes';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const NON_HTTP_ERROR_STATUSES = [
    'FETCH_ERROR',
    'PARSING_ERROR',
    'TIMEOUT_ERROR',
    'CUSTOM_ERROR',
] as const;

const isFetchBaseQueryError = (
    err: unknown
): err is FetchBaseQueryError => {
    if (typeof err !== 'object' || err === null || !('status' in err)) {
        return false;
    }

    return (
        typeof err.status === 'number' ||
        (typeof err.status === 'string' &&
            NON_HTTP_ERROR_STATUSES.some(item => item === err.status))
    );
}

const hasValidErrorCode = (
    data: unknown
): data is { errorCode: GlobalErrorCode } => {
    return (
        typeof data === 'object' &&
        data !== null &&
        'errorCode' in data &&
        typeof data.errorCode === 'string' &&
        Object.hasOwn(GLOBAL_ERROR_MESSAGES, data.errorCode)
    );
}

export const transformToErrorResponse = (err: unknown): Response => {
    console.error('Critical data fetching failed:', err);

    if (!isFetchBaseQueryError(err)) {
        return new Response(
            GLOBAL_ERROR_MESSAGES[GLOBAL_ERROR_CODES.DEFAULT],
            { status: 500 }
        )
    }

    const isFetchError = err.status === 'FETCH_ERROR';

    if(isFetchError) {
        const errorCode = window.navigator.onLine
            ? GLOBAL_ERROR_CODES.SERVER_UNREACHABLE
            : GLOBAL_ERROR_CODES.NETWORK_ERROR;

        const errorMessage = GLOBAL_ERROR_MESSAGES[errorCode]
            || GLOBAL_ERROR_MESSAGES[GLOBAL_ERROR_CODES.DEFAULT];

       return new Response(errorMessage, { status: 503 });
    }

    const status = typeof err.status === 'number' ? err.status : 500;

    let errorCode: GlobalErrorCode;

    if (hasValidErrorCode(err.data)) {
        errorCode = err.data.errorCode;
    } else {
        if (status === 404) errorCode = GLOBAL_ERROR_CODES.NOT_FOUND;
        else if (status === 403) errorCode = GLOBAL_ERROR_CODES.FORBIDDEN;
        else errorCode = GLOBAL_ERROR_CODES.DEFAULT;
    }

    const errorMessage = GLOBAL_ERROR_MESSAGES[errorCode];

    return new Response(errorMessage, { status })
}