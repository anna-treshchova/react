import LetterLogo from '@/shared/assets/img/logo/airbnb-letter.svg';
import { EmailForm } from '../EmailForm';
import styles from './EmailStep.module.scss';

export const EmailStep = () => {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <img src={LetterLogo} alt='Logo Airbnb' className={styles.logo}/>
                <h1>Log in or sign up</h1>
            </div>
            <EmailForm />
        </div>
    )
};