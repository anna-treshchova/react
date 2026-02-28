import { EMAIL_REGEX } from '../validationConstants.js';

export const validateSimpleForm = (values) => {
    const errors = {};

    const email = values.email?.trim() || '';
    const password = values.password?.trim() || '';

    if (!email) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = 'Invalid email address';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'At least 8 characters';
    } else if (/\s/.test(password)) {
        errors.password = 'Password cannot contain spaces';
    } else if (!/[A-Z]/.test(password)) {
        errors.password = 'Add one uppercase letter';
    } else if (!/\d/.test(password)) {
        errors.password = 'Add one number';
    }

    return errors;
}
