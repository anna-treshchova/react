import { Link, useNavigate, useLocation } from 'react-router';
import SignupForm from './SignupForm';
import styles from './SignupPage.module.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSuccess = () => navigate(from, { replace: true })

    return (
        <div className={styles.signup}>
            <h1>Sign up page</h1>
            <div className={styles.formWrapper}>
                <SignupForm onSuccess={handleSuccess} />
                <div className={styles.redirect}>
                    Already registered? <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;