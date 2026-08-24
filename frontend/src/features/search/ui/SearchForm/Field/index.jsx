import { usePageContext } from '@/shared/hooks/usePageContext.js';
import styles from './Field.module.scss';

export const Field = ({ children, title }) => {
    const { isWIP } = usePageContext();

    return (
        <div className={styles.field}>
            <div className={styles.title}>{title}</div>
            {isWIP ? <div className={styles.stub}/> : children}
        </div>
    )
}


