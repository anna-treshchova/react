import { useSelector, useDispatch } from 'react-redux';

import { useDelayedExit } from '@/shared/hooks/useDelayedExit';
import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';

import {
    useAuthStore,
    useAuthEffects,

    setError,
    selectErrorMessageByStep,

    selectAuthStep,
    selectCodeValue,
    selectIsErrorAlertVisible,
    selectIsSuccessAlertVisible,

    type ErrorMessageByStep,
    type StateWithAuth
} from '../../model';

import { AUTH_STEPS, type AuthStep } from '../../constants';

const errorAlertOffset = {
    desktop: {
        hidden: 100,
        visible: {
            email: -18,
            code: {
                empty: -48,
                started: -96
            }
        }
    },
    mobile: {
        hidden: 60,
        visible: -40
    }
} as const;

const successAlertOffset = {
    hidden: 60,
    visible: -40
} as const;


const getErrorAlertOffset = (
    isMobile: boolean,
    isVisible: boolean,
    step: AuthStep,
    isCodeEmpty: boolean
) => {
    if (isMobile) {
        return isVisible
            ? errorAlertOffset.mobile.visible
            : errorAlertOffset.mobile.hidden;
    }

    if (!isVisible) {
        return errorAlertOffset.desktop.hidden;
    }

    if (step === AUTH_STEPS.EMAIL) {
        return errorAlertOffset.desktop.visible.email;
    }

    return isCodeEmpty
        ? errorAlertOffset.desktop.visible.code.empty
        : errorAlertOffset.desktop.visible.code.started;
}

interface AuthContentReturn {
    step: AuthStep;
    isMobile: boolean;
    isCodeEmpty: boolean;

    errorYOffset: ReturnType<typeof getErrorAlertOffset>;
    successYOffset: typeof successAlertOffset[keyof typeof successAlertOffset],

    uiErrorMessage: ErrorMessageByStep
    uiErrorAlertVisible: boolean;
    uiSuccessAlertVisible: boolean;

    clearError: () => void;
}

export const useAuthContent = (): AuthContentReturn => {
    const dispatch = useDispatch();

    useAuthEffects();

    const isMobile = useUIStore(selectIsMobile);

    const step = useAuthStore(selectAuthStep);
    const codeValue = useAuthStore(selectCodeValue);
    const isErrorAlertVisible = useAuthStore(selectIsErrorAlertVisible);
    const isSuccessAlertVisible = useAuthStore(selectIsSuccessAlertVisible);

    const errorMessage = useSelector((state: StateWithAuth) =>
        selectErrorMessageByStep(state, step)
    );

    const uiErrorMessage = useDelayedExit(errorMessage, 500);
    const uiErrorAlertVisible = useDelayedExit(isErrorAlertVisible, 500);
    const uiSuccessAlertVisible = useDelayedExit(isSuccessAlertVisible, 500);

    const clearError = () => {
        dispatch(setError(null));
    }

    const isCodeEmpty = codeValue.length === 0;

    const errorYOffset = getErrorAlertOffset(
        isMobile,
        isErrorAlertVisible && !!errorMessage,
        step,
        isCodeEmpty,
    )

    const successYOffset = successAlertOffset[isSuccessAlertVisible ? 'visible' : 'hidden'];

    return {
        step,
        isMobile,
        isCodeEmpty,

        errorYOffset,
        successYOffset,

        uiErrorMessage,
        uiErrorAlertVisible,
        uiSuccessAlertVisible,

        clearError
    }
}