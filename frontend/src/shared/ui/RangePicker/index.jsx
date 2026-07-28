import { DatePicker } from 'antd';
import styles from './RangePicker.module.scss';

const { RangePicker: AntdRangePicker } = DatePicker;

export const RangePicker = ({
    value,
    placeholder,
    size = 'middle',
    format='DD MMM',

    isMobile,
    disabledDate,

    onChange,
    onOpenChange,
}) => {
    return (
        <AntdRangePicker
            className={styles.input}
            value={value}
            placeholder={placeholder}
            size={size}
            format={format}

            disabledDate={disabledDate}

            classNames={{
                popup: {
                    root: styles.customDatePopup,
                },
            }}
            getPopupContainer={(trigger) =>
                isMobile ? document.body : trigger.parentElement
            }

            onChange={onChange}
            onOpenChange={onOpenChange}
        />
    )
}


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