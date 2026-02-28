import { useField } from 'formik';

import baseStyles from '../base.module.css';
import styles from './TextareaField.module.css';

const TextareaField = ({ name, label, ...props }) => {
    const [field, meta] = useField(name);

    const hasError = meta.touched && typeof meta.error === 'string';

    return (
        <div className={baseStyles.field}>
            <div className={`${styles.control} ${hasError ? styles.hasError : ''}`}>
                <label htmlFor={name} className={styles.label}>
                    {label}
                </label>
                <textarea
                    id={name}
                    {...field}
                    {...props}
                    className={styles.textarea}
                />
            </div>
            <span className={baseStyles.error}>
                {hasError && meta.error}
            </span>
        </div>
    )
}
export default TextareaField;

