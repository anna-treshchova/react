import styles from './CircleButton.module.scss';

export const CircleButton = ({
    variant = 'solid',
    size,
    hover,
    children,
    ...props
}) => {
    const buttonClasses = [
       styles.button,
       styles[variant],
       styles[size],
       styles[`hover-${hover}`],
   ].filter(Boolean).join(' ');

    return (
        <button
            type='button'
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    )
}
