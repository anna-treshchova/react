export const ERROR_CODES = {
    system: {
        INTERNAL_SERVER_ERROR: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Unhandled server exception or runtime crash.',
        },
        BAD_REQUEST: {
            code: 'BAD_REQUEST',
            message: 'Invalid or malformed request parameters.',
        },
        RESOURCE_NOT_FOUND: {
            code: 'RESOURCE_NOT_FOUND',
            message: 'The requested resource does not exist in the database.',
        }
    },
    auth: {
        request: {
            EMAIL_REQUIRED: {
                code: 'EMAIL_REQUIRED',
                message: 'Validation failed: email field is missing in the request body.'
            },
            INVALID_EMAIL: {
                code: 'INVALID_EMAIL',
                message: 'Validation failed: the provided email format is invalid.'
            },
            CODE_RESEND_DELAY: {
                code: 'CODE_RESEND_DELAY',
                message: 'Resend blocked: verification code resend delay is still active.'
            },
        },
        verify: {
            MISSING_FIELDS: {
                code: 'MISSING_FIELDS',
                message: 'Verification payload is incomplete: email or code is missing.'
            },
            CODE_EXPIRED: {
                code: 'CODE_EXPIRED',
                message: 'Verification failed: the verification session lifetime exceeded expiredAt timestamp.'
            },
            TOO_MANY_ATTEMPTS: {
                code:'TOO_MANY_ATTEMPTS',
                message: 'Verification blocked: maximum allowed code verification attempts exceeded.'
            },

            INVALID_CODE: {
                code: 'INVALID_CODE',
                message: 'Verification failed: provided verification code is incorrect.'
            },
        },
        token: {
            NO_TOKEN_PROVIDED: {
                code: 'NO_TOKEN_PROVIDED',
                message: 'Authentication rejected: access token is missing in the request header.'
            },
            INVALID_TOKEN: {
                code: 'INVALID_TOKEN',
                message: 'Authentication rejected: token signature verification failed or token is malformed.'
            },
            TOKEN_EXPIRED: {
                code: 'TOKEN_EXPIRED',
                message: 'Authentication rejected: token expiration time (exp) has been reached.'
            },
            TOKEN_BLACKLISTED: {
                code: 'TOKEN_BLACKLISTED',
                message: 'Authentication rejected: token has been blacklisted.'
            },
        },
    },
    users: {
        USER_NOT_FOUND: {
            code: 'USER_NOT_FOUND',
            message: 'User not found: the requested user does not exist in the database.'
        }
    }
}

export const ERROR_TO_HTTP_STATUS = {
    [ERROR_CODES.auth.request.CODE_RESEND_DELAY.code]: 429,
    [ERROR_CODES.auth.token.NO_TOKEN_PROVIDED.code]: 401,
    [ERROR_CODES.auth.token.TOKEN_EXPIRED.code]: 401,
    [ERROR_CODES.auth.token.INVALID_TOKEN.code]: 401,
    [ERROR_CODES.auth.token.TOKEN_BLACKLISTED.code]: 401,
    [ERROR_CODES.users.USER_NOT_FOUND.code]: 401,
    [ERROR_CODES.system.RESOURCE_NOT_FOUND.code]: 404,
}
