import Container from '@/components/Container';
import HotelsList from '@/components/UI/organisms/HotelsList';

import styles from './Home.module.scss';

const Home = () => {
    return (
        <div className={styles.home}>
            <Container>
                <HotelsList />
            </Container>
        </div>
    )
}

export default Home;