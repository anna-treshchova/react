import homeIcon from '@/shared/assets/img/home.avif';

import Fields from './Fields/index.jsx';
import SearchButton from './SearchButton';

import styles from './Content.module.scss';

export const SummaryContent = ({ destination, dates, guests }) => {
        return (
            <div className={styles.content}>
                    <img
                        src={homeIcon}
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
}