import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useUIStore, selectIsMobile } from '@/shared/model/uiStore/index.js';
import { CounterRow } from '@/shared/ui/CounterRow/index.jsx';
import { PopoverButton } from '@/shared/ui/PopoverButton/index.jsx';
import { pluralize } from '@/shared/lib/text.js';

import { GUESTS_OPTIONS, GUESTS_LIMITS } from './guests.constants.js';
import styles from './GuestsPicker.module.scss';

const buildGuestLabel = ({ guests, infants, pets }) => {
    let labelParts = [];

    if (guests) labelParts.push(pluralize(guests, 'guest'))
    if (infants) labelParts.push(pluralize(infants, 'infant'))
    if (pets) labelParts.push(pluralize(pets, 'pet'))

    return labelParts.join(', ');
}

export const GuestsPicker = ({ guestCategories, guests, handleChange }) => {
    const isMobile = useUIStore(selectIsMobile);

    const { infants, pets } = guestCategories;


    const label = useMemo(() => buildGuestLabel({
        guests,
        infants,
        pets,
    }), [guests, infants, pets]);

    const popoverContent = useMemo(() => (
        <div className={styles.popoverContent} >
            {GUESTS_OPTIONS.map(opt => {
                return (
                    <CounterRow
                        key={opt.field}
                        title={opt.title}
                        subtitle={opt.subtitle}
                        subtitleVariant={opt.field === 'pets' ? 'underline' : 'default'}

                        value={guestCategories[opt.field]}
                        min='0'
                        max={GUESTS_LIMITS[opt.field]}
                        onChange={(value) => handleChange(opt.field, value ?? 0)}
                    />
                )
            })}
        </div>
    ), [guestCategories, handleChange]);

    return (
        <div className={styles.guestsPicker}>
            <PopoverButton
                content={popoverContent}
                placeholder='Add guests'
                value={label}
                maxValueWidth={isMobile ? '100%' : '124px'}
            />
        </div>
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