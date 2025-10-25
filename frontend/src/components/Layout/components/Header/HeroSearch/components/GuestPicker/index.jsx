import { useState, useEffect } from 'react';

import { Button, InputNumber, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './GuestPicker.module.scss'


const GuestPicker = ({
    guests,
    adults,
    children,
    infants,
    pets,
    onChange = () => {},
}) => {

    useEffect(() => {
        onChange('guests', adults + children);
    }, [adults, children]);

    useEffect(() => {
        if ((children > 0 || infants > 0 || pets > 0) && adults === 0) {
            onChange('adults', 1)
        }
    }, [children, infants, pets]);


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
        { key: 'adults', label: 'Adults', subtitle: 'Ages 13 or above', value: adults },
        { key: 'children', label: 'Children', subtitle: 'Ages 2 – 12', value: children },
        { key: 'infants', label: 'Infants', subtitle: 'Under 2', value: infants },
        { key: 'pets', label: 'Pets', subtitle: 'Bringing a service animal?', value: pets },
    ]

    const content = (
        <div className={styles.popoverContent} >
            {options.map(opt => (
                <div key={opt.key} className={styles.optionRow}>
                    <div className={styles.optionText}>
                        <span className={styles.optionLabel}>{opt.label}</span>
                        <span className={`${styles.optionSubtitle} ${opt.label === 'Pets' ? styles.pets : ''}`}>
                            {opt.subtitle}
                        </span>
                    </div>
                    <InputNumber
                        min={0}
                        value={opt.value}
                        onChange={(value) => onChange(opt.key, value)}
                        controls={true}
                        style={{ width: '64px' }}
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

export default GuestPicker;