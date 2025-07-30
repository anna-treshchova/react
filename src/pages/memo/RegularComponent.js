import { memo } from 'react'

function RegularComponent({anotherState}) {
    console.log('Rendering RegularComponent');

    return (
        <div className='regular-component'>
            <h2>Regular Component</h2>
        </div>
    )
}

export default memo(RegularComponent);    //  ЗАСТОСОВУЄМО ЯКЩО:
                                                     //    ◦ компонент взагалі не залежить від пропсів
                                                     //    ◦ або якщо його пропси - це примітиви


// export default memo(RegularComponent, (prevProps, nextProps) => { // ЗАСТОСОВУЄМО ЯКЩО ПРОПСОМ Є REFERENCE TYPE
//   return prevProps.someObject.value === nextProps.someObject.value;
// });


/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


 1.  memo(RegularComponent) — мемоізує компонент, щоб уникнути непотрібних ререндерів

 2.  Другий аргумент у memo — функція порівняння: areEqual(prevProps, nextProps)
     ПОВЕРТАЄ TRUE, ЯКЩО РЕРЕНДЕР НЕ ПОТРІБЕН (тобто пропси однакові)

        Використовується, коли у props передаються складні типи даних (reference types: об’єкти, масиви, функції)


        НАВІЩО ПОТРІБЕН ДРУГИЙ АРГУМЕНТ:

            ◦ React порівнює пропси через === (строге порівняння)

            ◦ Для reference types це порівняння адреси в пам’яті, а не вмісту

            ◦ При ререндері батьківсьвого компонента:

                 Якщо перестворюється об'єкт (з тим самим вмістом), який передається як пропс — React сприймає його як
                 новий, бо змінилася адреса в пам’яті

                 Через це memo(RegularComponent) не працює: буде завжди повертати false  ⟶  ПРОПСИ НЕ ОДНАКОВІ,
                 ПОТРІБЕН РЕРЕНДЕР


                 САМЕ ТУТ І ДОПОМАГАЄ ДРУГИЙ АРГУМЕНТ (ручне порівняння):

                    export default memo(RegularComponent, (prevProps, nextProps) => {
                       return prevProps.someObject.value === nextProps.someObject.value;  // true
                    });

                 Це дозволяє вручну сказати React, що ці пропси — ПО СУТІ ТІ САМІ  ⟶  РЕРЕНДЕР КОМПОНЕНТА НЕ ПОТРІБЕН


──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/