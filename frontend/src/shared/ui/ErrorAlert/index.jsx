import { ExclamationCircleFilled } from '@ant-design/icons';

import { CircleButton } from '../CircleButton';
import CloseIcon from '../../assets/icons/close.svg?react';
import styles from './ErrorAlert.module.scss'

export const ErrorAlert = ({ message, onClick }) => {
    return (
        <div className={styles.errorAlert}>
            <ExclamationCircleFilled className={styles.mainIcon}/>
            <span>{message}</span>
            <CircleButton
                variant='ghost'
                size='sm'
                hover='bg'
                onClick={onClick}
                aria-label='Close'
            >
                <CloseIcon />
            </CircleButton>
        </div>
    )
}