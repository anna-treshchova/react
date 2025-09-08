export async function handleFetchResponse(res, customErrorMessage) {
    let data;

    try {
        data = await res.json();
    } catch (err) {
        console.error('Could not parse error response as JSON');
    }

    if (res.ok) return data;

    let errorMessage = data?.error
        || (res.status === 404 ? customErrorMessage : null)
        || (res.status >= 500
            ? 'Server error. Please try again later.'
            : 'Something went wrong. Please try again.' //дефолтне повіомлення
        );

    console.group('Request failed:');
    console.log('Status: ', res.status)
    console.log('Status Text: ', res.statusText)
    console.groupEnd();

    throw new Error(errorMessage);
}




/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


if (!res.ok) {
  let errorMessage = 'Oops! Could not add your task.'         —>  (1)

  try {
      const errorData = await res.json();                     —>  (2)
      if (errorData?.error) {                                 —>  (3)
          errorMessage = errorData.error                      —>  (4)
      }

  } catch (err) {
      console.warn('Could not parse error response as JSON')  —>  (6)
  }

  throw new Error(errorMessage)                               —>  (7)
}


 (1) Ініціалізуємо errorMessage дефолтним текстом — на випадок, якщо з беку нічого читабельного не прийде

 (2) Пробуємо прочитати тіло як JSON

       ЛОГІКА НА БЕКЕНДІ: Якщо щось не так, бекенд віддає нам JSON-об’єкт з полем error:

       return res.status(400).json({ error: 'Title is required' });


 (3) Перевірка errorData?.error через optional chaining:

       3.1  errorData — це результат await res.json()

              Теоретично там має бути об’єкт, але інколи може бути null, undefined або щось інше
              (наприклад, якщо бекенд повернув пусту відповідь)


       3.2  errorData?.error означає:

              ◦ Якщо errorData не null/undefined, тоді JS спробує взяти властивість .error

              ◦ Якщо ж errorData = null або undefined, вираз одразу поверне undefined,
                й помилки «Cannot read property 'error' of undefined» не буде


       3.3  У if (errorData?.error) ми перевіряємо:

              ◦ Чи взагалі є поле error у відповіді

              ◦ І чи воно має truthy значення (наприклад, 'Todo not found')


 (4) Якщо errorData?.error пройде перевірку, переписуємо дефолтне повідомлення текстом з бекенду

 (5) Якщо ж errorData?.error не пройде перевірку в повідомленні про помилку (errorMessage) залишеться дефолтне значення


 (6) Блок catch з попередженням спрацює лише якщо виклик await res.json() не зміг перетворити відповідь сервера на об’єкт

      НАПРИКЛАД:

          ◦ Якщо сервер повернув коректний JSON, навіть порожній ({}), await res.json() спрацює нормально
             —> catch не виконається

          ◦ Якщо сервер повернув не JSON (наприклад, чистий текст або HTML сторінку помилки),
            await res.json() спробує розпарсити і викине помилку  —> тоді спрацює catch


 (7) Кидаємо помилку з errorMessage, щоб thunk перейшов у rejected і Redux отримав payload з цим повідомленням

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/