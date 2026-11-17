import { Link } from 'react-router';
import { Card } from 'antd';
import HeartPlusIcon from '@/shared/assets/icons/heart-plus.svg?react';
import styles from './EmptyWishlistCard.module.scss';

export const EmptyWishlistCard = () => {
    return (
        <Card
            className={styles.card}
            styles={{ body: { padding: 0 } }}
            cover={
                <div style={{ borderRadius: '24px'}}>
                    <Link to='/' className={styles.cover}>
                        <HeartPlusIcon />
                    </Link>
                </div>
            }
        >
            <div className={styles.content}>
                <Link to='/'>
                    <h4  className={styles.title}>
                        Save your first stay
                    </h4>
                </Link>
            </div>
        </Card>
    )
}