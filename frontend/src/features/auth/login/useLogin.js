import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../authThunk.js';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const loginUser = async ()  => {
         await dispatch(login({ email, password })).unwrap();
    }

    return {
        email,
        password,
        setEmail,
        setPassword,
        loading,
        loginUser,
    }
}
