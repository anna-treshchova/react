import PropTypes from 'prop-types';
import { DatePicker as AntDatePicker } from 'antd';

import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import {
    disablePastDate,
    toDayjsDates,
    toDayjsStrings
} from './dates.utils.js';

import formStyles from '../../SearchForm.module.scss';
import styles from './DatePicker.module.scss';

const { RangePicker } = AntDatePicker;

const DatePicker = ({ dates, handleChange }) => {
    const parsedDates = toDayjsDates(dates);

    const isDisabled = useLayoutStore(state => state.isDisabled);
    const isMobile = useLayoutStore(state => state.isMobile);
    const setOverlayActive = useLayoutStore(state => state.setOverlayActive);

    const onChange = (pickerDates) => {
        if (!pickerDates) {
            handleChange('dates', [null, null]);
            return;
        }
        const formatedDates = toDayjsStrings(pickerDates);
        handleChange('dates', formatedDates);
    }

    if (isDisabled) return <div className={formStyles.stub}/>

    return (
        <RangePicker
            className={styles.input}

            value={parsedDates}
            placeholder={['Check in', 'Check out']}
            size='middle'
            format='DD MMM'
            disabledDate={disablePastDate}
            onChange={onChange}

            classNames={{
                popup: {
                    root: styles.customDatePopup,
                },
            }}
            getPopupContainer={(trigger) =>
                isMobile ? document.body : trigger.parentElement
            }
            onOpenChange={(open) => {
                isMobile && setOverlayActive(open)
            }}
        />
    )
}

DatePicker.propTypes = {
    dates: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default DatePicker;


/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 1. const disablePastDate = (current) => {}

       ◦  disablePastDate — це функція, яка перевіряє кожну дату в календарі

       ◦ Вона приймає один аргумент — current

       ◦ current у Ant Design RangePicker — це дата-клітинка календаря, яку він малює (2025-09-27)

       ◦ Календар автоматично перебирає всі дати і викликає нашу функцію disablePastDate для кожної


 2. current &&

       ◦ Перевірка: якщо current існує (не null або undefined), тоді виконуємо наступну перевірку

       ◦ Це захист від помилок, коли календар може передавати null


 3. current < dayjs().startOf('day')

       ◦ dayjs() — повертає поточну дату та час (2025-09-27T12:34:56  —> T це стандартний роздільник між датою та часом)

       ◦ .startOf('day') — обнуляє години, хвилини, секунди, залишаючи тільки дату

       ◦ <  —  тут перевіряє, чи дата current раніше за сьогоднішній день (2025-09-27T00:00:00)


 4. Повернення значення:

       ◦ Якщо current раніше за сьогодні, функція поверне true

       ◦ У Ant Design якщо disabledDate === true, дата заборонена для вибору

*/