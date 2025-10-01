import { useState, useEffect } from 'react';

import { Button, InputNumber, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import formStyles from '../../SearchForm.module.scss'
import styles from './GuestPicker.module.scss'


const GuestPicker = ({
    guests,
    setGuests = () => {},
    pets,
    setPets = () => {},
}) => {
    const [adults, setAdults] = useState(1);
    const [children,  setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setGuests(adults + children);
    }, [adults, children]);


    const handleChange = (setter) => (value) =>  setter(value);

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
        { label: 'Adults', subtitle: 'Ages 13 or above', value: adults, min: 1, setter: setAdults },
        { label: 'Children', subtitle: 'Ages 2 – 12', value: children, min: 0, setter: setChildren },
        { label: 'Infants', subtitle: 'Under 2', value: infants, min: 0, setter: setInfants },
        { label: 'Pets', subtitle: 'Bringing a service animal?', value: pets, min: 0, setter: setPets },
    ]

    const content = (
        <div className={styles.popoverContent} >
            {options.map(opt => (
                <div key={opt.label} className={styles.optionRow}>
                    <div className={styles.optionText}>
                        <span className={styles.optionLabel}>{opt.label}</span>
                        <span className={`${styles.optionSubtitle} ${opt.label === 'Pets' ? styles.pets : ''}`}>
                            {opt.subtitle}
                        </span>
                    </div>
                    <InputNumber
                        min={opt.min}
                        value={opt.value}
                        onChange={handleChange(opt.setter)}
                        style={{ width: '64px' }}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className={formStyles.formTitle}>Who</div>
            <Popover
                content={content}
                trigger='click'
                placement='bottomLeft'
                onOpenChange={() => setClicked(true)}
            >
                <Button
                    className={styles.popoverBtn}
                    style={{ padding: '15px 12px' }}
                >
                    {!clicked ? 'Add guests' : truncateLabel(label)}
                    <DownOutlined style={{ color: '#bfbfbf', fontSize: 12 }}/>
                </Button>
            </Popover>
        </div>
    )
}

export default GuestPicker;