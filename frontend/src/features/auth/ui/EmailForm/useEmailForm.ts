import {
    useState,
    type Dispatch,
    type SetStateAction,
    type FormEvent
} from 'react';
import { useSelector } from 'react-redux';

import { useDelayedExit } from '@/shared/hooks/useDelayedExit';
import { isRecord } from '@/shared/lib/type-guards';

import { validateEmail } from '../../lib';
import { ERROR_CODES } from '../../constants';
import {
    useSendCodeMutation,
    selectVerification,
    selectCanResendAt,

    useAuthStore,
    selectEmailValue,
    selectEmailValidationError,
    selectAuthActions,
} from '../../model'



interface CodeResendDelayError {
    data: {
        errorCode: typeof ERROR_CODES.CODE_RESEND_DELAY;
    }
}

const isCodeResendDelayError = (
    err: unknown
): err is CodeResendDelayError => {
    if (!isRecord(err)) return false;

    return (
        isRecord(err.data) &&
        err.data.errorCode === ERROR_CODES.CODE_RESEND_DELAY
    )
}

interface UseEmailFormReturn {
    state: {
        emailValue: string;
        emailValidationError: string;
        isLoading: boolean;
        isUiLoading: boolean;
        hasInteracted: boolean;
    },
    actions: {
        setHasInteracted: Dispatch<SetStateAction<boolean>>;
        setEmailValue: (emailValue: string) => void;
        handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    }
}

export const useEmailForm = (): UseEmailFormReturn => {
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

    const isUiLoading = useDelayedExit(isLoading, 400);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
            if (isCodeResendDelayError(err)) {
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