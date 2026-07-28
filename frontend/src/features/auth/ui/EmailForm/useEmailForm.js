import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useDelayedValue } from '@/shared/hooks/useDelayExit.js';

import {
    useSendCodeMutation,
    useAuthStore,
    selectVerification,
    selectCanResendAt,
    selectEmailValue,
    selectEmailValidationError,
    selectAuthActions,
} from '../../model'

import { validateEmail } from '../../lib';
import { ERROR_CODES } from '../../constants';

export const useEmailForm = () => {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [sendCode, { isLoading }] = useSendCodeMutation();

    const verification = useSelector(selectVerification);
    const canResendAt = useSelector(selectCanResendAt);

    const emailValue = useAuthStore(selectEmailValue);
    const emailValidationError = useAuthStore(selectEmailValidationError);

    const {
        setEmailValue,
        setEmailValidationError,
        goToCode
    } = useAuthStore(selectAuthActions);

    const isUiLoading = useDelayedValue(isLoading, 400)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, email: validatedEmail } = validateEmail(emailValue);

        if (error) {
            setEmailValidationError(error);
            return;
        }

        const isSameEmail = validatedEmail === verification?.email;
        const isThrottled = Date.now() < canResendAt;

        if (isSameEmail && isThrottled) {
            goToCode();
            return;
        }

        try {
            await sendCode(emailValue).unwrap();
            goToCode()
        } catch (err) {
            if (err.data?.errorCode === ERROR_CODES.CODE_RESEND_DELAY) {
                goToCode();
            }
        }
    }


    return {
        state: {
            emailValue,
            emailValidationError,
            isLoading,
            isUiLoading,
            hasInteracted,
        },
        actions: {
            setHasInteracted,
            setEmailValue,
            handleSubmit,
        }
    }
}
