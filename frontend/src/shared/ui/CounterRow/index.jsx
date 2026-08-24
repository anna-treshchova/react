import { InputNumber } from 'antd';
import styles from './CounterRow.module.scss';

export const CounterRow = ({
    title,
    subtitle,
    subtitleVariant = 'default', // 'default' | 'underline',
    value,
    min = 0,
    max,
    onChange,
}) => {
    const subtitleClasses = [
        styles.subtitle,
        subtitleVariant !== 'default' && styles[subtitleVariant],
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.row}>
            <div className={styles.content}>
                <span className={styles.title}>{title}</span>
                <span className={subtitleClasses}>{subtitle}</span>
            </div>

            <InputNumber
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                controls={true}
                className={styles.input}
            />
        </div>
    )
}