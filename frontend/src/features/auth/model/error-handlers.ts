import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { isRecord } from '@/shared/lib/type-guards';

import { isFetchError, getFetchErrorCode } from '../lib';
import { ERROR_CODES, type ErrorCode } from '../constants';

export interface SendCodeErrorData {
    errorCode: string
    verification: {
        email: string;
        expiresInMs: number;
    }
    retryAfterMs: number;
}

export type VerifyCodeErrorData = {
    errorCode: string;
}

type RejectedErrorType =
    | typeof ERROR_CODES.DEFAULT
    | ReturnType<typeof getFetchErrorCode>

type RejectedErrorResult<T> =
    | { success: true; data: T }
    | { success: false; error: RejectedErrorType };

export const isSendCodeErrorData = (data: unknown): data is SendCodeErrorData => {
    if (!isRecord(data)) return false;

    const isValidErrorCode = typeof data.errorCode === 'string';

    const isValidRetryAfterMs =
        typeof data.retryAfterMs === 'number' &&
        Number.isFinite(data.retryAfterMs);

    const isValidVerification =
        isRecord(data.verification) &&
        typeof data.verification.email === 'string' &&
        typeof data.verification.expiresInMs === 'number' &&
        Number.isFinite(data.verification.expiresInMs);

    return isValidErrorCode && isValidRetryAfterMs && isValidVerification;
}

export const isVerifyCodeErrorData = (data: unknown): data is VerifyCodeErrorData => {
    if (!isRecord(data)) return false;
    return typeof data.errorCode === 'string';
}

export const normalizeRejectedError = <T>(
    payload: FetchBaseQueryError | undefined,
    predicate: (data: unknown) => data is T,
): RejectedErrorResult<T> => {
    if (!payload) {
        return { success: false, error: ERROR_CODES.DEFAULT };
    }

    const { status } = payload;

    if (isFetchError(status)) {
        return { success: false, error: getFetchErrorCode() };
    }

    if (typeof status !== 'number' || !predicate(payload.data)) {
        return { success: false, error: ERROR_CODES.DEFAULT };
    }

    return { success: true, data: payload.data };
}

const isValidErrorCode = (errorCode: string): errorCode is ErrorCode => {
    return  Object.values(ERROR_CODES).some(value => value === errorCode)
}

export const normalizeErrorCode = <T extends Record<string, ErrorCode>>(
    errorCode: string,
    serverErrorMap: T
): ErrorCode => {
    if (Object.hasOwn(serverErrorMap, errorCode)) {
        return serverErrorMap[errorCode as keyof T]
    }
    return isValidErrorCode(errorCode) ? errorCode : ERROR_CODES.DEFAULT;
}