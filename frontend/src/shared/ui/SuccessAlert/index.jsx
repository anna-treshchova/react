import { CheckCircleFilled } from '@ant-design/icons';
import styles from './SuccessAlert.module.scss'

export const SuccessAlert = ({ message }) => {
    return (
        <div className={styles.inner}>
            <CheckCircleFilled className={styles.icon}/>
            <span>{message}</span>
        </div>
    )
}