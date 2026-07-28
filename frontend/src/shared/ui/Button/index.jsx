import styles from './Button.module.scss';

export const Button = ({ type = 'button', size, children, ...props }) => {
    const buttonClasses = [
        styles.button,
        styles[size],
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    )
}
