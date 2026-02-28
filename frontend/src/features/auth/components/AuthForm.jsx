import styles from './AuthForm.module.css'

const AuthForm = ({
    fields,
    onSubmit,
    loading,
    submitText
}) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>

            {fields.map(field => (
                <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                />
            ))}

            <button type='submit' disabled={loading}>
                {loading ? 'Loading...' : submitText}
            </button>

        </form>
    )
}

export default AuthForm;