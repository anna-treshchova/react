import { useLocation, useNavigate, Link } from 'react-router';
import LoginForm from './LoginForm.jsx';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSuccess = () => navigate(from, { replace: true })

    return (
        <div className={styles.login}>
            <h1>Login Page</h1>
            <div className={styles.formWrapper}>
                <LoginForm onSuccess={handleSuccess} />

                <div className={styles.redirect}>
                    No account?
                    <Link to='/signup' state={{ from: location.state?.from }}>
                        Register
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;