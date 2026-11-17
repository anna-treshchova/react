import type { AuthStore } from './useAuthStore';

export const selectAuthStep = (state: AuthStore) => state.step;
export const selectEmailValue = (state: AuthStore) => state.emailValue;
export const selectCodeValue = (state: AuthStore) => state.codeValue;
export const selectEmailValidationError = (state: AuthStore) => state.emailValidationError;

export const selectIsErrorAlertVisible = (state: AuthStore) => state.isErrorAlertVisible;
export const selectIsSuccessAlertVisible = (state: AuthStore) => state.isSuccessAlertVisible;

export const selectAuthActions = (state: AuthStore) => state.actions;
