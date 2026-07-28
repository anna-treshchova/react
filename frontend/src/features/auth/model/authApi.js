import { baseApi } from '@/shared/api/baseApi.js';
import { saveToStorage, removeFromStorage } from '@/shared/lib/storage.js';

const {
    VITE_AUTH_SEND_CODE: SEND_CODE_URL,
    VITE_AUTH_VERIFY_CODE: VERIFY_CODE_URL,
    VITE_AUTH_LOGOUT: LOGOUT_URL,
} = import.meta.env;

export const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
       sendCode: builder.mutation({
           query: (email) => {
               const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
               const is12Hour = !!new Date().toLocaleString().match(/am|pm/i);

               return {
                   url: SEND_CODE_URL,
                   method: 'POST',
                   body: {
                       email,
                       timezone,
                       is12Hour,
                   }
               }
           },
       }),
       verifyCode: builder.mutation({
           query: (body) => ({
               url: VERIFY_CODE_URL,
               method: 'POST',
               body,
           }),

           async onQueryStarted (arg, { queryFulfilled, dispatch }) {
               try {
                   const { data } = await queryFulfilled;
                   saveToStorage('access_token', data.accessToken);

                   dispatch(baseApi.util.invalidateTags([
                       { type: 'Hotels' },
                       { type: 'HotelDetails' }
                   ]))
               } catch {
                   // Handled globally / via Redux slice
               }
           }
       }),
       logout: builder.mutation({
           query: () => ({
               url: LOGOUT_URL,
               method: 'POST',
           }),
           async onQueryStarted (arg, { queryFulfilled, dispatch }) {
               try {
                   await queryFulfilled;
               }
               catch {
                   // Ignore server error, log out locally regardless
               }

               removeFromStorage(['access_token', 'recent_search']);
               dispatch(baseApi.util.resetApiState())
           }
       })
   })
})

export const {
    useSendCodeMutation,
    useVerifyCodeMutation,
    useLogoutMutation
} = authApi;

/*——————————————————————————————————— Що прилітає в штучний проміс queryFulfilled ——————————————————————————————————————

 Рушій RTK Query перехоплює внутрішні Redux actions і перепаковує цінні дані з них в об'єкти, які передає як аргументи в
 resolve() та reject().


 Успішний запит:
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
      queryFulfilled.then((res) => { ... })

      res = {
        data: action.payload,   ——> Чисті дані від бекенда, які thunk записує в payload екшну з type: '.../fulfilled')
        meta: action.meta       ——> Службова інформація (requestId, тощо)
      }


 Помилка запиту:
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
      queryFulfilled.catch((err) => { ... })

      err = {
        error: action.payload,   ——> action.payload = { status, data }
        meta:  action.meta       ——> Така ж службова інформація запиту, як і в успіху
      }

————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

⚙️ Точний розподіл ролей: Thunk ➔ Middleware ➔ Reducer
У Redux потік даних завжди йде за суворим маршрутом. Ось справжня картина того, хто що робить в RTK Query:

1. Thunk (Виконавець запиту)

Робить реальний fetch на сервер.

Діспатчить життєвий цикл екшенів (наприклад, getHotels/pending, getHotels/fulfilled).

2. api.middleware (Регулювальник / Менеджер побічних ефектів)
Він стоїть на шляху між Thunk-ом та Reducer-ом (як і будь-яка мідлвара). Його задача — перехоплювати екшени і робити побічні дії (side effects), але він не змінює стан (state).

Керування підписками: Рахує, скільки компонентів зараз використовують ці дані.

Очищення кешу (Garbage Collection): Коли екшен каже, що компонент відмонтувався, мідлвара запускає таймер (keepUnusedDataFor). Якщо час вийшов, вона діспатчить екшен на видалення даних.

Реактивність (Tags): Якщо пролітає екшен мутації з invalidatesTags: ['Hotels'], мідлвара це бачить, перехоплює і каже: "О, теги змінилися! Я маю задіспатчити нові Thunk-и для всіх query, які мали тег 'Hotels'".

3. baseApi.reducer (Бухгалтер стану)
Ось хто насправді керує даними! Екшени, пройшовши через мідлвару, потрапляють у редьюсер.

Коли прилітає pending — редьюсер змінює в Redux-сторі прапорець isLoading: true.

Коли прилітає fulfilled — редьюсер бере корисне навантаження (payload) і фізично записує (зберігає) масив готелів у кеш Redux-стору, а також ставить isLoading: false.


📌 Функція onQueryStarted:

Це додатковий інструмент у конфігурації ендпоінту (query або mutation), який викликається синхронно в момент ініціалізації запиту (діспатчу Thunk-а).

• Коли працює: Формування запиту, сам запит та логіка всередині onQueryStarted йдуть паралельно.
• Аргументи: Приймає arg (те, що ми передали в хук) та об'єкт api (інструменти саме для цього ендпоінту).
• Проміс queryFulfilled: Знаходиться всередині об'єкта api. Це штучно створений проміс, який жорстко прив'язаний до внутрішнього Thunk-а цього запиту. Він резолвиться (успіх) або відхиляється (помилка) рівно в той момент, коли Thunk завершує свою роботу.
• Головна мета: Дозволяє нам втрутитися в процес (наприклад, зробити оптимістичне оновлення кешу) і дочекатися результату Thunk-а (await queryFulfilled) прямо на місці, не створюючи додаткових extraReducers.

 */