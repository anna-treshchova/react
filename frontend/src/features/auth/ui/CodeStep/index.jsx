import { OTPInput } from '@/shared/ui/OTPInput';
import { DotLoader } from '@/shared/ui/DotLoader';

import { CODE_LENGTH } from '../../constants';
import { useCodeStep} from './useCodeStep';
import { ResendSection } from './ResendSection';

import styles from './CodeStep.module.scss';

export const CodeStep = () => {
    const { state, actions, refs } = useCodeStep();

    const {
        email,
        codeValue,
        isThrottled,
        isContinueBlocked,
        isInputDisabled,
        isLoading
    } = state;

    const {
        setCodeValue,
        handleResend,
        handleVerifyCode
    } = actions;

    return (
        <div className={styles.codeStep}>
            <h1>Confirm it’s you</h1>

            <p className={styles.description}>
                We sent a code to {email}
            </p>

            <OTPInput
                ref={refs.inputRef}
                value={codeValue}
                length={CODE_LENGTH}
                disabled={isInputDisabled}
                isLoading={isLoading}
                onChange={setCodeValue}
                onPasteComplete={handleVerifyCode}
            />

            <ResendSection
                isThrottled={isThrottled}
                onClick={handleResend}
                disabled={isLoading}
            />

            <button
                className={styles.continueBtn}
                data-blocked={isContinueBlocked}
                data-loading={isLoading}
                disabled={isContinueBlocked || isLoading}
                onClick={() => handleVerifyCode(codeValue)}
            >
                {isLoading ? <DotLoader color='white' /> : 'Continue'}
            </button>
        </div>
    );
};