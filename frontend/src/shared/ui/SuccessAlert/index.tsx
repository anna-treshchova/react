import { CheckCircleFilled } from '@ant-design/icons';
import styles from './SuccessAlert.module.scss'

type SuccessAlertProps = {
    message: string;
}

export const SuccessAlert = ({ message }: SuccessAlertProps) => {
    return (
        <div className={styles.inner}>
            <CheckCircleFilled className={styles.icon}/>
            <span>{message}</span>
        </div>
    )
}