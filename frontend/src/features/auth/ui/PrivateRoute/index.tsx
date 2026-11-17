import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

import { transformToErrorResponse } from '@/shared/lib/error-response';
import { isRecord } from '@/shared/lib/type-guards';

import { useFetchMeQuery } from '@/entities/user';

import { selectHasToken } from '../../model';

interface NetworkError {
    status: 'FETCH_ERROR';
}

const isFetchError = (
    error: unknown
): error is NetworkError => {
    return isRecord(error) && error.status === 'FETCH_ERROR';
}

const isServerError = (
    error: unknown
): error is { status: number } => {
    return (
        isRecord(error) &&
        typeof error.status === 'number' &&
        error.status >= 500 &&
        error.status < 600
    );
}

export const PrivateRoute = () => {
    const hasToken = useSelector(selectHasToken);

    const {
        currentData: { me } = {},
        isLoading,
        isError,
        error
    } = useFetchMeQuery(undefined, { skip: !hasToken });

    if (hasToken && isLoading) return null;

    if (isError) {
        const isNetworkOrServerError = isFetchError(error) || isServerError(error);

        if (isNetworkOrServerError) {
            throw transformToErrorResponse(error);
        }

        return (
            <Navigate
                to='/'
                replace
                state={{
                    openAuthModal: true,
                    disableHeaderTransitions: true
                }}
            />
        )
    }

    if (!me) {
        return (
            <Navigate
                to='/'
                replace
                state={{
                    openAuthModal: true,
                    disableHeaderTransitions: true
                }}
            />
        )
    }

    return <Outlet />
}