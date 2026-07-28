import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CODE_LENGTH, STEPS, ERROR_CODES } from '../../constants';

import {
    useVerifyCodeMutation,
    setError,
    useAuthStore,
    selectVerification,
    selectCanResendAt,
    selectAuthError,
    selectAuthStep,
    selectCodeValue,
    selectAuthActions
} from '../../model';

import { useLayoutStore, selectLayoutActions } from '@/shared/model';

import { useSendCodeMutation } from '../../model';

export const useCodeStep = () => {
    const dispatch = useDispatch();

    const canResendAt = useSelector(selectCanResendAt);
    const error = useSelector(selectAuthError);
    const verification = useSelector(selectVerification);

    const { email, expiresAt, isAttemptsExceeded } = verification || {};

    const inputRef = useRef(null);
    const errorRef = useRef(error);

    const [sendCode, { isLoading: isSendCodeLoading }] = useSendCodeMutation();
    const [verifyCode, { isLoading: isVerifyCodeLoading }] = useVerifyCodeMutation();

    const codeValue = useAuthStore(selectCodeValue);
    const step = useAuthStore(selectAuthStep);
    const {
        setCodeValue,
        setSuccessAlertVisible,
        reset
    } = useAuthStore(selectAuthActions);

    const { closeAuthModal } = useLayoutStore(selectLayoutActions);

    const [isThrottled, setIsThrottled] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        errorRef.current = error;
    }, [error]);

    useEffect(() => {
        if (!canResendAt) {
            setIsThrottled(false);
            return;
        }

        const timeLeft = canResendAt - Date.now();

        if (timeLeft <= 0) {
            setIsThrottled(false);
            return;
        }

        setIsThrottled(true);

        const timer = setTimeout(() => {
            if (errorRef.current === ERROR_CODES.CODE_RESEND_DELAY) {
                dispatch(setError(null));
            }
            setIsThrottled(false);
        }, timeLeft);

        return () => clearTimeout(timer)
    }, [canResendAt, dispatch]);

    useEffect(() => {
        if (!expiresAt) {
            setIsExpired(false);
            return;
        }

        const timeLeft = expiresAt - Date.now();

        if (timeLeft <= 0) {
            setIsExpired(true);

            if (errorRef.current !== ERROR_CODES.CODE_EXPIRED) {
                dispatch(setError(ERROR_CODES.CODE_EXPIRED));
            }

            return;
        }

        setIsExpired(false);

        const timer = setTimeout(() => {
            setIsExpired(true);
            dispatch(setError(ERROR_CODES.CODE_EXPIRED));
        }, timeLeft);

        return () => clearTimeout(timer);
    }, [expiresAt, dispatch]);

    useEffect(() => {
        if (step === STEPS.CODE && inputRef.current) {
            const timer = setTimeout(() => {
                inputRef.current.focus({ preventScroll: true });
            }, 50)

            return () => clearTimeout(timer);
        }
    }, [step])

    const handleResend = async () => {
        if (isThrottled) {
            dispatch(setError(ERROR_CODES.CODE_RESEND_DELAY));
            return;
        }

        try {
            await sendCode(email).unwrap();
            setSuccessAlertVisible(true);
        } catch {
            // Handled globally / via Redux slice
        }
    };

    const handleVerifyCode = async (code) => {
        if (isExpired) {
            dispatch(setError(ERROR_CODES.CODE_EXPIRED));
            return;
        }
        if (isAttemptsExceeded) {
            dispatch(setError(ERROR_CODES.TOO_MANY_ATTEMPTS));
            return;
        }

        if (code?.length !== CODE_LENGTH) {
            dispatch(setError(ERROR_CODES.INVALID_CODE));
            return;
        }

        try {
            await verifyCode({ email, code }).unwrap();
            reset()
            closeAuthModal();
        } catch {
            // Handled globally / via Redux slice
        }
    }

    const isLoading = isSendCodeLoading || isVerifyCodeLoading;
    const isInputDisabled = isLoading || isExpired || isAttemptsExceeded;
    const isContinueBlocked = codeValue.length < CODE_LENGTH || isExpired || isAttemptsExceeded;

    return {
        state: {
            email,
            codeValue,
            isThrottled,
            isInputDisabled,
            isContinueBlocked,
            isLoading
        },
        actions: {
            setCodeValue,
            handleResend,
            handleVerifyCode
        },
        refs: { inputRef }
    }
};