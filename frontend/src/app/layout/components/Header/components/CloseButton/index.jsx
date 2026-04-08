import { CloseOutlined } from '@ant-design/icons';
import styles from './CloseButton.module.scss';

const  CloseButton = ({ closeSearch = () => {} }) => {
    return (
        <button className={styles.button} onClick={closeSearch}>
            <CloseOutlined className={styles.icon}/>
        </button>
    )
}
export default CloseButton