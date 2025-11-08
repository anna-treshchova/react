import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router';

import { login } from '@/store/thunks/authThunk.js';

import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleChange = (setter) => (e) => setter(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(login({ email, password }));

        res.meta.requestStatus === 'fulfilled' && navigate(from, { replace: true })
    }

    return (
        <div className={styles.login}>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={handleChange(setEmail)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleChange(setPassword)}
                />
                <button type='submit' disabled={loading}>Login</button>
                <div>
                    No account? <Link to='/signup' state={{ from: location.state?.from }}>Register</Link>
                </div>
            </form>

        </div>
    )
}

export default Login;