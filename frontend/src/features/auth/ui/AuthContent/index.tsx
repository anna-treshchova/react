import { Portal } from '@/shared/ui/Portal';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';
import { SuccessAlert } from '@/shared/ui/SuccessAlert';
import type { CSSPropertiesWithVars } from '@/shared/styles/types';

import { EmailStep } from '../EmailStep';
import { CodeStep } from '../CodeStep';
import { useAuthContent } from './useAuthContent';

import styles from './AuthContent.module.scss';

export const AuthContent = () => {
    const {
        step,
        isMobile,
        isCodeEmpty,

        errorYOffset,
        successYOffset,

        uiErrorMessage,
        uiErrorAlertVisible,
        uiSuccessAlertVisible,

        clearError
    } = useAuthContent();

    const errorAlertStyle: CSSPropertiesWithVars = {
        '--error-y-offset': `${errorYOffset}px`
    }

    const successAlertStyle: CSSPropertiesWithVars = {
        '--success-y-offset': `${successYOffset}px`
    }

    const errorAlertContent = (
        <div
            className={styles.errorAlertWrapper}
            style={errorAlertStyle}
            data-visible={uiErrorAlertVisible}
        >
            <ErrorAlert message={uiErrorMessage} onClick={clearError} />
        </div>
    )

    return (
        <div
            className={styles.authContent}
            data-step={step.toLowerCase()}
            data-code-empty={isCodeEmpty}
        >
            <div className={styles.slider}>
                <div className={styles.track}>
                    <div className={styles.step}>
                        <EmailStep />
                    </div>
                    <div className={styles.step}>
                        <CodeStep />
                    </div>
                </div>
            </div>

            {isMobile ? <Portal>{errorAlertContent}</Portal> : errorAlertContent}

            <Portal>
                <div
                    className={styles.successAlertWrapper}
                    style={successAlertStyle}
                    data-visible={uiSuccessAlertVisible}
                >
                    <SuccessAlert message='New code sent' />
                </div>
            </Portal>
        </div>
    )
}