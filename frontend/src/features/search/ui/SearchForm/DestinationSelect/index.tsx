import { useMemo } from 'react';
import { Select } from '@/shared/ui/Select';

import type { FormActions, FormState } from '../../../model';
import type { Destination } from '@/entities/destinations';

interface DestinationSelectProps {
    destinations: Destination[];
    destination: FormState['destination'];
    handleChange: FormActions['setFields'];
}

type DestinationOption = {
    value: Destination['id'],
    label: Destination['label'],
};

type DestinationValue = DestinationOption | undefined;

export const DestinationSelect = ({
    destinations,
    destination,
    handleChange
}: DestinationSelectProps) => {

    const options: DestinationOption[] = useMemo(() => {
       return destinations.map(d =>({
           value: d.id,
           label: d.label
       }));
    }, [destinations]);

    const value: DestinationValue = destination?.id
        ? { value: destination.id, label: destination.label ?? '' }
        : undefined

    const onChange = (value: DestinationValue): void => {
        if (!value) {
            handleChange('destination', { id: null, label: null });
            return;
        }
        handleChange('destination', { id: value.value, label: value.label });
    }

    return (
        <Select<DestinationValue, DestinationOption>
            value={value}
            options={options}
            placeholder='Search destination'

            labelInValue
            allowClear
            showSearch={{
                optionFilterProp: 'label'
            }}

            onChange={onChange}
        />
    )
}