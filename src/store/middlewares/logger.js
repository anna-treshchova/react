const logger = store => next => action => {
    if (!action.type.includes('counter/')) {
        console.log(`Action: ${action.type}`);
        console.log('');

        return next(action);
    }

    console.group(`Action: ${action.type}`);
    console.log('Prev state: ', store.getState());

    const result = next(action);

    console.log('New state: ', store.getState());
    console.groupEnd();
    console.log('');

    return result;
}

export default logger;




/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                                         Як працює middleware у Redux
                                        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

Redux викликає middleware покроково, по черзі:  dispatch(action)  →  middleware1  →  middleware2  →  reducer


                     Кожен middleware у Redux — це curried function by design з трьома рівнями:

  1. ПЕРШИЙ РІВЕНЬ: функція, яка приймає аргумент store

      1.1  Через замикання ми отримуємо доступ до store у внутрішніх функціях

      1.2  Фактично передається не весь store, а обмежений інтерфейс MiddlewareAPI, який містить функції:

                ◦ dispatch(newAction) — для відправки action
                ◦ getState() — для отримання стану

           —> Цього достатньо, щоб middleware міг:

                ◦ Отримати актуальний state через getState()

                ◦ Відправити новий action у Redux через dispatch(newAction), наприклад із даними, отриманими з
                  асинхронного виклику чи з початкового action


  2. ДРУГИЙ РІВЕНЬ: функція, яка приймає аргумент next

      2.1  Через замикання ми отримуємо доступ до функції next, яку пізніше викличемо й повернемо у третій функції,
           де міститься логіка middleware

              виклик next(action)
              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                  →  Запускає передачу action далі по ланцюгу middleware → reducer

                  →  Без нього action застрягне у цьому middleware і не дійде до reducer

                  →  АЛЕ якщо викликати без return  →  middleware нічого не поверне → результат стає undefined


              return next(action)  —> ОБОВ'ЯЗКОВО
              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                  →  Теж запускає передачу action далі, але додатково повертає результат назад угору по ланцюгу
                     (зазвичай сам action, іноді — інше значення, як у thunk)

                  →  Якщо цього не зробити  →  результатом виклику store.dispatch(action) у коді зовні буде undefined


      2.2  next(action) — це функція, яка:

             ◦ Викликає наступний middleware у ланцюжку та передає йому action
             ◦ Якщо це останній middleware, next(action) передає action безпосередньо в reducer



  3. ТРЕТІЙ РІВЕНЬ: функція, яка приймає action і виконує логіку middleware

      3.1  Аргументом є action, тобто те, що ми передали у dispatch(action)

      3.2  Це останній рівень curried function, саме тут виконується логіка middleware, а саме:

             ◦ Модифікація action перед тим, як передати його у reducer

             ◦ Логування —> console.log(action, getState())

             ◦ Виконання API запитів —> fetch()

             Саме тут ми використовуємо функціїї, до яких маємо доступ через замикання, а саме:

                  ◦ getState()

                  ◦ dispatch(newAction)

                  ◦ next(action) —> ОБОВ’ЯЗКОВО ВИКЛИКАЄТЬСЯ Й ПОВЕРТАЄТЬСЯ


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


const logger = store => next => action => {...}  —> карірована фукція

БЕЗ СКОРОЧЕНЬ:

function logger(store) {
  return function(next) {
    return function(action) {
      ...                       —>  код middleware
    }
  }
}

   ◦ Ми використовуємо каріровану функцію, щоб через замикання отримати доступ до store та next

   ◦ КЛЮЧОВА ІДЕЯ: Кожен рівень функції пам’ятає попередні аргументи завдяки замиканню



                                                 CURRIED FUNCTION
                                                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

Карірована функція — функція, що приймає аргументи по черзі: кожен виклик повертає нову функцію для наступного
аргументу, доки не будуть передані всі аргументи


ЗВИЧАЙНА ФУНКЦІЯ
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(2, 3, 4)); // 9



КАРІРОВАНА ВЕРСІЯ
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}

console.log(sum(2)(3)(4));


ЯК ПРАЦЮЄ:

 КРОК 1:  Викликаємо першу функцію: sum(2)

    1.1 Вона повертає як результат іншу функцію:

          function(b) {
            return function(c) {
              return a + b + c;
            }
          }                       —>  Тепер наш виклик виглядає так: function(3)(4)


    1.2 Аргумент a з першого виклику потрапляє в замикання, бо він використовується всередині функції:

          function(c) {
            return a + b + c;
          }


 КРОК 2:  Викликаємо другу функцію: function(3)(4)

    2.1 Вона повертає як результат іншу функцію:

          function(c) {
            return a + b + c;
          }                       —>  Тепер наш виклик виглядає так: function(3)(4)


    2.2 Аргумент b також потравляє в замикання


 КРОК 3:  Викликаємо третю функцію: function(4)   —>  остання функція

    Тіло функції:

          function(c) {
            return a + b + c;
          }

    ◦ Вона має доступ до аргументів a і b через замикання

    ◦ Плюсує їх разом й повертає результат 9


——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/