import type { UnknownAction } from '@reduxjs/toolkit';
import { isRecord } from '@/shared/lib/type-guards';

type UnauthorizedAction = UnknownAction & {
    payload: {
        status: 401;
    };
    meta: {
        requestStatus: 'rejected'
    }
}

type LogoutAction = UnknownAction & {
    meta: {
        requestStatus: 'fulfilled' | 'rejected';
        arg: {
            endpointName: 'logout',
        };
    }
}

type AuthResetAction = UnauthorizedAction | LogoutAction;

export const isAuthResetAction = (
    action: UnknownAction
): action is AuthResetAction => {
    const meta = action.meta;

    if (!isRecord(meta)) return false;

    const isUnauthorised =
        meta.requestStatus === 'rejected' &&
        isRecord(action.payload) &&
        action.payload.status === 401;

    const isLogoutAction =
        (meta.requestStatus === 'fulfilled' ||  meta.requestStatus === 'rejected') &&
        isRecord(meta.arg) &&
        meta.arg.endpointName === 'logout';

    return isUnauthorised || isLogoutAction;
}