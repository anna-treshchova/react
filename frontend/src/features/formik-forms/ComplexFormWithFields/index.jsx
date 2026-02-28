import { Formik } from 'formik';
import { complexFormSchema } from './validationSchema.js';

import {
    InputField,
    RadioGroupField,
    SelectField,
    TextareaField,
    CheckboxField,
} from '@/shared/ui/fields';

import { COUNTRY_OPTIONS, GENDER_OPTIONS } from './constants.js';

import styles from './ComplexFormWithFields.module.css'

const initialValues = {
    email: '',
    password: '',
    gender: '',
    country: '',
    info: '',
    acceptTerms: false,
}

const ComplexFormWithFields = () => {
    return (
        <div className={styles.formCard}>
            <h2>Complex Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={complexFormSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputsRow}>
                            <InputField
                                name='email'
                                type='text'
                                placeholder='Email'
                            />
                            <InputField
                                name='password'
                                type='password'
                                placeholder='Password'
                            />
                        </div>
                        <RadioGroupField
                            name='gender'
                            legend='Gender'
                            options={GENDER_OPTIONS}
                        />
                        <SelectField
                            name='country'
                            placeholder='Select Country'
                            options={COUNTRY_OPTIONS}
                        />
                        <TextareaField
                            name='info'
                            label='Additional info'
                        />
                        <CheckboxField
                            name='acceptTerms'
                            label='I agree to Terms and Conditions'
                        />
                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default ComplexFormWithFields;



/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

import {Formik, Form, Field, ErrorMessage} from 'formik'

const ComplexFormWithFields = () => {
    return (
        <div className={styles.formCard}>
            <h2>Complex Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={complexFormSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({isSubmitting }) => (
                    <Form className={styles.form}>

                        <div className={styles.inputsRow}>

                            <label htmlFor='email'>Email</label>
                            <Field type='text' name='email'/>
                            <ErrorMessage name='email' component='span'/>

                            <label htmlFor='password'>Password</label>
                            <Field type='password' name='password'/>
                            <ErrorMessage name='password' component='span'/>
                        </div>

                        <h3>Gender</h3>
                        {GENDER_OPTIONS.map(opt => (
                            <label key={opt.value}>
                                <Field
                                    type='radio'
                                    name='gender'
                                    value={opt.value}
                                />
                                {opt.label}
                            </label>

                        ))}
                        <ErrorMessage name='gender' component='span'/>


                        <h3>Country</h3>
                        <Field as='select' name='country'>
                            {COUNTRY_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name='country' component='span'/>

                        <h3>Additional info</h3>
                        <Field as='textarea' name='info' />
                        <ErrorMessage name='info' component='span'/>

                        <h3>I agree to Terms and Conditions</h3>
                        <Field type='checkbox' name='acceptTerms'/>
                        <ErrorMessage name='acceptTerms' component='span'/>


                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


*/