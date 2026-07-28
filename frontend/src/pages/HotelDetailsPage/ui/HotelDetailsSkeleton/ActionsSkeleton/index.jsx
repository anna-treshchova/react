import BackIcon from '@/shared/assets/icons/back.svg?react';
import styles from './ActionsSkeleton.module.scss';
import { HeartIcon} from '@/shared/ui/HeartIcon';

const ActionButton = ({ children }) => (
    <div className={styles.action}>
        {children}
    </div>
)

export const ActionsSkeleton = () => {
    return (
        <div className={styles.actions}>
            <ActionButton>
                <BackIcon />
            </ActionButton>
            <ActionButton>
                <HeartIcon
                    variant='outline'
                    size='xs'
                    weight='medium'
                />
            </ActionButton>
        </div>
    )
}