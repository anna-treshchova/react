import { useState } from 'react';

function memoize(fn) {
    const cache = {};      //  Змінна cache створюється під час виклику memoize(fn) й живе всередині цієї функції
                           //  ТОБТО: вона недоступна зовні напряму, але залишається доступною внутрішній функції, яку повертає memoize(), через замикання (closure)

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache[key] !== undefined) {
            console.log('Cache:')
            console.log(cache)
            console.log("")
            return cache[key];
        }

        console.log('Calculating...');
        const result = fn(...args);
        cache[key] = result;

        console.log(cache)
        console.log("")

        return result;
    }
}

function slowFunction(num) {   // Це штучно сповільнена функція — її мета імітувати довге обчислення
    let sum = 0;
    for (let i = 1; i < 100000; i++) {
        sum += i;
    }
    return Math.floor(sum/1000000000) * num;  // sum = 4
}

const memoizedSlowFunction = memoize(slowFunction);  //  Зберігаємо результат виклику memoize(slowFunction) — тобто нову функцію — в змінну memoizedSlowFunction

                                                         //  memoize(slowFunction) — саме у цей момент створюється нова область видимості для memoize(fn)
                                                         //  В ній оголошується нова змінна cache = {} й повертається внутрішня функція (яка запам’ятовує cache як замикання)
export default function MemoizeFunctionExample() {
    const [count, setCount] = useState(0);

    const result = memoizedSlowFunction(count);    //  При виклику memoizedSlowFunction() — всередині буде використовуватись та сама cache
                                                         //  Й лише окремий виклик memoize(fn) створить окрему cache, бо це нова область виконання
    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increase</button>

            <div style={{ margin: '10px 0' }}>Counter: {count}</div>
            <div style={{ margin: '10px 0' }}>Result: {result}</div>

            <button onClick={() => setCount(count - 1)}>Decrease</button>
        </>
    );
}


/*‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                                                      ЯК ПРАЦЮЄ:

 1. const memoizedSlowFunction = memoize(slowFunction)

     1.1  У компоненті App викликаємо функцію memoize(), передаючи як аргумент slowFunction

     1.2  У memoize(fn) ми не викликаємо fn — лише повертаємо нову функцію, яку зберігаємо в змінну memoizedSlowFunction


 2. memoizedSlowFunction — це нова функція, яка приймає будь яку кількість аргументів

     2.1  ...args — це rest-оператор, який збирає всі передані аргументи з memoizedSlowFunction(count) у масив args
          Він використовується, коли кількість аргументів невідома

     2.2  const key = JSON.stringify(args) — переводимо масив аргументів у рядок, щоб використати його як ключ у cache

     2.3  Якщо результату з таким ключем ще немає в cache — викликаємо fn з переданими аргументами:

            const result = fn(...args)

          тут ...args — це вже spread оператор, він розпаковує масив назад в окремі значення)


‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 memoize(fn) — це HIGHER-ORDER FUNCTION:

  Вона приймає як аргумент callback-функцію й повертає нову функцію з розширеною поведінкою, не змінюючи оригінал


 ТОБТО:
         1. memoize() приймає slowFunction як аргумент — функцію, яку ми хочемо мемоізувати

         2. memoize():

               ◦ Повертає нову функцію, яку ми зберігаємо в змінну memoizedSlowFunction

               ◦ Також за допомогою memoize() ми інкапсулюємо змінну cache:

                    • створюємо замикання, щоб cache зберігався між викликами memoizedSlowFunction
                    • але не був доступний зовні

         3. Коли ми викликаємо memoizedSlowFunction(counter), вона всередині себе викликає slowFunction(num), але
            додає до цього ще додаткову логіку, А САМЕ:

               ◦ Виконує кешування результатів

               ◦ Використовує кеш при повторних викликах із тими самими аргументами

               ◦ Всередині себе викликає slowFunction(counter) (тільки якщо результат ще не закешований)


‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾*/

