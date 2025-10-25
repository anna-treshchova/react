import { CloseOutlined } from '@ant-design/icons';
import styles from './CloseSearchButton.module.scss'

const  CloseSearchButton = ({ onClick = () => {} }) => {

    return (
        <button className={styles.closeFormButton} onClick={onClick}>
            <CloseOutlined className={styles.closeIcon}/>
        </button>
    )
}
export default CloseSearchButton