import { useState } from 'react';
import { Grid } from '@mui/material';

import InterviewButton from './Button';
import InterviewModal from './Modal';

const styles = {
    grid: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        px: 1.5,
        position: 'relative',
    }
}

const InterviewPicker = () => {
    const [open, setOpen] = useState(false);
    const handleToggle = () => setOpen(prev => !prev);

    return (
        <Grid item sx={styles.grid}>
            <InterviewButton onClick={handleToggle} />
            <InterviewModal
                open={open}
                setOpen={setOpen}
                handleToggle={handleToggle}
            />
        </Grid>
    );
};

export default InterviewPicker;


/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                                      dayjs — бібліотека для роботи з датами
                                     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

   ЩО ЦЕ: Це зовнішня JS-бібліотека, тобто не частина React чи MUI

   ПОТРІБНА для того, щоб:

         ◦ створювати дати — dayjs()

         ◦ змінювати їх — add (додавати), subtract (віднімати), тощо

         ◦ форматувати — format

         ◦ порівнювати — isBefore, isAfter

   ПРИКЛАД:

         import dayjs from 'dayjs';

         const now = dayjs();                              // поточна дата й час
         const tomorrow = now.add(1, 'day');               // додати 1 день
         const formatted = tomorrow.format('DD.MM.YYYY');  // формат 06.10.2025


   ПІДСУМОК: dayjs — це механізм, який розуміє, що таке дата, і як із нею працювати


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                                   AdapterDayjs — адаптер між dayjs і MUI Pickers
                                  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

   ЩО ЦЕ: Це перекладач між бібліотекою dayjs і компонентами MUI (DatePicker, TimePicker, DateTimePicker)

   MUI сам не вміє працювати з датами напряму.
   Він очікує, що ми вкажемо йому яку date бібліотеку ми використовуємо (dayjs, moment.js, або date-fns)

   НАПРИКЛАД: Я використовую dayjs —> Ось адаптер, який пояснить, як працювати з цими датами

   Тому MUI має різні адаптери:

         ◦ AdapterDayjs
         ◦ AdapterMoment
         ◦ AdapterDateFns

   ПРИКЛАД:  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
   ↓
   Й коли ми передаємо цей адаптер у LocalizationProvider, MUI розуміє:
   ↓
   "Усі компоненти дат у цьому додатку будуть працювати через dayjs"


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                          LocalizationProvider — контекст для локалізації та формату дати
                         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


   ЩО ЦЕ: Це React-контейнер (провайдер), який огортає компоненти календаря/таймпікера і:

         ◦ визначає яку бібліотеку для дат використовувати (через адаптер)

         ◦ налаштовує локалізацію (мову, формат дат, перший день тижня)

         ◦ дає MUI доступ до всіх функцій обраної бібліотеки (dayjs, moment тощо)


   ПРИКЛАД:

         <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker value={value} onChange={setValue} />
         </LocalizationProvider>

   Тут LocalizationProvider робить дві важливі речі:

         ◦ Говорить DatePicker, що дати треба обробляти через dayjs

         ◦ Забезпечує єдиний контекст форматування:

             Щоб усі компоненти, які показують або вибирають дату/час (наприклад DatePicker, TimePicker)
             використовували однакові правила — однакову мову, перший день тижня, часовий формат тощо

*/




