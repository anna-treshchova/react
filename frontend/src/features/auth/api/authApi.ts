import { baseApi } from '@/shared/api/baseApi';
import { saveToStorage, removeFromStorage } from '@/shared/lib/local-storage';

const {
    VITE_AUTH_SEND_CODE: SEND_CODE_URL,
    VITE_AUTH_VERIFY_CODE: VERIFY_CODE_URL,
    VITE_AUTH_LOGOUT: LOGOUT_URL,
} = import.meta.env;

interface SendCodeResponse {
    verification: {
        email: string;
        expiresInMs: number;
    }
    retryAfterMs: number;
}

interface VerifyCodeRequest {
    email: string;
    code: string;
}

interface VerifyCodeResponse {
    accessToken: string;
}

export const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
       sendCode: builder.mutation<SendCodeResponse, string>({
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
       verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeRequest>({
           query: (body) => ({
               url: VERIFY_CODE_URL,
               method: 'POST',
               body,
           }),

           invalidatesTags: (_result, error) =>
               error ? [] : ['Hotels', 'HotelDetails'],

           async onQueryStarted (_arg, { queryFulfilled }) {
               try {
                   const { data } = await queryFulfilled;
                   saveToStorage('access_token', data.accessToken);
               } catch {
                   // Handled globally / via Redux slice
               }
           }
       }),
       logout: builder.mutation<void, void>({
           query: () => ({
               url: LOGOUT_URL,
               method: 'POST',
           }),
           async onQueryStarted (_arg, { queryFulfilled, dispatch }) {
               try {
                   await queryFulfilled;
               } catch {
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

  Рушій RTK Query перехоплює внутрішні Redux actions і перепаковує цінні дані з них в об'єкти, які передає як аргументи
  в resolve() та reject().


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





════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                📍 Типізація RTK Query (ендпоінтів у фічах)
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  У кожному ендпоінті у фічі ми вказуємо тип аргументу, який передаємо для запуску запиту (через хук або функцію-тригер)
  а також тип даних, які очікуємо отримати від сервера у разі успішного виконання запиту.

  Ця типізація відбувається через передачу двох параметрів типу в методи білдера: builder.query та builder.mutation.



  Тобто, коли ми визначаємо endpoint через builder.query() або builder.mutation(), ці методи є generic-методами, які
  очікують два параметри типу: <ResponseType, ArgumentType>:


       1. Перший Type Parameter: ResponseType

             ◦ Тип даних, які ми очікуємо отримати від сервера після успішного виконання запиту

             ◦ Якщо бекенд не повертає тіло відповіді — пишемо void


       2. Другий Type Parameter: ArgumentType

             ◦ Тип аргументу, який ми передаємо при запуску запиту: безпосередньо в query-хук або у функцію-тригер,
               отриману з lazy query-хука чи mutation-хука

             ◦ Якщо запит не приймає аргументів — пишемо void




             ────────────────  📍 Використання query та mutation hooks та triggers для запуску запитів  ────────────────

                  builder.query()
                  ───────────────

                       Для query RTK Query генерує два основні варіанти хуків:

                             1. useGetHotelsQuery(queryArgs) — викликаємо хук і передаємо аргументи безпосередньо в
                                нього.

                                Запит запускається автоматично при першому використанні хука у вмонтованому компоненті
                                й повторно при зміні його аргументів.

                                       ┌──────────────────────────  Звичайний query  ──────────────────────────┐
                                       │                                                                       │
                                       │  const { data, isLoading } = useGetHotelsQuery(queryArgs);            │
                                       │                                                                       │
                                       └───────────────────────────────────────────────────────────────────────┘



                             2. useLazyGetHotelsQuery() — викликаємо хук, дістаємо з нього функцію-тригер і самостійно
                                вирішуємо, коли запускати запит.


                                       ┌────────────────────────────  Lazy query  ─────────────────────────────┐
                                       │                                                                       │
                                       │   const [getHotels, { data, isLoading }] = useLazyGetHotelsQuery();   │
                                       │                                                                       │
                                       │   getHotels(queryArgs); // Запускаємо запит у потрібний момент        │
                                       │                                                                       │
                                       └───────────────────────────────────────────────────────────────────────┘




                  builder.mutation()
                  ──────────────────

                        Для mutation використовуємо хук, з якого отримуємо функцію-тригер. Запит не запускається
                        автоматично — ми самостійно викликаємо цю функцію в потрібний момент.

                                       ┌─────────────────────────────  Mutation  ──────────────────────────────┐
                                       │                                                                       │
                                       │   const [sendCode, { data, isLoading }] = useSendCodeMutation();      │
                                       │                                                                       │
                                       │   sendCode(email); // Запускаємо запит                                │
                                       │                                                                       │
                                       └───────────────────────────────────────────────────────────────────────┘



══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════*/