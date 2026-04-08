import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import { useLayoutStore } from '@/app/layout/useLayoutStore.js';

import styles from './DestinationSelect.module.scss';
import formStyles from '@/features/search/ui/SearchPanel/SearchForm/SearchForm.module.scss';

const DestinationSelect = ({ destinationId, handleChange }) => {
    const destinations = useSelector(state => state.destinations.items);

    const isDisabled = useLayoutStore(state => state.isDisabled);

    if (isDisabled) return <div className={formStyles.stub}/>

    return (
        <Select
            value={destinationId ?? undefined}
            allowClear
            className={styles.destinationDropdown}
            size='middle'
            showSearch
            placeholder='Search destination'
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={destinations.map(d =>({
                value: d.id,
                label: d.label
            }))}
            onChange={(value, option) => {
                if (!value) {
                    handleChange('destination', { id: null, label: null });
                    return;
                }
                handleChange('destination', {
                    id: option.value,
                    label: option.label
                });
            }}
        />
    )
}

DestinationSelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
}

export default DestinationSelect;