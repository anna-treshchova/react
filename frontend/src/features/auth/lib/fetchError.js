import { ERROR_CODES } from '../constants';

export const isFetchError = (status) => status === 'FETCH_ERROR';

export const getFetchErrorCode = () => {
    return !window.navigator.onLine
        ? ERROR_CODES.NETWORK_ERROR
        : ERROR_CODES.SERVER_UNREACHABLE;
}