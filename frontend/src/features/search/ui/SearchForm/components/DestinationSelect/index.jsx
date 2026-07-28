import { useMemo } from 'react';
import { Select } from '@/shared/ui/Select';

export const DestinationSelect = ({ destinations, destination, handleChange }) => {
    const options = useMemo(() => {
       return destinations.map(d =>({
           value: d.id,
           label: d.label
       }));
    }, [destinations]);

    const value = destination?.id
        ? { value: destination.id, label: destination.label ?? '' }
        : undefined

    const onChange = (value) => {
        if (!value) {
            handleChange('destination', { id: null, label: null });
            return;
        }
        handleChange('destination', { id: value.value, label: value.label });
    }

    return (
        <Select
            value={value}
            options={options}

            placeholder='Search destination'

            labelInValue
            allowClear
            showSearch
            optionFilterProp='label'

            onChange={onChange}
        />
    )
}