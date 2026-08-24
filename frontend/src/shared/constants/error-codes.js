export const GLOBAL_ERROR_CODES = {
    SESSION_LOST: "SESSION_LOST",
    NETWORK_ERROR: "NETWORK_ERROR",
    SERVER_UNREACHABLE: "SERVER_UNREACHABLE",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    CRITICAL_DATA_CORRUPTED: "CRITICAL_DATA_CORRUPTED",
    DEFAULT: "UNSPECIFIED_ERROR",
}

export const GLOBAL_ERROR_MESSAGES = {
    [GLOBAL_ERROR_CODES.SESSION_LOST]: "Session is no longer active. Please start over.",
    [GLOBAL_ERROR_CODES.NETWORK_ERROR]: "Check your connection and try again.",
    [GLOBAL_ERROR_CODES.SERVER_UNREACHABLE]: "Something went wrong on our end. Try later.",
    [GLOBAL_ERROR_CODES.FORBIDDEN]: "Looks like you don't have permission to view this page.",
    [GLOBAL_ERROR_CODES.NOT_FOUND]: "The requested resource could not be found.",
    [GLOBAL_ERROR_CODES.CRITICAL_DATA_CORRUPTED]: "We're having trouble loading this page right now. A quick refresh might help!",
    [GLOBAL_ERROR_CODES.DEFAULT]: "Something went wrong. Please try again."
}
