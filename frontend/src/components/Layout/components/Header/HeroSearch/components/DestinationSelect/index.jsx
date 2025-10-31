import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Select } from 'antd';

import styles from './DestinationSelect.module.scss'

const DestinationSelect = ({ onChange }) => {

    const destinations = useSelector( state => state.destinations.items);
    const { id } = useSelector( state => state.filters.destination);

    const handleOnChange = (value, option) => {
        onChange('destination', { id: value, label: option.label });
    }
    return (
        <Select
            value={id}
            className={styles.destinationDropdown}
            size='middle'
            showSearch
            placeholder='Search destination'
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={destinations.map((d) =>({
                value: d.id,
                label: d.label
            }))}
            onChange={handleOnChange}
        />
    )
}

DestinationSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default DestinationSelect;