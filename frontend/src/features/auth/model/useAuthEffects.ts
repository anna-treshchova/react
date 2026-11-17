import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AUTH_STEPS, ERROR_CODES, type ErrorCode } from '../constants';

import { setError } from './authSlice';
import { useAuthStore } from './useAuthStore';
import {
    selectHasToken,
    selectVerificationEmail,
    selectAuthError
} from './authSlice.selectors';

import {
    selectAuthStep,
    selectEmailValue,
    selectCodeValue,
    selectIsSuccessAlertVisible,
    selectAuthActions,
} from './authStore.selectors';

export const useAuthEffects = () => {
    const dispatch = useDispatch();

    const email = useSelector(selectVerificationEmail);
    const error = useSelector(selectAuthError);
    const hasToken = useSelector(selectHasToken)

    const step = useAuthStore(selectAuthStep);
    const emailValue = useAuthStore(selectEmailValue);
    const codeValue = useAuthStore(selectCodeValue);
    const isSuccessAlertVisible = useAuthStore(selectIsSuccessAlertVisible);

    const {
        setErrorAlertVisible,
        setSuccessAlertVisible,
        goToEmail,
        goToCode
    } = useAuthStore(selectAuthActions);

    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const prevStepRef = useRef(step);
    const hasTokenRef = useRef(hasToken)

    useEffect(() => {
        hasTokenRef.current = hasToken
    }, [hasToken]);

    useEffect(() => {
        const shouldEjectToEmail =
            !hasTokenRef.current &&
            step === AUTH_STEPS.CODE &&
            (!email || error === ERROR_CODES.SESSION_LOST);

        const shouldEjectToCode =
            step === AUTH_STEPS.EMAIL &&
            error === ERROR_CODES.CODE_RESEND_DELAY &&
            email &&
            prevStepRef.current !== AUTH_STEPS.CODE;

        const syncErrorWithDelay = (code: ErrorCode) => {
            clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                dispatch(setError(code));
                timerRef.current = undefined;
            }, 0)
        }

        if(shouldEjectToEmail) {
            goToEmail()
            syncErrorWithDelay(ERROR_CODES.SESSION_LOST)
        }

        if (shouldEjectToCode) {
            goToCode()
            syncErrorWithDelay(ERROR_CODES.CODE_RESEND_DELAY)
        }

        prevStepRef.current = step;
    }, [step, email, error,  goToEmail, goToCode, dispatch])

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    useEffect(() => {
        dispatch(setError(null));
    }, [step, dispatch]);

    useEffect(() => {
        dispatch(setError(null));
    }, [emailValue, codeValue, dispatch]);

    useEffect(() => {
        if (error && isSuccessAlertVisible) {
            setSuccessAlertVisible(false);
        }

        setErrorAlertVisible(!!error);

    }, [error, isSuccessAlertVisible, setErrorAlertVisible, setSuccessAlertVisible]);

    useEffect(() => {
        if (isSuccessAlertVisible) {
            const timer = setTimeout(() => {
                setSuccessAlertVisible(false);
            }, 2500)

            return () => clearTimeout(timer)
        }
    }, [isSuccessAlertVisible, setSuccessAlertVisible]);
}