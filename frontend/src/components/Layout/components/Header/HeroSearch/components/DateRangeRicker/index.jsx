import { DatePicker, Grid } from 'antd';
import dayjs from 'dayjs';

import dateStyles from './DateRangePicker.module.scss'

const { RangePicker } = DatePicker;

const { useBreakpoint } = Grid;

const DateRangePicker = ({ value, onChange = () => {} }) => {
    const screens = useBreakpoint();

    const maxWidth = screens.xs ? 180 : screens.sm ? 220 : 240;

    const disabledPastDates = (current) => {
        return current && current < dayjs().startOf('day');
    };

    return (
        <RangePicker
            classNames={{
                popup: {
                    root: 'myRangePickerPopup'
                }
            }}
            value={value}
            className={dateStyles.rangePicker}
            disabledDate={disabledPastDates}
            size='middle'
            format='DD MMM'
            onChange={onChange}
            placeholder={['Check in', 'Check out']}
            style={{ maxWidth: maxWidth}}
        />
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