import { GLOBAL_ERROR_CODES, GLOBAL_ERROR_MESSAGES } from '../constants/error-codes';

export const transformToErrorResponse = (err) => {
    console.error('Critical data fetching failed:', err);

    const isFetchError = err?.status === 'FETCH_ERROR';

    if(isFetchError) {
        const errorCode = window.navigator.onLine
            ? GLOBAL_ERROR_CODES.SERVER_UNREACHABLE
            : GLOBAL_ERROR_CODES.NETWORK_ERROR;

        const errorMessage = GLOBAL_ERROR_MESSAGES[errorCode]
            || GLOBAL_ERROR_MESSAGES[GLOBAL_ERROR_CODES.DEFAULT];

       return new Response(errorMessage, { status: 503 });
    }

    const status = err?.status || 500;
    let errorCode = err?.data?.errorCode;

    if (!errorCode) {
        if (status === 404) errorCode = GLOBAL_ERROR_CODES.NOT_FOUND;
        else if (status === 403) errorCode = GLOBAL_ERROR_CODES.FORBIDDEN;
        else errorCode = GLOBAL_ERROR_CODES.DEFAULT;
    }
    const errorMessage = GLOBAL_ERROR_MESSAGES[errorCode];

    return new Response(errorMessage, { status })
}