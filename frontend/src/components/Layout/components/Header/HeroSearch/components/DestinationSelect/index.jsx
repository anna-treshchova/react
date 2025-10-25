import { useSelector } from 'react-redux';

import { Select } from 'antd';

import styles from './DestinationSelect.module.scss'

const DestinationSelect = ({ value, onChange = () => {}}) => {
    const destinations = useSelector( state  => state.destinations.items);

    return (
        <Select
            value={value}
            className={styles.destinationDropdown}
            size='middle'
            showSearch
            placeholder='Seach destination'
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={destinations.map((destination) =>({
                value: destination.id,
                label: destination.label
            }))}
            onChange={onChange}
        />
    )
}

export default DestinationSelect;