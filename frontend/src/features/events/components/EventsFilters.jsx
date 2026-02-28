import { Select, Input } from 'antd';

const { Option } =  Select;

const EventsFilters = ({
    destinations,
    selectedDestination,
    searchQuery,
    onDestinationChange,
    onSearchChange
}) => {
    return (
        <div className='flex gap-1'>
            <Select
                value={selectedDestination}
                className='min-w-48'
                placeholder='Select city'
                onChange={onDestinationChange}
            >
                {destinations.map(item => (
                    <Option key={item.id} value={item.id}>{item.label}</Option>
                ))}
            </Select>
            <Input
                placeholder='Search by title or instructor...'
                value={searchQuery}
                onChange={onSearchChange}
                style={{width: 215}}
            />
        </div>
    )
}
export default EventsFilters;