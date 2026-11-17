import type { ComponentProps } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';

import CloseIcon from '../../assets/icons/close.svg?react';
import { CircleButton } from '../CircleButton';
import styles from './ErrorAlert.module.scss';

type ErrorAlertProps = {
    message: string | null;
    onClick: ComponentProps<typeof CircleButton>['onClick'];
}

export const ErrorAlert = ({ message, onClick }: ErrorAlertProps) => {
    return (
        <div className={styles.errorAlert}>
            <ExclamationCircleFilled className={styles.mainIcon}/>
            <span>{message}</span>
            <CircleButton
                variant='ghost'
                size='md'
                hover='bg'
                onClick={onClick}
                aria-label='Close'
            >
                <CloseIcon />
            </CircleButton>
        </div>
    )
}