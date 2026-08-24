import { useSelector, useDispatch } from 'react-redux';

import { useDelayedExit } from '@/shared/hooks/useDelayedExit';
import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';

import {
    setError,
    useAuthStore,
    useAuthEffects,
    selectAuthStep,
    selectCodeValue,
    selectIsErrorAlertVisible,
    selectIsSuccessAlertVisible,
    selectErrorMessageByStep,
} from '../../model';

import { STEPS } from '../../constants';

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
}

const successAlertOffset = {
    hidden: 60,
    visible: -40
}

const getErrorAlertOffset = ({
    isMobile,
    isVisible,
    step,
    isCodeEmpty
}) => {
    if (isMobile) {
        return isVisible
            ? errorAlertOffset.mobile.visible
            : errorAlertOffset.mobile.hidden;
    }

    if (!isVisible) {
        return errorAlertOffset.desktop.hidden;
    }

    if (step === STEPS.EMAIL) {
        return errorAlertOffset.desktop.visible.email;
    }

    return isCodeEmpty
        ? errorAlertOffset.desktop.visible.code.empty
        : errorAlertOffset.desktop.visible.code.started;
}

export const useAuthContent = () => {
    const dispatch = useDispatch();

    useAuthEffects();

    const isMobile = useUIStore(selectIsMobile);

    const step = useAuthStore(selectAuthStep);
    const codeValue = useAuthStore(selectCodeValue);
    const isErrorAlertVisible = useAuthStore(selectIsErrorAlertVisible);
    const isSuccessAlertVisible = useAuthStore(selectIsSuccessAlertVisible);

    const errorMessage = useSelector(state => selectErrorMessageByStep(state, step));

    const uiErrorMessage = useDelayedExit(errorMessage, 500);
    const uiErrorAlertVisible = useDelayedExit(isErrorAlertVisible, 500);
    const uiSuccessAlertVisible = useDelayedExit(isSuccessAlertVisible, 500);

    const clearError = () => {
        dispatch(setError(null));
    }

    const isCodeEmpty = codeValue.length === 0;

    const errorYOffset = getErrorAlertOffset({
        isMobile,
        isVisible: isErrorAlertVisible && !!errorMessage,
        step,
        isCodeEmpty,
    })

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