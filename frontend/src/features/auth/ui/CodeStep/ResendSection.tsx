import styles from './ResendSection.module.scss';

interface ResendSectionProps {
    isThrottled: boolean;
    onClick: () => Promise<void>;
}

export const ResendSection = (
    { isThrottled, onClick }: ResendSectionProps
) => {
    return (
        <div className={styles.resend}>
            <span>Didn’t get it? </span>

            <button
                className={isThrottled ? styles.throttled : ''}
                onClick={onClick}>
                Send a new code
            </button>
        </div>
    )
}