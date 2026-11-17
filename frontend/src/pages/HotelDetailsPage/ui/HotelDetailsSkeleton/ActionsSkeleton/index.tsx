import { ReactNode } from 'react';
import BackIcon from '@/shared/assets/icons/back.svg?react';
import { HeartIcon } from '@/shared/ui/HeartIcon';
import styles from './ActionsSkeleton.module.scss';

export const ActionsSkeleton = () => {
    return (
        <div className={styles.actions}>
            <ActionButton>
                <BackIcon />
            </ActionButton>
            <ActionButton>
                <HeartIcon
                    variant='outline'
                    size='sm'
                    weight='medium'
                />
            </ActionButton>
        </div>
    )
}

interface ActionButtonProps {
    children: ReactNode;
}

const ActionButton = ({ children }: ActionButtonProps) => (
    <div className={styles.action}>
        {children}
    </div>
)