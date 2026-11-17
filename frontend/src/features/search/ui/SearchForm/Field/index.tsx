import type { ReactNode } from 'react'
import { usePageContext } from '@/shared/hooks/usePageContext';
import { FormFieldLabels } from '../../../model';
import styles from './Field.module.scss';

interface FieldProps {
    label: FormFieldLabels;
    children?: ReactNode;
}

export const Field = ({ label, children }: FieldProps) => {
    const { isWIP } = usePageContext();

    return (
        <div className={styles.field}>
            <div className={styles.title}>{label}</div>
            {isWIP ? <div className={styles.stub}/> : children}
        </div>
    )
}


