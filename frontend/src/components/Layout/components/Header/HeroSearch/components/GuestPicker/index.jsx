import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Button, InputNumber, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './GuestPicker.module.scss'


const GuestPicker = ({
    guestForm: { adults, children, infants },
    onChange,
}) => {
    const { guests, pets } = useSelector((state) => state.filters);

    useEffect(() => {
        onChange('guests', adults + children);
    }, [adults, children, onChange]);

    useEffect(() => {
        if ((children > 0 || infants > 0 || pets > 0) && adults === 0) {
            onChange('adults', 1)
        }
    }, [children, infants, pets, adults, onChange]);


    const pluralize = (count, singular, plural = `${singular}s`) => {
        return `${count} ${count > 1 ? plural : singular}`
    }

    const labelParts = [
        pluralize(guests, 'guest'),
        infants > 0 ? pluralize(infants, 'infant') : null,
        pets > 0 ? pluralize(pets, 'pet') : null,
    ]

    const label = labelParts.filter(Boolean).join(', ');
    const truncateLabel = (label, max = 19) => (label.length > max ? label.slice(0, max) + '...' : label);

    const options = [
        { field: 'adults', label: 'Adults', subtitle: 'Ages 13 or above', value: adults },
        { field: 'children', label: 'Children', subtitle: 'Ages 2 – 12', value: children },
        { field: 'infants', label: 'Infants', subtitle: 'Under 2', value: infants },
        { field: 'pets', label: 'Pets', subtitle: 'Bringing a service animal?', value: pets },
    ]

    const content = (
        <div className={styles.popoverContent} >
            {options.map(opt => (
                <div key={opt.field} className={styles.optionRow}>
                    <div className={styles.optionText}>
                        <span className={styles.optionLabel}>{opt.label}</span>
                        <span className={`${styles.optionSubtitle} ${opt.label === 'Pets' ? styles.pets : ''}`}>
                            {opt.subtitle}
                        </span>
                    </div>
                    <InputNumber
                        min={0}
                        value={opt.value}
                        onChange={(value) => onChange(opt.field, value)}
                        controls={true}
                        style={{width: '64px'}}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <Popover content={content} trigger='click' placement='bottomLeft'>
            <Button
                className={styles.popoverBtn}
                style={{ padding: '15px 12px' }}
            >
                {guests === 0 ? 'Add guests' : truncateLabel(label)}
                <DownOutlined style={{ color: '#bfbfbf', fontSize: 12 }}/>
            </Button>
        </Popover>
    )
}

GuestPicker.propTypes = {
    guestForm: PropTypes.shape({
        adults: PropTypes.number.isRequired,
        children: PropTypes.number.isRequired,
        infants: PropTypes.number.isRequired,
    }),
    onChange: PropTypes.func.isRequired,
}

export default GuestPicker;