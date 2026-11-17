import { GLOBAL_ERROR_CODES, GLOBAL_ERROR_MESSAGES } from '@/shared/constants/error-codes';

export const AUTH_ERROR_CODES = {
    EMAIL_REQUIRED: 'EMAIL_REQUIRED',
    INVALID_EMAIL: 'INVALID_EMAIL',
    CODE_SEND_FAILED: 'CODE_SEND_FAILED',

    CODE_RESEND_DELAY: 'CODE_RESEND_DELAY',
    INVALID_CODE: 'INVALID_CODE',
    TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS',
    CODE_EXPIRED: 'CODE_EXPIRED',
    CODE_VERIFICATION_FAILED: 'CODE_VERIFICATION_FAILED',

    MISSING_FIELDS: 'MISSING_FIELDS',
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
} as const;

export const ERROR_CODES = {
    ...GLOBAL_ERROR_CODES,
    ...AUTH_ERROR_CODES,
} as const;

export type ErrorCode = typeof ERROR_CODES [keyof typeof ERROR_CODES];

export const ALLOWED_ERRORS_BY_STEP = {
    EMAIL: [
        ERROR_CODES.EMAIL_REQUIRED,
        ERROR_CODES.INVALID_EMAIL,
        ERROR_CODES.CODE_SEND_FAILED,
        ERROR_CODES.SESSION_LOST,
        ERROR_CODES.NETWORK_ERROR,
        ERROR_CODES.SERVER_UNREACHABLE,
        ERROR_CODES.DEFAULT
    ],
    CODE: [
        ERROR_CODES.CODE_RESEND_DELAY,
        ERROR_CODES.INVALID_CODE,
        ERROR_CODES.TOO_MANY_ATTEMPTS,
        ERROR_CODES.CODE_EXPIRED,
        ERROR_CODES.CODE_VERIFICATION_FAILED,

        ERROR_CODES.NETWORK_ERROR,
        ERROR_CODES.SERVER_UNREACHABLE,
        ERROR_CODES.DEFAULT
    ]
} as const;

export const AUTH_ERROR_MESSAGES = {
    [ERROR_CODES.EMAIL_REQUIRED]: 'Please enter your email address.',
    [ERROR_CODES.INVALID_EMAIL]: 'Please enter a valid email address.',
    [ERROR_CODES.SESSION_LOST]: 'Session is no longer active. Please start over.',
    [ERROR_CODES.CODE_SEND_FAILED]: 'Unable to send code. Please try again.',

    [ERROR_CODES.CODE_RESEND_DELAY]: 'Please wait 1 minute to request another code.',
    [ERROR_CODES.INVALID_CODE]: 'Incorrect code. Please check and try again.',
    [ERROR_CODES.TOO_MANY_ATTEMPTS]: 'Too many attempts. Request a new code.',
    [ERROR_CODES.CODE_EXPIRED]: 'This code has expired. Request a new one.',
    [ERROR_CODES.CODE_VERIFICATION_FAILED]: 'Verification failed. Please try again later.',

    [ERROR_CODES.NETWORK_ERROR]: 'Check your connection and try again.',
    [ERROR_CODES.SERVER_UNREACHABLE]: 'Something went wrong on our end. Try later.',
    [ERROR_CODES.DEFAULT]: 'Something went wrong. Please try again.',
} as const;

export const ERROR_MESSAGES = {
    ...GLOBAL_ERROR_MESSAGES,
    ...AUTH_ERROR_MESSAGES,
} as const;

export type ErrorMessageCode = keyof typeof ERROR_MESSAGES;

export const isErrorMessageCode = (
    error: ErrorCode
): error is ErrorMessageCode => error in ERROR_MESSAGES;

export const SERVER_TO_SEND_CODE_ERROR_MAP = {
    INTERNAL_SERVER_ERROR: ERROR_CODES.CODE_SEND_FAILED,
} as const;

export const SERVER_TO_VERIFY_CODE_ERROR_MAP = {
    MISSING_FIELDS: ERROR_CODES.SESSION_LOST,
    RESOURCE_NOT_FOUND: ERROR_CODES.SESSION_LOST,
    INTERNAL_SERVER_ERROR: ERROR_CODES.CODE_VERIFICATION_FAILED,
} as const;