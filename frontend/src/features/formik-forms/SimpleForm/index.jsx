import { Formik } from 'formik';

import { validateSimpleForm } from './validation.js';

import styles from './SimpleForm.module.css'

const SimpleForm = () => {
    return (
        <div className={styles.formCard}>
            <h2>Simple Form</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={validateSimpleForm}
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

                    return (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formFields}>
                                <div className={styles.field}>
                                    <input
                                        className={`${styles.input} ${hasEmailError ? styles.inputError : ''}`}
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
                                        className={`${styles.input} ${hasPasswordError ? styles.inputError : ''}`}
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

export default SimpleForm;