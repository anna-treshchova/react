import styles from './ResendSection.module.scss';

export const ResendSection = ({ isThrottled, onClick}) => {
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