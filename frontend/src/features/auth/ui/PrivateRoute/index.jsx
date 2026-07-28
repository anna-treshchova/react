import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

import { useLayoutStore, selectLayoutActions } from '@/shared/model';
import { transformToResponseError } from '@/shared/lib/router';

import { useFetchMeQuery } from '@/entities/user';

import { selectHasToken } from '../../model';

export const PrivateRoute = () => {
    const hasToken = useSelector(selectHasToken);

    const { setHeaderTransitions } = useLayoutStore(selectLayoutActions);

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
            throw transformToResponseError(error);
        }

        setHeaderTransitions(false);
        return <Navigate to='/' replace  state={{ openAuthModal: true }} />
    }

    if (!me) {
        setHeaderTransitions(false);
        return <Navigate to='/' replace  state={{ openAuthModal: true }} />
    }

    return <Outlet />
}