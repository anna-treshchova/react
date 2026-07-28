export const APP_ERRORS = {
    system: {
        INTERNAL_SERVER_ERROR: {
            code: 'INTERNAL_SERVER_ERROR',
            message: '',
        },
        BAD_REQUEST: {
            code: 'BAD_REQUEST',
            message: '',
        },
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
            VERIFICATION_NOT_FOUND: {
                code:'VERIFICATION_NOT_FOUND',
                message: 'Verification failed: no active verification session found for this email.'
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
        },
        logout: {
            LOGOUT_FAILED: {
                code: 'LOGOUT_FAILED',
                message: 'Logout failed: unable to blacklist access token during logout operation.'
            },
        }
    }
}
