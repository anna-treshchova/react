import { Formik } from 'formik';

import { validateComplexForm } from './validation.js';
import { complexFormSchema } from './validationSchema.js';

import { COUNTRY_OPTIONS, GENDER_OPTIONS } from './constants.js';

import styles from './ComplexForm.module.css'

const initialValues = {
    email: '',
    password: '',
    gender: '',
    country: '',
    info: '',
    acceptTerms: false,
}

const ComplexForm = () => {
    return (
        <div className={styles.formCard}>
            <h2>Complex Form</h2>
            <Formik
                initialValues={initialValues}
                // validate={validateComplexForm}
                validationSchema={complexFormSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => {

                    const hasEmailError = touched.email && errors.email;
                    const hasPasswordError = touched.password && errors.password;
                    const hasGenderError = touched.gender && errors.gender;
                    const hasCountryError = touched.country && errors.country;
                    const hasAcceptTermsError = touched.acceptTerms && errors.acceptTerms;

                    const countryClass = [
                        styles.select,
                        values.country && styles.selected, //&& - повертає перше falsy значення або останнє - тобто або false або класс
                        hasCountryError && styles.hasError
                    ].filter(Boolean).join(' '); //.filter(Boolean) - робить фільтрафію по масиву залишаючи тільки truthy значення

                    return (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formFields}>
                                <div className={styles.field}>
                                    <input
                                        className={`${styles.input} ${hasEmailError ? styles.hasError : ''}`}
                                        type='text'
                                        name='email'
                                        placeholder='Email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span className={styles.error}>
                                        {hasEmailError && errors.email}
                                    </span>
                                </div>

                                <div className={styles.field}>
                                    <input
                                        className={`${styles.input} ${hasPasswordError ? styles.hasError : ''}`}
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span className={styles.error}>
                                        {hasPasswordError && errors.password}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.field}>
                                <fieldset className={`${styles.fieldset} ${hasGenderError ? styles.hasError : ''}`}>
                                    <legend>Gender</legend>
                                    {GENDER_OPTIONS.map(option => (
                                        <label key={option.value} className={styles.radioLabel}>
                                            <input
                                                type='radio'
                                                name='gender'
                                                value={option.value}
                                                checked={values.gender === option.value}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </fieldset>
                                <span className={styles.error}>
                                    {hasGenderError && errors.gender}
                                </span>
                            </div>

                            <div className={styles.field}>
                                <select
                                    className={countryClass}
                                    name='country'
                                    value={values.country}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value='' disabled hidden>
                                        Select country
                                    </option>

                                    {COUNTRY_OPTIONS.map(c => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                                <span className={styles.error}>
                                    {hasCountryError && errors.country}
                                </span>
                            </div>

                            <div className={`${styles.field} ${styles.fieldTextarea}`}>
                                <label htmlFor='info' className={styles.labelTextarea}>
                                    Additional info
                                </label>
                                <textarea
                                    id='info'
                                    className={styles.textarea}
                                    name='info'
                                    value={values.info}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className={`${styles.field} ${styles.fieldCheckbox}`}>
                                <label className={styles.labelCheckbox}>
                                    <input
                                        className={styles.checkbox}
                                        type='checkbox'
                                        name='acceptTerms'
                                        checked={values.acceptTerms}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    I agree to Terms and Conditions
                                </label>
                                <span className={styles.error}>
                                    {hasAcceptTermsError && errors.acceptTerms}
                                </span>
                            </div>

                            <button type='submit' disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ComplexForm;



/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


useField — що це концептуально?

    useField — це хук Formik, який:

підключається до Formik Context
і дістає дані лише для одного конкретного поля

Тобто він працює приблизно як:

    useContext(FormikContext)

але замість усього об’єкта Formik він повертає тільки дані для одного name.

📦 Звідки він бере дані?

    Коли ти пишеш:

    <Formik initialValues={...}>

        Formik створює контекст (React Context) і зберігає там:

        {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            ...
        }

        У render-props ти це дістаєш так:

        <Formik>
            {(formikProps) => ...}
        </Formik>

        А useField робить те саме, але точково.

        🔎 Що саме робить useField?

        Коли ти пишеш:

        const [field, meta, helpers] = useField('email');

        Formik всередині робить приблизно так (спрощено):

        const value = values['email'];
        const error = errors['email'];
        const isTouched = touched['email'];

        І повертає:

        1️⃣ field — все що потрібно для input
        {
            name: 'email',
            value: values.email,
            onChange: handleChange,
            onBlur: handleBlur
        }
        2️⃣ meta — стан цього поля
        {
            error: errors.email,
            touched: touched.email,
            initialValue: initialValues.email
        }
        3️⃣ helpers — інструменти
        {
            setValue,
            setTouched,
            setError
        }

        (їх ти поки не використовуєш)

 */
