import { TextField } from '@/shared/ui/TextField';
import { GradientButton } from '@/shared/ui/GradientButton';

import { useEmailForm } from './useEmailForm';
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
                label='Enter your email address'
                value={emailValue}
                disabled={isLoading}

                showChildren={hasInteracted}
                error={emailValidationError}

                onChange={(e) => setEmailValue(e.target.value)}
                onFocus={() => setHasInteracted(true)}
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
