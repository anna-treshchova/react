import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../../../store/slices/learningSlice';

import styles from './Filter.module.css';

const filters = [
    {value: 'all', label: 'All'},
    {value: 'not-started', label: 'Not started'},
    {value: 'in-progress', label: 'In progress'},
    {value: 'done', label: 'Done'},
]

export default function TopicFilter() {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state) => state.learning.filter);

    const handleFilterChange = (filter) => {
        dispatch(setFilter(filter));
    }

    return (
        <div className={styles.filter}>
            <h4>Filter by:</h4>
            {filters.map(filter =>
                <button
                    key={filter.value}
                    className={styles[`${currentFilter === filter.value && 'active'}`]}
                    onClick={() => handleFilterChange(filter.value)}
                >
                    {filter.label}
                </button>
            )}
        </div>
    )
}
