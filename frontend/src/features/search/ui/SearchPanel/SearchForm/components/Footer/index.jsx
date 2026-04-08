import SearchButton from './SearchButton/index.jsx';
import ClearButton from './ClearButton/index.jsx';

import styles from './Footer.module.scss';

const Footer = ({ handleClear }) => (
    <div className={styles.footer}>
        <ClearButton onClick={handleClear} />
        <SearchButton />
    </div>
)

export default Footer;