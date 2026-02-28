import * as Yup from 'yup';

import { COUNTRY_OPTIONS, GENDER_OPTIONS } from './constants.js';

const genderValues = GENDER_OPTIONS.map(option => option.value);
const countryValues = COUNTRY_OPTIONS.map(option => option.value);

export const complexFormSchema = Yup.object({
    email: Yup.string()
        .trim()
        .required('Email is required')
        .email('Invalid email address'),

    password: Yup.string()
        .trim()
        .required('Password is required')
        .min(8, 'At least 8 characters')
        .matches(/^\S*$/, 'Password cannot contain spaces')
        .matches(/[A-Z]/, 'Add one uppercase letter')
        .matches(/\d/, 'Add one number'),

    gender: Yup.string()
        .required('Please choose an option')
        .oneOf( genderValues, 'Invalid gender option'),

    country: Yup.string()
        .required('Country is required')
        .oneOf(countryValues, 'Invalid country option'),

    info: Yup.string().trim(),

    acceptTerms: Yup.boolean()
        .oneOf([true], 'You must accept the terms')
})