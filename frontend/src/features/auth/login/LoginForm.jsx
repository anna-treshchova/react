import { useLogin } from './useLogin.js'
import AuthForm from '../components/AuthForm.jsx';

const LoginForm = ({ onSuccess }) => {
    const {
        email,
        password,
        setEmail,
        setPassword,
        loading,
        loginUser,
    } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await loginUser();
            onSuccess();
        } catch (err) {
            console.log('Login failed:', err);
        }
    }

    const fields = [
        {
            name: 'email',
            type: 'text',
            placeholder: 'Email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
        }
    ]

    return (
        <AuthForm
            onSubmit={handleSubmit}
            loading={loading}
            submitText='Login'
            fields={fields}
        />
    )
}

export default LoginForm;