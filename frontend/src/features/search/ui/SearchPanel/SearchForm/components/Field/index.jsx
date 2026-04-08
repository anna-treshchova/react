import styles from './Field.module.scss';

const Field = ({ children, title }) => (
    <div className={styles.field}>
        <div className={styles.title}>{title}</div>
        {children}
    </div>
)

export default Field