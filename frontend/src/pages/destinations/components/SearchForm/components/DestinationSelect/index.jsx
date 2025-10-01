import { useSelector } from 'react-redux';

import { Select } from 'antd';

import formStyles from '../../SearchForm.module.scss'
import destinationStyles from './DestinationSelect.module.scss'

const DestinationSelect = ({ onChange }) => {
    const destinations = useSelector( state  => state.destinations.items);

    return (
        <div>
            <div className={formStyles.formTitle}>Where</div>
            <Select className={destinationStyles.destinationDropdown}
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
        </div>
    )
}

export default DestinationSelect;