import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectLayoutActions, useLayoutStore } from '@/shared/model';

import { useFetchMeQuery } from '@/entities/user';

import { selectHasToken } from '../model';

export const useRequireAuth = () => {
    const hasToken = useSelector(selectHasToken);

    const { openAuthModal } = useLayoutStore(selectLayoutActions);

    const {
        currentData: { me } = {},
        isLoading
    } = useFetchMeQuery(undefined, { skip: !hasToken });

   return useCallback(() => {
        if (isLoading) {
            return false;
        }

        if(!me) {
            openAuthModal()
            return false;
        }

        return true;
   }, [isLoading, me, openAuthModal])
}

/*
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                 Поля data та currentData у хуках RTK Query (useQuery)
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


 Ізоляція об'єкта хука:
═══════════════════════

     ◦ Об'єкт, який ми деструктуризуємо з хука (data, currentData, isLoading, isFetching), створюється і повністю
       контролюється самим хуком. Це не пряме посилання на зріз Redux-кешу, а локальна обгортка-абстракція над ним.


      Поле data:
═══════════════════════

     ◦ Належить екземпляру хука і зберігає останній успішний результат цього хука

     ◦ При зміні аргументів або під час повторного запиту (isFetching: true), коли в Redux-сторі для нових параметрів
       даних ще немає, data НЕ скидається в undefined.
       Вона утримує попередній успішний результат, поки не надійде новий, що запобігає блиманню UI.


   Поле currentData:
═══════════════════════

     ◦ Завжди є прямим, реактивним відображенням Redux-стору для поточних аргументів

     ◦ Якщо для нових аргументів дані ще не завантажилися — currentData стає undefined, поки data продовжує тримати
       старий результат


 Механіка skip: true:
═══════════════════════

     ◦ Повністю розриває зв'язок між хуком та Redux-кешем

     ◦ data заморожується на останньому успішному значенні і залишається такою до розмонтування компонента або зміни
       на skip: false

     ◦ currentData при skip: true повертає undefined


 Вплив resetApiState():
═══════════════════════

     ◦ При skip: false — очищення Redux-стору скидає data в undefined, бо хук підключений до стору і бачить його
       порожнім

     ◦ При skip: true — хук ігнорує очищення Redux-стору, оскільки зв'язок розірвано, і збережена data залишається
       недоторканою

*/