import { useSignup } from './useSignup.js';
import AuthForm from '../components/AuthForm.jsx';

const SignupForm = ({ onSuccess }) => {
    const {
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        loading,
        signupUser,
    } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signupUser();
            onSuccess();
        } catch(err) {
            console.log('Signup failed', err);
        }
    }


    const fields = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            value: name,
            onChange: (e) => setName(e.target.value),
        },
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
            submitText='Sign up'
            fields={fields}
        />

    )
}

export default SignupForm;
