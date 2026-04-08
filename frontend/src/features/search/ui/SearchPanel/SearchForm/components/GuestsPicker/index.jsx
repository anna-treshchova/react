import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, InputNumber, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import { GUESTS_OPTIONS, GUESTS_LIMITS } from '../../guests.constant.js'
import { buildGuestLabel } from './utils.js';
import { truncate } from '@/shared/utils';

import styles from './GuestsPicker.module.scss';
import formStyles from '@/features/search/ui/SearchPanel/SearchForm/SearchForm.module.scss';

const GuestsPicker = ({ guestCategories, guests, handleChange }) => {
    const isDisabled = useLayoutStore(state => state.isDisabled);

    const { infants, pets } = guestCategories;

    const label = useMemo(() => buildGuestLabel({
        guests,
        infants,
        pets,
    }), [guests, infants, pets]);

    const popoverContent = useMemo(() => (
        <div className={styles.popoverContent} >

            {GUESTS_OPTIONS.map(opt => {
                const isPets = opt.field === 'pets';
                const subtitleClassName = `${styles.subtitle} ${isPets ? styles.pets : ''}`;

                return (
                    <div key={opt.field} className={styles.item}>
                        <div className={styles.content}>
                            <span className={styles.title}>{opt.label}</span>
                            <span className={subtitleClassName}>
                            {opt.subtitle}
                        </span>
                        </div>

                        <InputNumber
                            min={0}
                            max={GUESTS_LIMITS[opt.field]}
                            value={guestCategories[opt.field]}
                            onChange={(value) => handleChange(opt.field, value ?? 0)}
                            controls={true}
                            className={styles.input}
                        />
                    </div>
                )
            })}

        </div>
    ), [guestCategories, handleChange]);

    if (isDisabled) return <div className={formStyles.stub}/>

    const textColor = guests === 0 ? '#bfbfbf' : '#000000E0';

    return (
        <Popover
            content={popoverContent}
            trigger='click'
            placement='bottomLeft'
        >
            <Button
                className={styles.button}
                style={{ '--btn-text-color': textColor }}
            >
                <span>
                    {guests === 0 ? 'Add guests' : truncate(label, 19)}
                </span>
                <DownOutlined className={styles.arrowIcon} />
            </Button>
        </Popover>
    )
}

GuestsPicker.propTypes = {
    guestsForm: PropTypes.shape({
        adults: PropTypes.number.isRequired,
        children: PropTypes.number.isRequired,
        infants: PropTypes.number.isRequired,
    }),
    handleChange: PropTypes.func.isRequired,
}

export default GuestsPicker;