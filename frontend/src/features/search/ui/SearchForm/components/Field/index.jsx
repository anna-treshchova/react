import styles from './Field.module.scss';
import { useLayoutStore, selectIsFormDisabled } from '@/shared/model';

export const Field = ({ children, title }) => {
    const isFormDisabled = useLayoutStore(selectIsFormDisabled);

    return (
        <div className={styles.field}>
            <div className={styles.title}>{title}</div>

            {isFormDisabled
                ? <div className={styles.stub}/>
                : children
            }
        </div>
    )
}


