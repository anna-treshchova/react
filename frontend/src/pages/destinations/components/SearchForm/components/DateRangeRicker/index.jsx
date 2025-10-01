import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import formStyles from '../../SearchForm.module.scss'
import dateStyles from './DateRangePicker.module.scss'

const { RangePicker } = DatePicker;

const DateRangePicker = ({
    setDates = () => {},
    setNights = () => {}
}) => {

    const disabledPastDates = (current) => {
        return current && current < dayjs().startOf('day');
    };

    const handleChange = (value) => {
        setDates(value);

        if (value && value.length === 2) {
            const [start, end] = value;
            const nights = (end.diff(start, 'day'));
            setNights(nights > 0 ? nights : 2)
        }
    }

    return (
        <div>
            <div className={formStyles.formTitle}>Date</div>
            <RangePicker
                className={dateStyles.rangePicker}
                disabledDate={disabledPastDates}
                size='middle'
                onChange={handleChange}
            />
        </div>
    )
}

export default DateRangePicker;


/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 1. const disabledPastDates = (current) => {}

       ◦  disabledPastDates — це функція, яка перевіряє кожну дату в календарі

       ◦ Вона приймає один аргумент — current

       ◦ current у Ant Design RangePicker — це дата-клітинка календаря, яку він малює (2025-09-27)

       ◦ Календар автоматично перебирає всі дати і викликає нашу функцію disabledPastDates для кожної


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