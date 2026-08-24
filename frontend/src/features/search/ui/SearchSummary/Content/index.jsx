import homeImage from '@/shared/assets/img/home.avif';
import Fields from './Fields';
import SearchButton from './SearchButton';
import styles from './Content.module.scss';

export const SummaryContent = ({ destination, dates, guests }) => {
    return (
        <div className={styles.content}>
            <img
                src={homeImage}
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