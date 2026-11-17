import type { ReactNode } from 'react';
import styles from './Fields.module.scss'

export interface FieldsProps {
    destContent: string;
    datesContent: string;
    guestsContent: string;
}

export const Fields = ({
    destContent,
    datesContent,
    guestsContent
}: FieldsProps) => {
    return (
        <div className={styles.fields}>
            <Field>{destContent}</Field>
            <Field>{datesContent}</Field>
            <Field>{guestsContent}</Field>
        </div>
    )
}

interface FieldProps {
    children: ReactNode
}

const Field = ({ children }: FieldProps) => (
    <div className={styles.field}>
        {children}
    </div>
)