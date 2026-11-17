import { useMemo } from 'react';

import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import { CounterRow } from '@/shared/ui/CounterRow';
import { PopoverButton } from '@/shared/ui/PopoverButton';
import { pluralize } from '@/shared/lib/text';

import type { GuestCategories } from '@/entities/search';

import type { FormActions } from '../../../model';
import { GUESTS_OPTIONS, GUESTS_LIMITS } from './guests.constants';
import styles from './GuestsPicker.module.scss';

interface GuestsPickerProps {
    guestCategories: GuestCategories;
    guests: number;
    handleChange: FormActions['setGuestCategory']
}

export const GuestsPicker = ({
    guestCategories,
    guests,
    handleChange
}: GuestsPickerProps) => {
    const isMobile = useUIStore(selectIsMobile);

    const { infants, pets } = guestCategories;

    const label = useMemo(() => buildGuestLabel(
        guests,
        infants,
        pets,
    ), [guests, infants, pets]);

    const popoverContent = useMemo(() => (
        <div className={styles.popoverContent}>
            {GUESTS_OPTIONS.map(opt => {
                return (
                    <CounterRow
                        key={opt.field}
                        label={opt.label}
                        description={opt.description}
                        descriptionVariant={opt.field === 'pets' ? 'underline' : 'default'}
                        value={guestCategories[opt.field]}
                        min={0}
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

const buildGuestLabel = (
    guests: number,
    infants: number,
    pets: number
): string => {
    let labelParts: string[] = [];

    if (guests) labelParts.push(pluralize(guests, 'guest'))
    if (infants) labelParts.push(pluralize(infants, 'infant'))
    if (pets) labelParts.push(pluralize(pets, 'pet'))

    return labelParts.join(', ');
}