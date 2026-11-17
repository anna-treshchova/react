import homeImage from '@/shared/assets/img/home.avif';
import { Fields, type FieldsProps }from './Fields';
import { SearchButton } from './SearchButton';
import styles from './Content.module.scss';

export const SummaryContent = (props: FieldsProps) => {
    return (
        <div className={styles.content}>
            <img
                src={homeImage}
                alt='Home'
                className={styles.icon}
            />
            <Fields {...props} />
            <SearchButton />
        </div>
    )
}