import { PAGE_SIZE } from '@/shared/config';
import { fetchCriticalData } from '@/shared/lib/router.js';
import { calcTotalGuests } from '@/shared/lib/guests.js';

import { hotelsApi } from '@/entities/hotels';
import { mapSearchParamsToFormState } from '@/entities/search';

import { store } from '../providers/StoreProvider';

export const hotelsLoader = async ({ request }) => {
    const url = new URL(request.url);

    const { destination, guestCategories } = mapSearchParamsToFormState(url.searchParams);
    const page = url.searchParams.get('page') || 1;

    const guests = calcTotalGuests(guestCategories);

    const rawQueryArgs = {
        page,
        limit: PAGE_SIZE,
        destinationId: destination?.id,
        guests,
        pets: guestCategories.pets
    }

    const queryArgs = removeEmptyArgs(rawQueryArgs);

    await fetchCriticalData(
        store.dispatch,
        hotelsApi.endpoints.getHotels.initiate,
        queryArgs,
    )

    return queryArgs;
}

const removeEmptyArgs = (args) => {
    return Object.fromEntries(
        Object.entries(args).filter(([_,  value]) => Boolean(value))
    )
}



/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

 1. React Router викликає loader при

       ◦ першому відкритті сторінки

       ◦ navigate(...)

       ◦ зміні query params

       ◦ refresh сторінки


    Й передає йому як аргумент об'єкт з параметрами:

         hotelsLoader({
           request,  ─> нам потрібен лише request
           params,
           context
         })

────────────────
 2. request — це стандартний Web Request (той самий тип, який використовується у fetch)

    У ньому є:

       ◦ request.url  ─> нам потрібен

       ◦ request.method

       ◦ request.headers

       ◦ request.body


    Приклад request.url:  http://localhost:5173/?page=2&destinationId=rome&guests=3

────────────────
 3. const url = new URL(request.url) ─ створюємо об’єкт URL

    URL ─ це вбудований JS клас, який отримує рядок URL й вміє розбирати його на частини


       Рядок:
                http://localhost:5173/?page=2&destinationId=rome&guests=3

       Перетворюється у об'єкт:

                ◦ url.protocol ─ http

                ◦ url.hostname ─ localhost

                ◦ url.pathname ─  /

                ◦ url.search ─ ?page=2&destinationId=rome&guests=3

                ◦ url.searchParams ─ об'єкт який дозволяє читати параметри (query params)   ─> нам потрібен


 4. url.searchParams — об’єкт для роботи з query params

    url.searchParams — це об’єкт URLSearchParams, який дозволяє читати параметри з URL

         Наприклад: const page = Number(url.searchParams.get('page') ?? 1);

         ВАЖЛИВО: query params завжди повертаються як string


──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
