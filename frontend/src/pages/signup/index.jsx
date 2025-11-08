import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router';

import { signup } from '@/store/thunks/authThunk.js';

import styles from './Signup.module.css';

const Signup = () => {
    const [name, setName] = useState('');
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

        const res = await dispatch(signup({ name, email, password }));

        res.meta.requestStatus === 'fulfilled' && navigate(from, { replace: true })
    }

    return (
        <div className={styles.signup}>
            <h1>Sign up page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={handleChange(setName)}
                />
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
                <button type='submit' disabled={loading}>Sign up</button>
                <div>
                    Already registered? <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;