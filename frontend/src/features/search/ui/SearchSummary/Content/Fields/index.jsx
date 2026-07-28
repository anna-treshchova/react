import styles from './Fields.module.scss'

const Fields = ({ destination, dates, guests }) => (
    <div className={styles.fields}>
        <Field>{destination}</Field>
        <Field>{dates}</Field>
        <Field>{guests}</Field>
    </div>
)

const Field = ({ children }) => (
    <div className={styles.field}>
        {children}
    </div>
)

export default Fields;