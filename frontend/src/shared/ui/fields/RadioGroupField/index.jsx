import { useField } from 'formik';

import baseStyles from '../base.module.css';
import styles from './RadioGroupField.module.css';

const RadioGroupField = ({ name, legend, options }) => {
    const [field, meta] = useField(name);

    const hasError = meta.touched && typeof meta.error === 'string';

    return (
        <div className={baseStyles.field}>
            <fieldset
                className={`${styles.radioGroup} ${hasError ? styles.hasError : ''}`}
            >
                <legend>{legend}</legend>

                {options.map(opt => (
                    <label key={opt.value}>
                        <input
                            type='radio'
                            value={opt.value}
                            name={field.name}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            checked={field.value === opt.value}
                        />
                        {opt.label}
                    </label>
                ))}
            </fieldset>
            <span className={baseStyles.error}>
                {hasError && meta.error}
            </span>
        </div>

    )
}

export default RadioGroupField;