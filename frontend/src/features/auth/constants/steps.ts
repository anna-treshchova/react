export const AUTH_STEPS = {
    EMAIL: 'EMAIL',
    CODE: 'CODE'
} as const;

export type AuthStep = typeof AUTH_STEPS[keyof typeof AUTH_STEPS];