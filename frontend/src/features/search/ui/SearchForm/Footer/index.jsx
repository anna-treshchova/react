import { useUIStore, selectIsHeaderCollapsed, selectIsMobile } from '@/shared/model/uiStore/index.js';
import { Button } from '@/shared/ui/Button/index.jsx';

import SearchButton from './SearchButton.jsx';
import styles from './Footer.module.scss';

const Footer = ({ handleClear }) => {
    const isHeaderCollapsed = useUIStore(selectIsHeaderCollapsed);
    const isMobile = useUIStore(selectIsMobile);

    const showClearButton = !isHeaderCollapsed && isMobile;

    return (
        <div className={styles.footer}>
            {showClearButton && (
                <Button size='sm' onClick={handleClear}>
                    Clear All
                </Button>
            )}
            <SearchButton />
        </div>
    )
}

export default Footer;