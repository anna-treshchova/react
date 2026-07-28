import { Portal } from '@/shared/ui/Portal';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';
import { SuccessAlert } from '@/shared/ui/SuccessAlert';

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

            {isMobile ? (
                <Portal>
                    <div
                        className={styles.errorAlertWrapper}
                        style={{ '--error-y-offset': `${errorYOffset}px` }}
                        data-visible={uiErrorAlertVisible}
                    >
                        <ErrorAlert message={uiErrorMessage} onClick={clearError} />
                    </div>
                </Portal>
            ) : (
                <div
                    className={styles.errorAlertWrapper}
                    style={{ '--error-y-offset': `${errorYOffset}px` }}
                    data-visible={uiErrorAlertVisible}
                >
                    <ErrorAlert message={uiErrorMessage} onClick={clearError} />
                </div>
            )}

            <Portal>
                <div
                    className={styles.successAlertWrapper}
                    style={{ '--success-y-offset': `${successYOffset}px` }}
                    data-visible={uiSuccessAlertVisible}
                >
                    <SuccessAlert message='New code sent' />
                </div>
            </Portal>
        </div>
    )
}