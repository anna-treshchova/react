import store from '@/store';
import { fetchHotels } from './hotelsThunk.js';

import { parseSearchParams, calcTotalGuests } from '@/shared/utils';

const {
    VITE_BASE_URL: BASE_URL,
    VITE_HOTELS: HOTELS_URL
} = import.meta.env;

export async function hotelsLoader({ request }) {
    const url = new URL(request.url);

    const { page, destination, guestCategories } = parseSearchParams(url.searchParams);
    const { adults, children, pets } = guestCategories;

    const guests = calcTotalGuests(adults, children);

    store.dispatch(fetchHotels({
        page,
        destinationId: destination.id,
        guests,
        pets
    }));

    return null;
}

export async function hotelDetailsLoader({ params }) {
    try {
        const { id } = params;

        const res = await fetch(`${BASE_URL}${HOTELS_URL}/${id}`);

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Hotel not found.');
        }
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
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

