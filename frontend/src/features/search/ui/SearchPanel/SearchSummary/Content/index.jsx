import Fields from './Fields';
import SearchButton from './SearchButton';

import HomeIcon from '@/assets/img/home.avif';

import styles from './Content.module.scss';

const Content = ({ destination, dates, guests }) => (
    <div className={styles.content}>
        <img
            src={HomeIcon}
            alt='Home'
            className={styles.icon}
        />
        <Fields
            destination={destination}
            dates={dates}
            guests={guests}
        />
        <SearchButton />
    </div>
)

export default Content;