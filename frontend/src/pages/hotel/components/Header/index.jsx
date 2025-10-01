import ShareIcon from '@/assets/icons/Share.svg?react';
import SaveIcon from '@/assets/icons/Save.svg?react'

import styles from './Header.module.scss';

const HotelHeader = ({ name }) => {
    return (
        <div className={styles.hotelHeader}>
            <h1>{name}</h1>
            <div style={{display: 'flex', gap: '20px'}}>
                <button>
                    <ShareIcon />
                    Share
                </button>
                <button>
                    <SaveIcon />
                    Save
                </button>
            </div>
        </div>
    )
}

export default HotelHeader;