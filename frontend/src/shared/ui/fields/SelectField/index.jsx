import { useField } from 'formik';

import baseStyles from '../base.module.css';
import styles from './SelectField.module.css';

export const SelectField = ({ options, ...props }) => {
    const [field, meta] = useField(props.name);

    const hasError = meta.touched && typeof meta.error === 'string';

    const selectClass = [
        styles.select,
        field.value && styles.selected, //&& - повертає перше falsy значення або останнє - тобто або false або класс
        hasError && styles.hasError
    ]
        .filter(Boolean) //.filter(Boolean) - робить фільтрафію по масиву залишаючи тільки truthy значення
        .join(' ');

    return (
        <div className={baseStyles.field}>
            <select
                className={selectClass}
                {...field}
                {...props}
            >
                <option value='' disabled hidden>
                    {props.placeholder}
                </option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <span className={baseStyles.error}>
                {hasError && meta.error}
            </span>
        </div>
    )
}

export default SelectField;


