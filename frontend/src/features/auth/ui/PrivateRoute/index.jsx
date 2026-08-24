import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

import { transformToErrorResponse } from '@/shared/lib/error-response';

import { useFetchMeQuery } from '@/entities/user';

import { selectHasToken } from '../../model';

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
        const isSystemError = error?.status === 'FETCH_ERROR' || error?.status >= 500;

        if (isSystemError) {
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