import { useField } from 'formik';

import baseStyles from '../base.module.css';
import styles from './CheckboxField.module.css';

const CheckboxField = ({ label, ...props }) => {
    const [field, meta] = useField({
        name: props.name,
        type: 'checkbox',
    })

    const hasError = meta.touched && typeof meta.error === 'string';

    return (
        <div className={`${baseStyles.field} ${styles.checkbox}`}>
            <label>
                <input
                    type='checkbox'
                    {...field}
                    {...props}
                />
                {label}
            </label>
            <span className={baseStyles.error}>
                {hasError && meta.error}
            </span>
        </div>
    )
}

export default CheckboxField;

/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   field →  name, value, onChange, onBlur         meta →  touched, error          props →  name, type, placeholder
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

            ❗ДЛЯ TYPE: text, password, textarea, select МОЖНА ПИСАТИ:  useField(name)

            ❗ДЛЯ TYPE: checkbox, radio ТРЕБА ПИСАТИ: useField({ name, type })

*/