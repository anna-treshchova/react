import { useUIStore, selectIsMobile, selectUIActions } from '@/shared/model/uiStore/index.js';

import {
    disablePastDate,
    toDayjsDates,
    toDayjsStrings
} from './dates.utils.js';

import { RangePicker } from '@/shared/ui/RangePicker/index.jsx';

export const DateRangePicker = ({ dates, handleChange }) => {
    const isMobile = useUIStore(selectIsMobile);
    const { setHeaderOverlay } = useUIStore(selectUIActions);

    const parsedDates = toDayjsDates(dates);

    const onChange = (pickerDates) => {
        if (!pickerDates) {
            handleChange('dates', [null, null]);
            return;
        }
        const formatedDates = toDayjsStrings(pickerDates);
        handleChange('dates', formatedDates);
    }

    const onOpenChange = (open) => {
        if (isMobile) {
            setHeaderOverlay(open)
        }
    }

    return (
        <RangePicker
            value={parsedDates}
            placeholder={['Check in', 'Check out']}

            isMobile={isMobile}
            disabledDate={disablePastDate}

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