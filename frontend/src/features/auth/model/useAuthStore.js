import { create } from 'zustand';
import { STEPS } from '../constants';

const initialState = {
    step: STEPS.EMAIL,

    emailValue: '',
    codeValue: '',
    emailValidationError: '',

    isErrorAlertVisible: false,
    isSuccessAlertVisible: false,
}
export const useAuthStore = create((set) => ({
    ...initialState,

    actions: {
        goToCode: () => set({ step: STEPS.CODE }),
        goToEmail: () => set({ step: STEPS.EMAIL, codeValue: '' }),

        setEmailValue: (emailValue) => set({ emailValue, emailValidationError: '' }),
        setCodeValue: (codeValue) => set({ codeValue, isErrorAlertVisible: false }),
        setEmailValidationError: (emailValidationError) => set({ emailValidationError }),

        setErrorAlertVisible: (visible) => set({ isErrorAlertVisible: visible }),
        setSuccessAlertVisible: (visible) => set({ isSuccessAlertVisible: visible }),

        reset: () => set(initialState),
    },
}))