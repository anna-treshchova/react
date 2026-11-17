import { ErrorCode } from '../constants';

export interface VerificationState {
    email: string;
    expiresAt: number;
    isAttemptsExceeded: boolean;
}

export interface AuthState {
    verification: VerificationState | null;
    canResendAt: number;
    accessToken: string | null;
    error: ErrorCode | null;
}