import { forwardRef } from 'react';
import { DotLoader } from '../DotLoader';
import styles from './OTPInput.module.scss';

export const OTPInput = forwardRef(({
    value,
    length = 6,
    disabled = false,
    isLoading = false,
    onChange,
    onPasteComplete
}, ref) => {
    const isEmpty = value.length === 0;
    const cells = Array.from({ length });

    const handleChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');

        if (newValue !== value && newValue.length <= length) {
            onChange(newValue)
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const cleanCode = pastedData.replace(/\D/g, '').slice(0, length);

        onChange(cleanCode)

        if (cleanCode.length === length && onPasteComplete) {
            onPasteComplete(cleanCode)
        }
    }

    return (
        <div
            className={styles.container}
            data-empty={isEmpty}
            data-disabled={disabled}
        >
            <input
                ref={ref}
                type='text'
                name='otp'
                inputMode='numeric'
                autoComplete='one-time-code'
                value={value}
                disabled={disabled}
                onChange={handleChange}
                onPaste={handlePaste}
                maxLength={length}
            />

            <div className={styles.cellsContainer}>
                {cells.map((_, index) => {
                    const isFirst = index === 0
                    const isLast = index === length - 1 && value.length === length;

                    const showCursor = value.length === index || isLast;

                    return (
                        <span
                            key={index}
                            className={styles.cell}
                            data-cursor-left={isFirst}
                            data-cursor-right={isLast}
                        >
                            {showCursor && <div className={styles.cursor}/>}
                            {isEmpty ? '-' : value[index] ?? ''}
                        </span>
                    )
                })}
            </div>
            {isLoading && (
                <div className={styles.loaderWrapper}>
                    <DotLoader />
                </div>
            )}
        </div>
    );
});
