import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../authThunk.js';

export const useSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const signupUser = async () => {
        await dispatch(signup({ name, email, password })).unwrap();
    }

    return {
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        loading,
        signupUser,
    }
}