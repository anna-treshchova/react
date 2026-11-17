import { useUIStore, selectIsHeaderCollapsed, selectIsMobile } from '@/shared/model/uiStore';
import { Button } from '@/shared/ui/Button';

import type { FormActions } from '../../../model';

import { SearchButton } from './SearchButton';
import styles from './Footer.module.scss';

interface FooterProps {
    handleClear: FormActions['resetFormState'];
}

export const Footer = ({ handleClear }: FooterProps) => {
    const isHeaderCollapsed = useUIStore(selectIsHeaderCollapsed);
    const isMobile = useUIStore(selectIsMobile);

    const showClearButton = !isHeaderCollapsed && isMobile;

    return (
        <div className={styles.footer}>
            {showClearButton && (
                <Button size='medium' onClick={handleClear}>
                    Clear All
                </Button>
            )}
            <SearchButton />
        </div>
    )
}