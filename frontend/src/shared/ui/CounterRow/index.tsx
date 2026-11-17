import { InputNumber } from 'antd';
import styles from './CounterRow.module.scss';

type CounterRowProps = {
    label: string;
    description: string;
    descriptionVariant?: 'default' | 'underline';
    value: number;
    min?: number;
    max: number;
    onChange: (value: number | null) => void;
}

export const CounterRow = ({
    label,
    description,
    descriptionVariant = 'default',
    value,
    min = 0,
    max,
    onChange,
}: CounterRowProps) => {

    const descriptionClasses = [
        styles.description,
        descriptionVariant !== 'default' && styles[descriptionVariant],
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.row}>
            <div className={styles.content}>
                <span className={styles.title}>{label}</span>
                <span className={descriptionClasses}>{description}</span>
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


/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

         Функцію з вужчим типом параметра (number) НЕ МОЖНА передати туди, де очікується функція з ширшим типом
                                          параметра (number | null)

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/