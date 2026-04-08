import PropTypes from 'prop-types';

import BackButton from '@/shared/ui/BackButton/index.jsx';
import ShareIcon from './icons/Share.jsx';
import SaveIcon from './icons/Save.jsx'


import { Grid } from 'antd'
import styles from './Header.module.scss';

const { useBreakpoint } = Grid;

const actions = [
    { label: 'Share', icon: ShareIcon },
    { label: 'Save', icon: SaveIcon }
];

const HotelHeader = ({ name }) => {
    const screens = useBreakpoint();

    return (
        <div className={styles.header}>
            {screens.md ? <h1>{name}</h1> : <BackButton />}

            <div className={styles.btnBox}>
                {actions.map(({ label, icon: Icon }) => (
                    <button key={label} className={styles.headerBtn}>
                        <Icon strokeWidth={screens.md ? 2 : 2.5}/>
                        {screens.md && label}
                    </button>
                ))}
            </div>
        </div>
    )
}

HotelHeader.propTypes = {
    name: PropTypes.string.isRequired,
}

export default HotelHeader;