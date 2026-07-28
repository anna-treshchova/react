import { useLayoutStore, selectIsHeaderCollapsed, selectIsMobile } from '@/shared/model';
import { Button } from '@/shared/ui/Button';

import SearchButton from './SearchButton';
import styles from './Footer.module.scss';

const Footer = ({ handleClear }) => {
    const isHeaderCollapsed = useLayoutStore(selectIsHeaderCollapsed);
    const isMobile = useLayoutStore(selectIsMobile);

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