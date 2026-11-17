import { create } from 'zustand';
import { AUTH_STEPS, type AuthStep } from '../constants';

interface AuthState {
    step: AuthStep;
    emailValue: string;
    codeValue: string;
    emailValidationError: string;
    isErrorAlertVisible: boolean;
    isSuccessAlertVisible: boolean;
}

export interface AuthActions {
    goToCode: () => void;
    goToEmail: () => void;
    setEmailValue: (emailValue: string) => void;
    setCodeValue: (codeValue: string) => void;
    setEmailValidationError: (emailValidationError: string) => void;
    setErrorAlertVisible: (visible: boolean) => void;
    setSuccessAlertVisible: (visible: boolean) => void;
    reset: () => void;
}

const initialState: AuthState = {
    step: AUTH_STEPS.EMAIL,

    emailValue: '',
    codeValue: '',
    emailValidationError: '',

    isErrorAlertVisible: false,
    isSuccessAlertVisible: false,
}

export type AuthStore =  AuthState & {
    actions: AuthActions;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    ...initialState,

    actions: {
        goToCode: () => set({ step: AUTH_STEPS.CODE }),
        goToEmail: () => set({ step: AUTH_STEPS.EMAIL, codeValue: '' }),

        setEmailValue: (emailValue) => set({ emailValue, emailValidationError: '' }),
        setCodeValue: (codeValue) => set({ codeValue, isErrorAlertVisible: false }),
        setEmailValidationError: (emailValidationError) => set({ emailValidationError }),

        setErrorAlertVisible: (visible) => set({ isErrorAlertVisible: visible }),
        setSuccessAlertVisible: (visible) => set({ isSuccessAlertVisible: visible }),

        reset: () => set(initialState),
    },
}))