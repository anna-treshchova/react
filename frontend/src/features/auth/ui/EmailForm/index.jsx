import { useEmailForm } from './useEmailForm.js';
import { TextField } from '@/shared/ui/TextField';
import { GradientButton } from '@/shared/ui/GradientButton';

import styles from './EmailForm.module.scss';

export const EmailForm = () => {
    const { state, actions } = useEmailForm();

    const {
        emailValue,
        emailValidationError,
        isLoading,
        isUiLoading,
        hasInteracted
    } = state;

    const {
        setHasInteracted,
        setEmailValue,
        handleSubmit,
    } = actions;

    return (
        <form className={styles.form}
              data-interacted={hasInteracted}
              data-error={!!emailValidationError}
              onSubmit={handleSubmit}
        >
            <TextField
                id='email'
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                onFocus={() => setHasInteracted(true)}
                label='Enter your email address'
                error={emailValidationError}
                showChildren={hasInteracted}
                disabled={isLoading}
            >
                <span className={styles.disclaimer}>
                    We’ll send a unique confirmation code to your email to verify your account.
                </span>
            </TextField>
            <div className={styles.buttonWrapper}>
                <GradientButton type='submit' isLoading={isUiLoading}>
                    Continue
                </GradientButton>
            </div>

        </form>
    )
}
