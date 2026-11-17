import { useLayoutEffect, useRef, type ReactNode } from 'react';
import styles from './AnimatedHeight.module.scss';

interface AnimatedHeightProps {
    isOpened: boolean;
    children: ReactNode;
    onCollapseTransitionEnd?: () => void;
}

export const AnimatedHeight = ({
    isOpened,
    children,
    onCollapseTransitionEnd,
}: AnimatedHeightProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const onCollapseEndRef = useRef(onCollapseTransitionEnd);

    onCollapseEndRef.current = onCollapseTransitionEnd;

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTransitionEnd = (e: TransitionEvent) => {
            if (e.target !== container || e.propertyName !== 'height') return;

            if (isOpened) {
                container.style.height = 'auto';
            } else {
                onCollapseEndRef.current?.();
            }

            container.removeEventListener('transitionend', handleTransitionEnd);
        };

        if (isOpened) {
            const height = container.scrollHeight;
            container.style.height = `${height}px`;

            container.addEventListener('transitionend', handleTransitionEnd);

            return () => container.removeEventListener('transitionend', handleTransitionEnd);
        } else {
            if (container.style.height === 'auto') {
                container.style.height = `${container.scrollHeight}px`;
            }

            void container.offsetHeight;

            container.style.height = '0px';

            container.addEventListener('transitionend', handleTransitionEnd);

            return () => container.removeEventListener('transitionend', handleTransitionEnd);
        }
    }, [isOpened]);

    return (
        <div
            ref={containerRef}
            className={styles.animatedHeight}
            data-open={isOpened}
        >
            {children}
        </div>
    );
}





/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                                     ReactNode
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  ReactNode — це Union Type, який складається з типів, які React допускає як результат JSX.

  Тобто які React може ОБРОБИТИ:

       ◦ string
       ◦ number
       ◦ null
       ◦ undefined
       ◦ boolean
       ◦ ReactElement
       ◦ Масиви ReactElements

  ТА ВІДМАЛЮВАТИ:

       ◦ string
       ◦ number
       ◦ ReactElement
       ◦ Масиви ReactElements

       Оскільки null, undefined, boolean не відображаються.


  У JSX — string, number, null, undefined, boolean, ReactElement, а також масиви ReactElements.
          ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


  Кожен JSX-елемент під час трансформації JSX-коду в JavaScript-код перетворюється на виклик JSX runtime (У старій
  трансформації це був React.createElement())

  Результатом цього виклику є React element — JavaScript-об'єкт, який описує елемент для React.
                              ‾‾‾‾‾‾‾‾‾‾‾‾‾

                                       ┌───────  Приклад React Element: ───────┐
                                       │                                       │
                                       │          <h1>Hello</h1>;              │
                                       │                                       │
                                       │          {                            │
                                       │            type: "h1",                │
                                       │            props: {                   │
                                       │              children: "Hello"        │
                                       │            }                          │
                                       │          };                           │
                                       │                                       │
                                       └───────────────────────────────────────┘


  Масиви таких елементів зазвичай утворюються при використанні методів на кшталт .map().



────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                          Типізація Функціонального Компонента
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  При типізації функціонального компонента типізують лише його аргумент (пропси).

  Нам не треба типізувати те, що повертає компонент, оскільки спрацьовує Type Inference (Виведення типів) ─ механізм
  автоматичного визначення типів на основі наявної інформації.

  TypeScript розпізнає JSX-синтаксис у коді й автоматично присвоює значенню, яке повертає функціональний компонент,
  тип JSX.Element (тип, який має будь-який JSX-вираз).



════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                 📍 EVENTS: Native DOM events & React Synthetic events
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  У React ми можемо працювати з подіями двома способами:

      1. Native DOM Events — нативні події браузера (Event, MouseEvent, KeyboardEvent тощо), з якими ми працюємо
         безпосередньо через API браузера (addEventListener).

      2. Synthetic Events (Синтетичні події) — об'єкти подій React (React.SyntheticEvent), що огортають нативні події
         браузера, чим надають уніфікований (єдиний, стандартний) API для роботи з ними.


  React використовує делегування подій (Event Delegation) як частину своєї системи обробки подій. Це дозволяє React не
  підвішувати окремий нативний обробник на кожен HTML-елемент, а централізовано обробляти події на рівні root-контейнера


  При цьому Event Delegation не є причиною існування SyntheticEvent: делегування можна використовувати і з нативними
  DOM-подіями без жодних SyntheticEvent.



  📍 Навіщо ж тоді взагалі створили SyntheticEvent у React?
  ─────────────────────────────────────────────────────────

      Історично однією з головних причин створення SyntheticEvent було забезпечення кросбраузерності (нормалізації
      поведінки подій між різними браузерами).


      Раніше браузери мали більше відмінностей у реалізації DOM Events.

      Перехоплюючи нативну подію, React обгортав її в свій об'єкт SyntheticEvent, приводячи всі властивості (e.target)
      та методи (e.preventDefault(), e.stopPropagation()) до єдиного стандарту.

     Тобто React створив єдиний event API, щоб код обробників працював однаково незалежно від браузера.


      Зараз сучасні браузери значно краще стандартизували DOM Events, тому необхідність у такій кросбраузерній
      нормалізації стала набагато меншою.

      Сьогодні SyntheticEvent — це передусім зручна абстракція React над нативними подіями браузера.



═════════════════════════════════════════════════════
  📍 Native Browser Events (Нативні події браузера)
═════════════════════════════════════════════════════

  Нативні події браузера — це стандартизовані об'єкти подій таких як MouseEvent, KeyboardEvent, TransitionEvent тощо,
  сформовані самим браузером у момент безпосередньої взаємодії користувача з DOM елементом (наприклад, MouseEvent
  при кліку по кнопці чи KeyboardEvent при введенні символу в input) або після завершення якогось процесу,
  ініційованого цією взаємодією (наприклад, закінчення CSS-переходу transitionend).


  Ми працюємо з нативними подіями тоді, коли навішуємо обробник напряму на DOM-елемент через метод addEventListener,
  який є частиною браузерного DOM API:

                        ┌─────────────────────────────────────────────────────────────────────┐
                        │   element.addEventListener('click', handleClick);                   │
                        │   element.addEventListener('transitionend', handleTransitionEnd);   │
                        └─────────────────────────────────────────────────────────────────────┘

  При такій підписці ми взаємодіємо з браузером напряму — без жодних надбудованих абстракцій як Синтетичні події React
  (Synthetic Events).

  Коли відбудеться якась взаємодія користувача з інтерфейсом, браузер сам сформує нативний об'єкт події (Event) та
  передасть його в наш обробник.



  📍 Типізація Нативних подій у TypeScript
═════════════════════════════════════════════

  Типи нативних об'єктів подій (events) у TypeScript описані через interface, який відтворює ієрархію успадкування
  класів у JavaScript (Event ──> UIEvent ──> MouseEvent) на рівні типів.

  Пам'ятаємо, що нативні об'єкти подій створені через класи, які в свою чергу побудовані за принципом
  об'єктно-орієнтованого успадкування (ООП / Class Extension).

  Інтерфейси в TypeScript відтворюють цю ООП-ієрархію:

                              interface Event
                                │
                                └── interface UIEvent extends Event
                                      │
                                      └── interface MouseEvent extends UIEvent


──────────────────────────────
  1. Базовий контракт Event:
──────────────────────────────

  Event — базовий інтерфейс для всіх об'єктів нативних подій.

  Він визначає універсальний контракт, якому відповідає будь яка нативна подія: тобто будь-який об'єкт який має контакт
  Event гарантовано матиме властивості:

         ◦ target: EventTarget | null          ——> об'єкт (target), на якому виникла подія
         ◦ currentTarget: EventTarget | null   ——> об'єкт, на якому зараз виконується обробник
         ◦ type: string                        ——> тип події ('click', 'transitionend', тощо)

  та методи:

         ◦ stopPropagation(): void      ——> метод для зупинки подальшого поширення події по її propagation path
         ◦ preventDefault(): void       ——> метод скасування стандартної поведінки браузера, якщо подія є cancelable
                                            (тобто якщо дія підтримує скасування стандартної поведінки)



─────────────────────────────────────────────────────
  2. Спеціалізовані інтерфейси (похідні від Event):
─────────────────────────────────────────────────────

  Вони успадковують усі вимоги базового контракту Event + додають власні специфічні вимоги щодо наявності властивостей
  залежно від характеру події, яка виникла.

      ◦ UIEvent extends Event — розширює контракт Event вимогами наявності властивостей, які описують деталі
        безпосередньої взаємодії користувача з інтерфейсом (detail, view).

      ◦ MouseEvent extends UIEvent — розширює контракт UIEvent (який у свою чергу розширює Event) вимогами наявності
        властивостей, які описують подію миші (координати курсора відносно viewport clientX/clientY, тощо).

      ◦ KeyboardEvent extends UIEvent — розширює контракт UIEvent вимогами наявності властивостей, які описують дані
        натиснутої клавіші: (key, фізичний код клавіші, тощо).

      ◦ TransitionEvent extends Event — розширює контракт Event вимогами наявності властивостей, які описують деталі
        CSS-transition (наприклад, назву CSS-властивості, яка знаходиться в процесі transition: propertyName).



────────────────────────────────────────────
  📍 Два способи типізації нативних подій:
────────────────────────────────────────────

  Пам'ятаємо що ми працюємо з нативними подіями тоді, коли навішуємо обробник напряму на DOM-елемент через метод
  addEventListener.


  СПОСІБ 1. Автоматичний вивід типів (Inline Callbacks):
  ──────────────────────────────────────────────────────

      Inline Callbacks (функції, оголошені за місцем виклику) — це callback-функції, які оголошуються безпосередньо
      в аргументах іншої функції (наприклад, всередині addEventListener).

      Якщо event handler оголошується за місцем виклику, тобто всередині addEventListener, TypeScript застосовує
      контекстне типізування (Contextual Typing) — один із механізмів Type Inference — і автоматично визначає тип
      об'єкта події на основі контексту.

                                                                                        ────────────────────────────────

      У випадку addEventListener контекст складається з двох ключових елементів:

           1. Тип об'єкта, на якому викликається метод addEventListener (e.currentTarget)

                Це може бути як конкретний DOM-елемент наприклад з типом HTMLButtonElement, так і глобальні
                об'єкти window з типом Window або document з типом Document.


           2. Назва події (event type)

                Перший аргумент методу addEventListener, який є рядком, наприклад 'click', 'resize', тощо.



      Знаючи тип об'єкта, на якому був викликаний addEventListener, та назву (event type) події, яку listener
      прослуховує, TypeScript може визначити тип об'єкта події (контракт, якому буде відповідати об'єкт-події,
      який прийде в event handler).

      Для визначення цього типу TS використовує відповідну Type Map (Словник Типів), де ключем є назва події
      ('click'), а значенням — тип об'єкта події (MouseEvent) — те що нам треба.


      Залежно від типу об'єкта, на якому викликається addEventListener, TypeScript використовує різні Type Maps.


            ◦ Якщо це конкретний DOM-елемент який має тип, представлений інтерфейсом, похідним від HTMLElement
              (наприклад, HTMLButtonElement, HTMLDivElement тощо)   ——>  використовується HTMLElementEventMap

            ◦ Якщо це глобальний об'єкт window з типом Window       ——> WindowEventMap

            ◦ Якщо це глобальний об'єкт document з типом Document   ——> DocumentEventMap


                        ┌─────────────────────────────────────────────────────────────────────┐
                        │                                                                     │
                        │   const button = document.querySelector('button');    ──> 1         │
                        │                                                                     │
                        │                                                                     │
                        │   button?.addEventListener('click', (e) => {          ──> 2         │
                        │     console.log(e.clientX);                           ──> 3         │
                        │   });                                                               │
                        │                                                                     │
                        └─────────────────────────────────────────────────────────────────────┘

                        1. document.querySelector('button') — шукає елемент за назвою тегу і повертає посилання
                           на перший знайдений <button> в DOM-дереві (або null, якщо таких елементів немає).


                        2.1. На знайдений button ми навішуємо слухач для події 'click'.

                        2.2. Другим аргументом у цей слухач ми передаємо Inline Callback, який приймає аргумент event
                             (e ─ об'єкт події).

                             Тип параметра event TypeScript виводить автоматично з контексту: оскільки лісенер
                             вікликаний на HTML елементі та прослуховує саме подію 'click', TypeScript викоритовує
                             HTMLElementEventMap для визначення типу події залежно від її назви (type).

                             Параметр e отримує тип MouseEvent.


                        3. Завдяки автоматичному виводу типів (Contextual Typing) ми можемо безпечно звертатися до
                           специфічних властивостей подій миші (таких як: clientX, clientY, button тощо).



                      ┌─────────────────────────────────────────────────────────────────────────────────────────────────
                      │                   📍 Приклад одного з таких Type Maps: HTMLElementEventMap
                      │─────────────────────────────────────────────────────────────────────────────────────────────────
                      │
                      │   Це Type Map (Словник Типів) для усіх стандартних HTML-елементів (які походять від інтерфейсу
                      │   HTMLElement), де:

                             ◦ Ключем є назва події (event type) — конкретний рядок, такий як 'click', 'keydown'

                             ◦ А значенням — відповідний інтерфейс події (MouseEvent, KeyboardEvent, SubmitEvent).

                               За контрактом цього інтерфейсу об'єкт події буде мати властивість type, значенням
                               якої буде літеральний тип-рядок (конкретна назва події, яка МОЖЕ СТАТИСЯ за цим
                               специфічним контрактом).

                               Наприклад подія може мати type: 'click' лише якщо вона має контракт MouseEvent.


                        ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
                        │                                                                                              │
                        │ interface HTMLElementEventMap {                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Mouse  ─────────────                                                      │
                        │                                                                                              │
                        │                                                                                              │
                        │   click: MouseEvent;          ──> Один клік лівою кнопкою миші                               │
                        │                                                                                              │
                        │   dblclick: MouseEvent;       ──> Подвійний клік мишею                                       │
                        │                                                                                              │
                        │   mousedown: MouseEvent;      ──> Натискання (затискання) кнопки миші                        │
                        │                                                                                              │
                        │   mouseup: MouseEvent;        ──> Відпускання кнопки миші                                    │
                        │                                                                                              │
                        │   mousemove: MouseEvent;      ──> Переміщення курсора над елементом                          │
                        │                                                                                              │
                        │                                                                                              │
                        │   mouseenter: MouseEvent;     ──> Наведення курсора на елемент                               │
                        │                                   (without bubbling — подія не спливає)                      │
                        │                                                                                              │
                        │   mouseleave: MouseEvent;     ──> Виведення курсора з елемента                               │
                        │                                   (without bubbling — подія не спливає)                      │
                        │                                                                                              │
                        │                                                                                              │
                        │   mouseover: MouseEvent;      ──> Наведення курсора на елемент або його нащадок              │
                        │                                   (with bubbling — спливає)                                  │
                        │                                                                                              │
                        │   mouseout: MouseEvent;       ──> Виведення курсора з елемента або його нащадка              │
                        │                                   (with bubbling — спливає)                                  │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Keyboard  ─────────────                                                   │
                        │                                                                                              │
                        │                                                                                              │
                        │   keydown: KeyboardEvent;     ──> Натискання клавіші клавіатури                              │
                        │                                                                                              │
                        │   keyup: KeyboardEvent;       ──> Відпускання клавіші клавіатури                             │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Input / Form  ─────────────                                               │
                        │                                                                                              │
                        │                                                                                              │
                        │   input: Event;               ──> Будь-яка зміна значення в полі                             │
                        │                                   (наприклад, введення кожного символу в текстове поле)      │
                        │                                                                                              │
                        │   beforeinput: InputEvent;    ──> Момент безпосередньо перед зміною значення в полі          │
                        │                                                                                              │
                        │   change: Event;              ──> Фіксація зміни значення (миттєво для checkbox/radio/select,│
                        │                                   або після зняття фокуса для текстових інпутів)             │
                        │                                                                                              │
                        │   submit: SubmitEvent;        ──> Відправка форми                                            │
                        │                                                                                              │
                        │   reset: Event;               ──> Скидання полів форми до їхніх початкових значень           │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Focus  ─────────────                                                      │
                        │                                                                                              │
                        │                                                                                              │
                        │   focus: FocusEvent;          ──> Отримання фокуса елементом                                 │
                        │                                   (without bubbling — подія не спливає)                      │
                        │                                                                                              │
                        │   blur: FocusEvent;           ──> Втрата фокуса елементом                                    │
                        │                                   (without bubbling — подія не спливає)                      │
                        │                                                                                              │
                        │   focusin: FocusEvent;        ──> Отримання фокуса елементом або його нащадком               │
                        │                                   (with bubbling — спливає)                                  │
                        │                                                                                              │
                        │   focusout: FocusEvent;       ──> Втрата фокуса елементом або його нащадком                  │
                        │                                   (with bubbling — спливає)                                  │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Clipboard  ─────────────                                                  │
                        │                                                                                              │
                        │                                                                                              │
                        │   copy: ClipboardEvent;       ──> Копіювання виділеного контенту в буфер обміну              │
                        │                                                                                              │
                        │   cut: ClipboardEvent;        ──> Вирізання виділеного контенту в буфер обміну               │
                        │                                                                                              │
                        │   paste: ClipboardEvent;      ──> Вставка даних із буфера обміну                             │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Drag & Drop  ─────────────                                                │
                        │                                                                                              │
                        │                                                                                              │
                        │   dragstart: DragEvent;       ──> Початок перетягування елемента мишкою                      │
                        │                                                                                              │
                        │   dragover: DragEvent;        ──> Переміщення елемента над призначеною для скидання зоною    │
                        │                                   (Drop Zone — наприклад, блоком «Перетягніть файли сюди»)   │
                        │                                                                                              │
                        │   drop: DragEvent;            ──> Скидання елемента у цільову зону                           │
                        │                                   (тобто відпускання елемента над зоною скидання)            │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Touch (Мобільний сенсор)  ─────────────                                   │
                        │                                                                                              │
                        │                                                                                              │
                        │   touchstart: TouchEvent;     ──> Початок дотику пальцем до сенсорного екрана                │
                        │                                                                                              │
                        │   touchmove: TouchEvent;      ──> Переміщення пальця по поверхні екрана                      │
                        │                                                                                              │
                        │   touchend: TouchEvent;       ──> Відрив пальця від сенсорного екрана                        │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ────────  📍 Pointer (Універсальні вказівники: миша | палець | стилус) ────────             │
                        │                                                                                              │
                        │   Це будь-який інструмент позиціонування на екрані — тобто будь-що, чим користувач вказує    │
                        │   на конкретну точку інтерфейсу: курсор миші/трекпада, дотик пальця на сенсорному екрані     │
                        │   або графічне перо (стилус).                                                                │
                        │                                                                                              │
                        │                                                                                              │
                        │   pointerdown: PointerEvent;  ──> Початок дотику/кліку                                       │
                        │                                   (замінює mousedown та touchstart)                          │
                        │                                                                                              │
                        │   pointerup: PointerEvent;    ──> Завершення дотику/кліку                                    │
                        │                                   (замінює mouseup та touchend)                              │
                        │                                                                                              │
                        │                                                                                              │
                        │   pointermove: PointerEvent;  ──> Рух вказівника по поверхні елемента                        │
                        │                                   (замінює mousemove та touchmove)                           │
                        │                                                                                              │
                        │                                                                                              │
                        │   pointerenter: PointerEvent; ──> Вхід вказівника на елемент                                 │
                        │                                   (without bubbling — подія не спливає)                      │
                        │                                                                                              │
                        │   pointerleave: PointerEvent; ──> Вихід вказівника з елемента                                │
                        │                                   (without bubbling — подія не спливає)                      │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 Wheel / Scroll  ─────────────                                             │
                        │                                                                                              │
                        │                                                                                              │
                        │   wheel: WheelEvent;          ──> Намір прокрутки (фізичний рух колесом миші або             │
                        │                                   жестом тачпада, неважливо, чи є куди скролити.             │
                        │                                   Можна скасувати через preventDefault)                      │
                        │                                                                                              │
                        │   scroll: Event;              ──> Факт зсуву контенту на екрані (неможливо скасувати         │
                        │                                   через preventDefault, бо прокрутка вже сталася)            │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 CSS Animation  ─────────────                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │   animationstart: AnimationEvent; ──> Початок виконання CSS-анімації                         │
                        │                                                                                              │
                        │   animationend: AnimationEvent;   ──> Повне завершення CSS-анімації                          │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │                                                                                              │
                        │  ─────────────  📍 CSS Transition  ─────────────                                             │
                        │                                                                                              │
                        │                                                                                              │
                        │   transitionstart: TransitionEvent; ──> Початок CSS-transition                               │
                        │                                                                                              │
                        │   transitionend: TransitionEvent;   ──> Повне завершення CSS-transition                      │
                        │                                                                                              │
                        │ }                                                                                            │
                        │                                                                                              │
                        └──────────────────────────────────────────────────────────────────────────────────────────────┘




  СПОСІБ 2. Явна типізація зовнішньої функції (Out-of-line Handlers):
  ───────────────────────────────────────────────────────────────────

      Out-of-line Handlers — окремо визначені обробники подій.

      Якщо функція-обробник оголошується окремо за межами addEventListener, контекст втрачається й TypeScript не може
      автоматично вивести тип об'єкта події.

      У цьому випадку тип параметра e (event) у хендлері обов'язково потрібно вказати явно:

                        ┌─────────────────────────────────────────────────────────────────────┐
                        │                                                                     │
                        │   function handleClick(e: MouseEvent): void {    ──> 1              │
                        │     console.log(e.clientX);                      ──> 2              │
                        │   }                                                                 │
                        │                                                                     │
                        │   function handleTransitionEnd(e: TransitionEvent): void {  ──> 1   │
                        │     console.log(e.propertyName);                            ──> 2   │
                        │   }                                                                 │
                        │                                                                     │
                        │                                                                     │
                        │   element.addEventListener('click', handleClick);                   │
                        │   element.addEventListener('transitionend', handleTransitionEnd);   │
                        │                                                                     │
                        └─────────────────────────────────────────────────────────────────────┘

                         1. Явно типізуємо параметр event відповідним інтерфейсом події (MouseEvent / TransitionEvent).

                         2. Отримуємо можливість звертатися до специфічних властивостей конкретного типу події.




────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                📍 Відтворення логіки успадкування в типізації через interface та ключове слово extends
                                         (Interface Extension / Inheritance)
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  Типи нативних об'єктів подій (events) у TypeScript описані через interface, який відтворює ієрархію успадкування
  класів у JavaScript (Event ──> UIEvent ──> MouseEvent) на рівні типів.

  Пам'ятаємо, що нативні об'єкти подій створені через класи, які в свою чергу побудовані за принципом
  об'єктно-орієнтованого успадкування (ООП / Class Extension).


  Інтерфейси в TypeScript відтворюють цю ООП-ієрархію:

                              interface Event
                                │
                                └── interface UIEvent extends Event
                                      │
                                      └── interface MouseEvent extends UIEvent



  У TypeScript interface за своєю логікою надзвичайно схожий на класи — він підтримує об'єктно-орієнтоване успадкування
  (Class Extension / Interface Inheritance) за допомогою ключового слова extends.

  Коли один interface розширює інший через extends, він успадковує всі оголошені в ньому властивості та методи разом із
  їхньою типізацією.



  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                                                  │
  │                                                                                                                  │
  │        ────────────────────────  1. Базовий інтерфейс (контракт для всіх подій)  ────────────────────────        │
  │                                                                                                                  │
  │                                                                                                                  │
  │   interface Event {                                                                                              │
  │                                                                                                                  │
  │     readonly target: EventTarget | null;   ──> Target об'єкт, на якому виникла подія: це або об'єкт з            │
  │                                                контрактом EventTarget (об'єкт, який вміє працювати з подіями),   │
  │                                                або null — якщо подія ще не має об'єкта, на якому вона виникла    │
  │                                                (наприклад, коли ми самі створили її через new Event())           │
  │                                                                                                                  │
  │                                                                                                                  │
  │     readonly type: string;        ──> Тип події (рядок: 'click', 'keydown', 'submit' тощо)                       │
  │                                                                                                                  │
  │     stopPropagation(): void;      ──> Метод для зупинки подальшого розповсюдження події по DOM-дереву та window  │
  │                                       (не приймає жодних аргументів й повертає void)                             │
  │                                                                                                                  │
  │     preventDefault(): void;       ──> Метод для скасування стандартної поведінки браузера за замовчуванням       │
  │                                       (не приймає жодних аргументів й повертає void)                             │
  │   }                                                                                                              │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │   ────  2. Похідний інтерфейс для UI-подій (подій, які виникли при взаємодії користувача з інтерфейсом)  ────    │
  │                               (успадковує все з Event + додає деталі UI-взаємодії)                               │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │   interface UIEvent extends Event {                                                                              │
  │                                                                                                                  │
  │     readonly view: Window | null;        ──> Посилання на контекст виконання (window), у якому виникла подія     │
  │                                              (або null, якщо подія створена програмно без прив'язки до window)   │
  │                                                                                                                  │
  │     readonly detail: number;             ──> Додаткова числова інформація з деталями UI-взаємодії                │
  │   }                                          (залежно від типу події)                                            │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │        ────────────────────────────  3. Спеціалізовані похідні інтерфейси  ──────────────────────────────        │
  │                 (цей успадковує UIEvent (який успадковує Event) + додає специфічні властивості миші)             │
  │                                                                                                                  │
  │                                                                                                                  │
  │                                                                                                                  │
  │   interface MouseEvent extends UIEvent {                                                                         │
  │                                                                                                                  │
  │     readonly clientX: number;       ──>  X-координата курсора в пікселях відносно viewport                       │
  │                                                                                                                  │
  │     readonly clientY: number;       ──>  Y-координата курсора в пікселях відносно viewport                       │
  │                                                                                                                  │
  │     readonly button: number;        ──> Числовий код кнопки миші, яка викликала подію (ліва, права чи коліщатко) │
  │     ...                                                                                                          │
  │   }                                                                                                              │
  │                                                                                                                  │
  │                                                                                                                  │
  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘



                                                 📍 EventTarget
                                        ──────────────────────────────────

  interface EventTarget — це контракт (інтерфейс), який описує структуру та методи об'єкта (екземпляра), здатного
  працювати з подіями, тобто об'єкта, створеного на основі класу EventTarget або похідних від нього класів.


  Тобто interface EventTarget описує ТИП ЕКЗЕМПЛЯРА JS-класу EventTarget (тобто тип об'єкта, створеного через
  вбудований клас EventTarget - клас для створенння об'єктів, які вміють працювати з подіями).

  Цю здатність вони отримують завдяки методам, які вони успадковують від вбудованого класу EventTarget:
  addEventListener, removeEventListener, dispatchEven


  Але важливо розуміти, що не всі такі об'єкти створюються класом EventTarget безпосередньо через new EventTarget().

  Багато з них створюються своїми спеціалізованими класами, які знаходяться нижче в ланцюжку прототипів і успадковують
  функціональність класу EventTarget.


  Які ж саме об'єкти мають контракт EventTarget?

       ──> Усі DOM-вузли: сам document на вершині дерева та всі HTML-елементи (<button>, <div>, <input>)

       ──> Глобальне вікно браузера (window)

       ──> Є ще й інші браузерні об'єкти, які також можуть працювати з подіями, але це не така велика
           група об'єктів, як DOM-вузли, тож ми їх опустимо.

           Головне розуміти, що DOM-вузли та window — це не єдині екземпляри EventTarget.



  Кожен із цих об'єктів за контрактом має три успадковані методи для роботи з подіями:


       1. addEventListener — метод для реєстрації функції-обробника на певний тип події (наприклад, 'click').

       2. removeEventListener — метод для видалення раніше зареєстрованого обробника події.

       3. dispatchEvent — метод для ручного запуску/тригера події безпосередньо з JS-коду.



  ┌───────────────────────────  Контракт, який описує об'єкт, здатний працювати з подіями  ──────────────────────────┐
  │                                                                                                                  │
  │                                                                                                                  │
  │   interface EventTarget {                                                                                        │
  │                                                                                                                  │
  │     addEventListener(                                                                                            │
  │       type: string,                                  ──> Тип події (рядок: 'click', 'scroll' тощо)               │
  │       callback: EventListener | null,                ──> Event handler, у який передається об'єкт події          │
  │       options?: boolean | AddEventListenerOptions    ──> Необов'язковий аргумент: об'єкт налаштувань чи boolean  │
  │     ): void;                                                                                                     │
  │                                                                                                                  │
  │                                                   boolean — це старий синтаксис для вказання фази propagation,   │
  │                                                   на якій має спрацювати навішаний обробник: якщо передати true, │
  │                                                   то на фазі capturing, якщо false — на фазі bubbling            │
  │                                                                                                                  │
  │     removeEventListener(                                                                                         │
  │       type: string,                                                                                              │
  │       callback: EventListener | null,                                                                            │
  │       options?: boolean | EventListenerOptions    ──> Необов'язковий аргумент для точного збігу при видаленні    │
  │     ): void;                                                                                                     │
  │                                                                                                                  │
  │                                                                                                                  │
  │     dispatchEvent(event: Event): boolean;         ──>  Програмний запуск події.                                  │
  │   }                                                                                                              │
  │                                                        Приймає об'єкт події, який ми самі створюємо в JS-коді    │
  │                                                        (наприклад через new Event(), new MouseEvent() тощо)      │
  │                                                        при виклику тригера з коду.                               │
  │                                                                                                                  │
  │                                                        Повертає false, якщо в обробнику (навішаному через        │
  │                                                        addEventListener) було викликано e.preventDefault(),      │
  │                                                        інакше — true.                                            │
  │                                                                                                                  │
  │                                                                                                                  │
  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘




         📍 Повертаємося назад до механізму успадкування реалізовану в типізації через interface та extends
         ───────────────────────────────────────────────────────────────────────────────────────────────────
                                              (або через type та &)


  У питанні успадкування interface за своєю логікою надзвичайно схожий на класи — він підтримує об'єктно-орієнтоване
  успадкування типів (Interface Inheritance) за допомогою ключового слова extends.

  Коли один interface розширює інший через extends, він успадковує всі оголошені в ньому властивості та методи разом
  із їхньою типізацією.



                       Більш наочний приклад успадкування типів (Interface Extension) ніж Events:
                       ──────────────────────────────────────────────────────────────────────────

                                        interface User (Базовий користувач)
                                        │
                                        └── interface Admin extends User (Адміністратор)



                     ┌────────────────────────────────────────────────────────────────────────────┐
                     │                                                                            │
                     │   1. Базовий інтерфейс (загальний контракт для всіх користувачів)          │
                     │                                                                            │
                     │      interface User {                                                      │
                     │        readonly id: string;                                                │
                     │        name: string;                                                       │
                     │        email: string;                                                      │
                     │      }                                                                     │
                     │                                                                            │
                     │                                                                            │
                     │                                                                            │
                     │   2. Похідний інтерфейс (успадковує поля User + додає права доступу)       │
                     │                                                                            │
                     │      interface Admin extends User {                                        │
                     │        permissions: string[];                                              │
                     │        superAdmin: boolean;                                                │
                     │      }                                                                     │
                     │                                                                            │
                     │                                                                            │
                     │                                                                            │
                     │   3. ПРИКЛАД ВИКОРИСТАННЯ:                                                 │
                     │                                                                            │
                     │      const adminUser: Admin = {                                            │
                     │        id: "usr_1029",                            ┐                        │
                     │        name: "Alex",                              │ Успадковано від User   │
                     │        email: "alex@example.com",                 ┘                        │
                     │                                                   ┐                        │
                     │        permissions: ["read", "write", "delete"],  │ Власні поля Admin      │
                     │        superAdmin: true,                          ┘                        │
                     │      };                                                                    │
                     │                                                                            │
                     └────────────────────────────────────────────────────────────────────────────┘


                     ЩО ТУТ ВІДБУВАЄТЬСЯ:
                     ────────────────────

                     User — це базовий інтерфейс, за контрактом якого будь-який об'єкт юзера повинен мати стандартні
                     властивості: id, name, email.

                     Admin — це вже більш спеціалізований інтерфейс, який успадковує властивості базового інтерфейсу
                     User та додає свої власні специфічні властивості.

                     Його контракт буде містити усі вимоги User контракту + власні специфічні вимоги до об'єкта Admin:
                     наявність властивості permissions (списку доступних дій) та властивість superAdmin (прапорець
                     повного доступу).

                            ◦ superAdmin: false — звичайний адмін, його права обмежені списком дій які йому доступні
                              (масивом permissions).

                            ◦ superAdmin: true — суперадмін, який має повний доступ (може видаляти інших адмінів,
                              змінювати конфігурацію сервера тощо).


                       Завдяки extends User інтерфейс Admin автоматично містить 5 полів: 3 успадкованих від User
                       та 2 власних.



                     ГОЛОВНА КОРИСТЬ:
                     ────────────────

                       ◦ Відсутність дублювання (DRY) — не потрібно заново описувати базові поля для адміну.

                       ◦ Єдиний source of truth — якщо тип id зміниться в User, він автоматично оновиться й у Admin.

                       ◦ Сумісність Типів — об'єкт Admin можна передавати туди, де очікується звичайний User.
                         Бо User є надмножиною (надтипом) Admin, тож усі об'єкти з контрактом Admin повністю
                         відповідають вимогам контракту User.




  📍 Чи можна відтворити успадкування через type? (Type Alias)
  ────────────────────────────────────────────────────────────

     Так, Type Alias (type) також вміє відтворювати логіку розширення (успадкування) типів.

     Але type робить це за допомогою Перетину Типів (Intersection Types) &, а не ключового слова extends як interface.

     При використанні type для відтворення логіки успадкування класів немає ієрархії батько-дитина (успадкування) —
     оператор перетину & працює як логічне AND, об'єднуючи вимоги двох типів в один спільний тип.


                     ┌────────────────────────────────────────────────────────────────────────────┐
                     │                                                                            │
                     │   1. Базовий тип об'єкта user                                              │
                     │                                                                            │
                     │      type User = {                                                         │
                     │        readonly id: string;                                                │
                     │        name: string;                                                       │
                     │        email: string;                                                      │
                     │      }                                                                     │
                     │                                                                            │
                     │                                                                            │
                     │                                                                            │
                     │   2. Об'єднаний тип через Intersection Operator (&)                        │
                     │                                                                            │
                     │      type Admin = User & {                                                 │
                     │        permissions: string[];                                              │
                     │        superAdmin: boolean;                                                │
                     │      }                                                                     │
                     │                                                                            │
                     │                                                                            │
                     │                                                                            │
                     │   3. ПРИКЛАД ВИКОРИСТАННЯ:                                                 │
                     │                                                                            │
                     │      const adminUser: Admin = {                                            │
                     │        id: "usr_1029",                            ┐                        │
                     │        name: "Alex",                              │ Поля з типу User       │
                     │        email: "alex@example.com",                 ┘                        │
                     │                                                   ┐                        │
                     │        permissions: ["read", "write", "delete"],  │ Поля з додаткового     │
                     │        superAdmin: true,                          ┘      об'єкта           │
                     │      };                                                                    │
                     │                                                                            │
                     └────────────────────────────────────────────────────────────────────────────┘




       ВАЖЛИВО:
     ────────────

         interface та type у простих випадках відтворення логіки розширення (успадкування) об'єктних типів можуть
         бути взаємозамінними.

         Для цього і перший, і другий тип мають бути об'єктними типами, тоді TypeScript дозволить міксувати
         синтаксис: interface може розширювати type через extends, а type може створювати перетин (&) з interface.


                               ┌────────────────────────────────────────────────────────┐
                               │                                                        │
                               │   1. interface розширює type (через extends)           │
                               │                                                        │
                               │      type User = {                                     │
                               │        id: string;                                     │
                               │        email: string;                                  │
                               │      }                                                 │
                               │                                                        │
                               │      interface Admin expends User {                    │
                               │        permissions: string[];                          │
                               │      }                                                 │
                               │                                                        │
                               │                                                        │
                               │                                                        │
                               │   2. type об'єднується з interface (через перетин &)   │
                               │                                                        │
                               │      interface User {                                  │
                               │        id: string;                                     │
                               │        email: string;                                  │
                               │      }                                                 │
                               │                                                        │
                               │      type Admin =  User & {                            │
                               │        permissions: string[];                          │
                               │      }                                                 │
                               │                                                        │
                               └────────────────────────────────────────────────────────┘




  📍 Особливості interface успадкування:
  ──────────────────────────────────────

      1. Множинне успадкування (Multiple Inheritance)

         На відміну від класів у JavaScript (де класи підтримують лише single inheritance — розширення тільки від
         одного батьківського класу: class A extends B), interface у TypeScript може успадковуватись одразу від
         кількох інтерфейсів через кому:


                          ┌────────────────────────────────────────────────────────────────────┐
                          │                                                                    │
                          │   interface Clickable {                                            │
                          │     onClick: () => void;                                           │
                          │   }                                                                │
                          │                                                                    │
                          │   interface Hoverable {                                            │
                          │     onHover: () => void;                                           │
                          │   }                                                                │
                          │                                                                    │
                          │                                                                    │
                          │   Успадковує поля та методи з ОБОХ інтерфейсів одночасно:          │
                          │   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾          │
                          │                                                                    │
                          │   interface Button extends Clickable, Hoverable {                  │
                          │     disabled: boolean;                                             │
                          │   }                                                                │
                          │                                                                    │
                          │   const btn: Button = {                                            │
                          │     disabled: false,                                               │
                          │     onClick: () => console.log("Clicked"),                         │
                          │     onHover: () => console.log("Hovered"),                         │
                          │   };                                                               │
                          │                                                                    │
                          └────────────────────────────────────────────────────────────────────┘



      2. Декларативне злиття (Declaration Merging)

         Декларативне злиття — це унікальна особливість interface (у type цього немає: оголошення двох type з
         однаковим ім'ям призведе до помилки компіляції).

         Якщо в одному scope оголосити декілька interface з однаковою назвою, TypeScript автоматично об'єднає
         всі їхні поля в один спільний інтерфейс.

                          ┌────────────────────────────────────────────────────────────────────┐
                          │                                                                    │
                          │   interface Button {                                               │
                          │     onClick: () => void;                                           │
                          │   }                                                                │
                          │                                                                    │
                          │   interface Button {                                               │
                          │     onHover: () => void;                                           │
                          │   }                                                                │
                          │                                                                    │
                          │                                                                    │
                          │  TypeScript розглядає ці декларації як один об'єднаний interface:  │
                          │  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾  │
                          │                                                                    │
                          │   interface Button {                                               │
                          │     onClick: () => void;                                           │
                          │     onHover: () => void;                                           │
                          │   }                                                                │
                          │                                                                    │
                          │   const btn: Button = {                                            │
                          │     onClick: () => console.log("Clicked"),                         │
                          │     onHover: () => console.log("Hovered"),                         │
                          │   };                                                               │
                          │                                                                    │
                          └────────────────────────────────────────────────────────────────────┘



         Важливий нюанс Declaration Merging:
         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

            При декларативному злитті TypeScript вимагає, щоб однакові властивості мали однаковий тип.

            id: string та id: number — несумісні типи, тому виникне помилка компіляції:

                          ┌────────────────────────────────────────────────────────────────────┐
                          │                                                                    │
                          │   interface User {                                                 │
                          │     id: string;                                                    │
                          │   }                                                                │
                          │                                                                    │
                          │   interface User {                                                 │
                          │     id: number;       ───> ПОМИЛКА: Перевизначення властивості     │
                          │   }                                     несумісним типом           │
                          │                                                                    │
                          └────────────────────────────────────────────────────────────────────┘



            У той же час, якщо при декларативному злитті є методи з однаковою назвою, але різними
            сигнатурами, TypeScript не видасть помилку, а об'єднає їх в overload signatures.





══════════════════════════════════════════════════════
  📍 Synthetic React Events (Синтетичні Події React)
══════════════════════════════════════════════════════

  Коли ми навішуємо обробник події прямо через JSX-атрибут (onClick, onChange, onSubmit, onTransitionEnd тощо),
  ми використовуємо Синтетичні події React (React.SyntheticEvent), а не Нативні події браузера (Native Browser
  Events або Native DOM Events).


                        ┌────────────────────── Synthetic React Events ───────────────────────┐
                        │                                                                     │
                        │   <button onClick={handleClick}>Click me</button>                   │
                        │                                                                     │
                        │   <input onChange={handleChange} />                                 │
                        │                                                                     │
                        │   <a onClick={handleLinkClick}>Link</a>                             │
                        │                                                                     │
                        └─────────────────────────────────────────────────────────────────────┘


  З боку коду здається, що React підвішує метод addEventListener на кожен із цих окремих HTML-елементів.
  Але це ілюзія, яку створює React. Під капотом він не викликає addEventListener для кнопки, інпута та посилання.

  Замість цього React використовує делегування подій (Event Delegation) — він реєструє один глобальний слухач на
  рівні root-контейнера (#root).



                                           ПОКРОКОВИЙ МАРШРУТ ПОДІЇ (EVENT)
                                         ────────────────────────────────────


  1. Клік у браузері: Користувач здійснює якусь взаємодію з DOM-елементом (наприклад, клікає по кнопці).


  2. Браузер формує нативний об'єкт події (MouseEvent при кліку по кнопці).


  3. Event propagation (поширення події): Нативна подія браузера починає проходити через свій propagation path.

     Спочатку вона рухається згори вниз через DOM-дерево в напрямку до target (елементу, на якому вона виникла),
     а потім піднімається назад вгору (Bubbling phase), поки не досягає Root-контейнера (#root).


  4. Перехоплення в Root:
     Глобальний слухач, заздалегідь навішаний Реактом на Root-контейнер, перехоплює цю подію.


  5. Пошук відповідного Fiber-вузла у Virtual DOM:
     Отриманий нативний об'єкт події містить лише посилання на DOM-вузол, на якому ця подія виникла (e.target),
     але не містить props цього DOM-елемента. Щоб знайти переданий через JSX обробник (onClick, onChange тощо),
     React використовує зв'язок між DOM та Virtual DOM:


         5.1  Зчитування Fiber-вузла з DOM-елемента:

              Коли React створює DOM-елемент, він зберігає внутрішній зв'язок між цим DOM-елементом та його
              Fiber-вузлом у Virtual DOM.


         5.2  Пошук props та обробника:

              Отримавши e.target (DOM-елемент на якому спрацювала подія), React завдяки цьому посиланню миттєво
              знаходить його Fiber-вузол, у якому зберігаються всі поточні props DOM-елемента, включаючи передані
              JSX-обробники (onClick, onChange тощо).


  6. Створення SyntheticEvent:
     Далі React створює свій штучний об'єкт SyntheticEvent (синтетичну обгортку) і вкладає туди нативну подію
     (e.nativeEvent).


  7. Виклик відповідного обробника та імітація спливання по Fiber-дереву:
     React викликає знайдений JSX-обробник, передаючи в нього SyntheticEvent.

     Якщо подія спливає далі (всередині обробника не було викликано e.stopPropagation()), React піднімається вгору
     по Fiber-tree (через посилання return) і послідовно викликає обробники на батьківських Fiber-вузлах (якщо звісно
     вони там були зареєстровані).



     ┌────────────────────────────────────  Нагадування що таке Fiber-вузол  ────────────────────────────────────┐
     │                                                                                                           │
     │                                                                                                           │
     │   Fiber-вузол — це звичайний JS-об’єкт, який описує елемент Virtual DOM та його поточний стан.            │
     │                                                                                                           │
     │                                                                                                           │
     │                                                                                                           │
     │            ────────────────────────  Спрощена структура Fiber-вузла  ─────────────────────────            │
     │                                                                                                           │
     │                                                                                                           │
     │   const fiberNode = {                                                                                     │
     │                                                                                                           │
     │     type: 'button',     ──>  1. Тип елемента: рядок 'button', 'div' або посилання на React-компонент,     │
     │                                 якщо це не нативний HTML-тег                                              │
     │                                                                                                           │
     │                                                                                                           │
     │                                                                                                           │
     │     memoizedProps: {              ──> 2. Поточні Props (САМЕ ТУТ ЛЕЖИТЬ НАШ onClick)                      │
     │       className: 'btn-primary',                                                                           │
     │       children: 'Click me',                                                                               │
     │       onClick: function handleClick(e) { ... }    <--- React бере обробник звідси                         │
     │     },                                                                                                    │
     │                                                                                                           │
     │                                                                                                           │
     │     3. Зв'язки в Fiber-дереві (для імітації спливання SyntheticEvent по Virtual DOM)                      │
     │                                                                                                           │
     │     child: null,           <--- Перший дочірній Fiber-вузол                                               │
     │     sibling: null,         <--- Сусідній Fiber-вузол                                                      │
     │     return: parentFiber,   <--- Батьківський Fiber-вузол (куди подія спливає далі)                        │
     │                                                                                                           │
     │                                                                                                           │
     │     stateNode: HTMLButtonElement,  ──> 3. Посилання на реальний DOM-вузол у браузері                      │
     │   };                                                                                                      │
     │                                                                                                           │
     │                                                                                                           │
     └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘






  📍 Типізація Синтетичних подій у React (SyntheticEvent)
═══════════════════════════════════════════════════════════

  Усі типи синтетичних подій у React є Generic-інтерфейсами. Ці інтерфейси відтворюють ту саму нативну ООП-ієрархію
  успадкування на рівні типів як і типи нативних подій.


                              interface React.SyntheticEvent<T, E>
                                │
                                └── interface React.UIEvent<T, E>
                                       │
                                       └── interface React.MouseEvent<T, E>



  Проте вони мають три ключові відмінності від типізації нативних подій:

        1. Усі інтерфейси інкапсульовані (ізольовані) у власному просторі імен (namespace React), щоб не
           конфліктувати з нативними браузерними типами.

        2. Вони є дженерик-типами (наприклад, React.MouseEvent<T, E>), що дозволяє точно типізувати поле
           e.currentTarget і не звужувати його тип вручну всередині обробника (як це доводилося робити в
           нативних подіях).

        3. Містять властивість e.nativeEvent ─ посилання на оригінальну нативну браузерну подію, яка була
           огорнута в синтетичну.



  📍 Що таке namespace (простір імен) у TypeScript:
  ─────────────────────────────────────────────────

      namespace — це спеціальна синтаксична конструкція в TypeScript (блок namespace Name { ... }), яка створює
      ізольовану область видимості (контейнер типів).

      Вона використовується для групування пов'язаних типів, інтерфейсів та сигнатур функцій під одним спільним ім'ям.

      Приклад із вихідного коду бібліотеки React (@types/react):


         ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
         │                                                                                                    │
         │   type NativeUIEvent = UIEvent;               ───> Створюємо псевдоніми нативних інтерфейсів       │
         │   type NativeMouseEvent = MouseEvent;              щоб уникнути затінення імен (Name Shadowing)    │
         │   type NativeKeyboardEvent = KeyboardEvent;                                                        │
         │                                                                                                    │
         │                                                                                                    │
         │                                                                                                    │
         │   declare namespace React {                   ───> Оголошуємо простір імен React                   │
         │                                                                                                    │
         │     interface SyntheticEvent<T = Element, E = Event> {                                             │
         │       currentTarget: EventTarget & T;                                                              │
         │       nativeEvent: E;                                                                              │
         │     }                                                                                              │
         │                                                                                                    │
         │     interface UIEvent<T = Element, E = NativeUIEvent>                                              │
         │       extends SyntheticEvent<T, E> { ... }                                                         │
         │                                                                                                    │
         │                                                                                                    │
         │     interface MouseEvent<T = Element, E = NativeMouseEvent>                                        │
         │       extends UIEvent<T, E> { ... }                                                                │
         │                                                                                                    │
         │                                                                                                    │
         │     interface KeyboardEvent<T = Element> extends UIEvent<T, NativeKeyboardEvent> { ... }           │
         │                                                                                                    │
         │   }                                                                                                │
         │                                                                                                    │
         └────────────────────────────────────────────────────────────────────────────────────────────────────┘



      ЗАВДЯКИ ЦІЙ СПЕЦІАЛЬНІЙ СИНТАКСИЧНІЙ КОНСТРУКЦІЇ:

          ◦ Усі типи React сховано всередину блоку namespace React

          ◦ Ми звертаємося до них через крапку: React.SyntheticEvent або React.MouseEvent

          ◦ Запобігається конфлікт назв із нативними типами браузера (наприклад, MouseEvent vs React.MouseEvent).



─────────────────────────────────────────────────────────────────────────────────
  📍 Базовий контракт (інтерфейс) синтетичних подій: React.SyntheticEvent<T, E>
─────────────────────────────────────────────────────────────────────────────────

                               ┌────────────────────────────────────────────────────────┐
                               │                                                        │
                               │   interface SyntheticEvent<T = Element, E = Event> {   │
                               │     currentTarget: EventTarget & T;                    │
                               │     target: EventTarget;                               │
                               │     nativeEvent: E;                                    │
                               │     preventDefault(): void;                            │
                               │     stopPropagation(): void;                           │
                               │   }                                                    │
                               │                                                        │
                               └────────────────────────────────────────────────────────┘


                       Цей базовий контракт приймає два опційні параметри типу (Type Parameters):


────────────────────────────────────────────────────────────────
  1. T (Target Element) ——> за замовчуванням інтерфейс Element
────────────────────────────────────────────────────────────────

  Цей параметр типу, призначений для типізації поля e.currentTarget у синтетичній події. Він використовується для
  вказування конкретного типу DOM-елемента, на якому висить обробник (onClick, onChange тощо).

  За замовчуванням для нього задано тип Element — це нативний браузерний інтерфейс, що описує базовий контракт для
  будь-яких DOM-елементів (HTML / SVG).

  Element ─ це нащадок базового інтерфейсу EventTarget (дивитись ієрархію нижче).


  📍 Що таке поле currentTarget в об'єкті події:
  ──────────────────────────────────────────────

     e.currentTarget — це посилання на той DOM-елемент, на якому безпосередньо зареєстрований JSX-обробник події
     (наприклад, кнопка <button onClick={...}>).

     На відміну від e.target (який вказує на конкретний елемент, на якому сталася подія), e.currentTarget завжди
     вказує на елемент із JSX-атрибутом обробника.



  📍 Типізація поля e.currentTarget через Intersection Type:
  ──────────────────────────────────────────────────────────

     Властивість синтетичної події e.currentTarget типізується через оператор перетину (Intersection Operator):

                                         ┌────────────────────────────────────┐
                                         │   currentTarget: EventTarget & T   │
                                         └────────────────────────────────────┘


     Цей перетин поєднує два типи, тому currentTarget має відповідати обом контрактам одночасно.

     Тобто currentTarget повинен мати всі властивості та методи описані типом T, а також методи, передбачені контрактом
     EventTarget (addEventListener, removeEventListener, dispatchEvent тощо).



     ВАЖЛИВИЙ НЮАНС:

         TypeScript не обмежує сам параметр типу (T) через: T extends EventTarget.

         Натомість властивість currentTarget все одно містить вимоги інтерфейсу EventTarget, оскільки типізується через
         перетин типів: EventTarget & T.

         Тож навіть якщо передати у T тип, який сам по собі не містить методів, передбачених контрактом EventTarget,
         наприклад:

                                         ┌────────────────────────────────────┐
                                         │  SyntheticEvent<{ name: string }>  │
                                         └────────────────────────────────────┘


         TypeScript сформує перетин і вимагатиме, щоб e.currentTarget (елемент, на якому зареєстровано JSX-обробник)
         відповідав обом контрактам одночасно — тобто мав властивість name, описану в T, і методи EventTarget.

         ПРИМІТКА: У самій декларації @types/react не пояснено, чому обрали саме EventTarget & T, а не обмеження
         T extends EventTarget чи просто currentTarget: T.



     ОСОБЛИВІСТЬ:

         При типізації стандартних браузерних DOM-елементів (де T — це наприклад, HTMLButtonElement), EventTarget уже
         входить до їхньої ієрархії успадкування (тобто об'єкт вже й так має методи, зазначені цим контрактом).

         Тому для таких типів перетин не додає нових вимог: HTMLButtonElement вже й так успадкувала вимоги контракту
         EventTarget.



────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────




                                        ┌─────────────────┐
                                        │   EventTarget   │    <--- Будь-який об'єкт, який здатний працювати з подіями
                                        └────────┬────────┘                   (Window, Document, Node)
                                                 │
                                                 │
                                        ┌────────┴────────┐
                                        │       Node      │    <--- Будь-який вузол DOM-дерева (не лише DOM-елементи,
                                        └────────┬────────┘         а й текстові вузли TextNode, коментарі CommentNode)
                                                 │
                                                 │
                                        ┌────────┴────────┐
                                        │     Element     │    <--- Саме DOM-елементи: HTML + SVG
                                        └────────┬────────┘
                                                 │
                                                 │
                         ┌───────────────────────┴───────────────────────┐
                ┌────────┴────────┐                             ┌────────┴────────┐
                │   HTMLElement   │ <--- Саме HTML-елементи     │    SVGElement   │ <--- SVG-елементи
                └────────┬────────┘                             └─────────────────┘
                         │
                         │
                ┌────────┴───────────────────┐────────────────────────────┐────────────────────────────┐
     ┌──────────┴──────────┐      ┌──────────┴──────────┐      ┌──────────┴──────────┐      ┌──────────┴──────────┐
     │  HTMLButtonElement  │      │    HTMLDivElement   │      │   HTMLFormElement   │      │         ...         │
     └─────────────────────┘      └─────────────────────┘      └─────────────────────┘      └─────────────────────┘
                │
              HTML-елемент вже з конкретним тегом, наприклад: <button>, <div>, <form>, тощо.





────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────



─────────────────────────────────────────────────────────────────────
  2. E (Native Event) ——> за замовчуванням нативний інтерфейс Event
─────────────────────────────────────────────────────────────────────

    Цей параметр типу, призначений для типізації властивості e.nativeEvent у синтетичній події.

    e.nativeEvent — це посилання на оригінальний нативний об'єкт події, на основі якого React створює свою
    синтетичну подію.



  📍 Чому при типізації синтетичних подій специфічними інтерфейсами ми
     не передаємо другий Type Argument (E ─ тип нативної події) вручну?
  ─────────────────────────────────────────────────────────────────────

     У похідних від базового React.SyntheticEvent інтерфейсах (таких як React.MouseEvent, React.KeyboardEvent),
     розробники React самостійно звузили тип нативної події на рівні самих декларацій специфічних типів.


     ТОБТО:

     У базовому інтерфейсі React.SyntheticEvent<T, E = Event> параметр E (Native Event) за замовчуванням має загальний
     тип нативної події Event.


     Але у деклараціях специфічних інтерфейсів синтетичних подій (які успадковують від SyntheticEvent) поле
     e.nativeEvent отримує більш специфічну типізацію природно, оскільки кожному специфічному інтерфейсу
     синтетичної події логічно відповідає конкретний тип нативної:

            ◦ React.MouseEvent  ──> NativeMouseEvent

            ◦ React.KeyboardEvent  ──> NativeKeyboardEvent

            ◦ React.FocusEvent  ──> NativeFocusEvent



     Технічно в коді це реалізовано двома способами:

          ◦ Або для параметра E задають специфічне значення за замовчуванням (наприклад, NativeMouseEvent,
            а не базовий Event).

          ◦ Або специфічний тип нативної події явно передають як Type Argument під час успадкування від
            SyntheticEvent чи UIEvent.


     Якщо сказати легше, щоб знати, який тип має поле e.nativeEvent в сентетичній події, достатньо подивитися,
     яким специфічним контрактом типізована сама синтетична подія (наприклад, React.MouseEvent).

     Суть у тому, що дія одна й та сама (клік, натискання клавіші, фокус), тому специфічний інтерфейс React уже знає
     відповідний тип браузерного оригінальної події.

     Вони відрізняються лише об'єктами: синтетична подія — це обгортка від React, а e.nativeEvent — справжній нативний
     об'єкт події з браузера.


          ┌─────
          │
          │  📍 React.MouseEvent<T, E = NativeMouseEvent>
          │
          │           Параметр E за замовчуванням має тип NativeMouseEvent
          │           (псевдонім (аліас) нативного браузерного MouseEvent)
          │
          │
          │─────
          │
          │  📍 React.KeyboardEvent<T>
          │
          │           ┌─────────────────────────────────────────────────────────────────────────────────────────┐
          │           │  interface KeyboardEvent<T = Element> extends UIEvent<T, NativeKeyboardEvent> { ... }   │
          │           └─────────────────────────────────────────────────────────────────────────────────────────┘
          │
          │            Тип нативної події тут також звужений до специфічного, але НЕ через дефолтне значення
          │            параметра (E = ...), а через те, що конкретний нативний інтерфейс (NativeKeyboardEvent)
          │            одразу передається в UIEvent під час успадкування.
          │
          │            Тому поле e.nativeEvent напряму отримує тип NativeKeyboardEvent.
          │
          │
          │─────
          │
          │  📍 React.FocusEvent<Target = Element, RelatedTarget = Element>
          │
          │           ┌─────────────────────────────────────────────────────────────────────────────────────────┐
          │           │ interface FocusEvent<Target = Element, RelatedTarget = Element>                         │
          │           │   extends SyntheticEvent<Target, NativeFocusEvent> { ... }                              │
          │           └─────────────────────────────────────────────────────────────────────────────────────────┘
          │
          │           Тип нативної події (NativeFocusEvent) так само передається в SyntheticEvent під час
          │           успадкування, тому поле e.nativeEvent одразу отримує точний тип NativeFocusEvent.
          │
          │           При цьому другий параметр дженерику призначений ВЗАГАЛІ НЕ ДЛЯ НАТИВНОЇ ПОДІЇ, а для типізації
          │           властивості e.relatedTarget — DOM-елемента, З ЯКОГО прийшов фокус (попередній зафокусований
          │           елемент) або елемента, НА ЯКИЙ переходить фокус (новий зафокусований елемент)
          │
          └───


     Тобто, оскільки кожен специфічний інтерфейс (наприклад, React.MouseEvent чи React.KeyboardEvent) створений для
     конкретного виду дій, для нього природно та зручно заздалегідь визначити і специфічний тип поля e.nativeEvent,
     де зберігається посилання на нативну подію.

     У React.MouseEvent це зроблено через значення за замовчуванням параметра E (E = NativeMouseEvent).
     В інших інтерфейсах відповідний тип нативної події передається батьківському інтерфейсу під час успадкування.

     Завдяки цьому нам не потрібно вручну преедавати тип нативної події як Type Argument: достатньо зазначити тип
     елемента (T), наприклад React.MouseEvent<HTMLButtonElement>, а поле e.nativeEvent вже автоматично отримає свій
     специфічний тип NativeMouseEvent, визначений в декларації.

                                       ┌─────────────────────────────────────────┐
                                       │   React.MouseEvent<HTMLButtonElement>   │
                                       └─────────────────────────────────────────┘




  📍 Навіщо потрібен псевдонім NativeMouseEvent = MouseEvent?
  ───────────────────────────────────────────────────────────

      У деклараціях React тип браузерної події передається через псевдонім: type NativeMouseEvent = MouseEvent;


      Що взагалі означає цей запис?
      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
          У TypeScript такий запис створює псевдонім — альтернативне ім'я для вже існуючого типу.

          Він не створює жодного нового типу, а просто каже компілятору: "Відтепер ім'я NativeMouseEvent є
          синонімом до глобального браузерного типу MouseEvent, який викоритовується для типізації нативної події".


      Навіщо створено псевдонім NativeMouseEvent?
      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

          У просторі імен React уже є власний інтерфейс MouseEvent, назва якого збігається з назвою глобального
          браузерного інтерфейсу MouseEvent.

          ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
          │                                                                                                    │
          │   declare namespace React {                                                                        │
          │     interface MouseEvent<T = Element, E = NativeMouseEvent> extends SyntheticEvent<T, E> { ... }   │
          │   }                                                                                                │
          │                                                                                                    │
          └────────────────────────────────────────────────────────────────────────────────────────────────────┘

          Щоб мати змогу посилатися на браузерний нативний MouseEvent й уникнути затінення імені (Name Shadowing)
          створили його псевдонім:

          Name Shadowing (затінення імені) — це ситуація, коли оголошення з певним ім'ям у внутрішнішій області
          видимості перекриває оголошення із зовнішньої області, тому звернення до цього імені в поточному контексті
          посилається на внутрішнє оголошення, а не на зовнішнє (через що глобальне оголошення стає не доступним).


          У нашому випадку всередині namespace React ім'я MouseEvent позначає власний інтерфейс для синтетичних подій
          (React.MouseEvent), а не глобальний браузерний MouseEvent для нативних подій.

          Тому для посилання на нативний браузерний тип використовують псевдонім NativeMouseEvent.

                                       ┌─────────────────────────────────────────┐
                                       │   type NativeMouseEvent = MouseEvent;   │
                                       └─────────────────────────────────────────┘


          Без псевдоніма ім'я MouseEvent усередині простору імен React посилалося б на власний інтерфейс
          React.MouseEvent, а не на глобальний браузерний MouseEvent.

          ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
          │                                                                                                    │
          │   declare namespace React {                                                                        │
          │     interface MouseEvent<T = Element, E = MouseEvent> extends SyntheticEvent<T, E> { ... }         │
          │   }           ‾‾‾‾‾‾‾‾‾‾                  ‾‾‾‾‾‾‾‾‾‾                                               │
          │                                                                                                    │
          └────────────────────────────────────────────────────────────────────────────────────────────────────┘




  📍 Чому взагалі синтетичні події типізуються через Type Parameters:
  ───────────────────────────────────────────────────────────────────

     ПРОБЛЕМА ТИПІЗАЦІЇ НАТИВНОГО ІНТЕРФЕЙСУ Event:

         У нативній події властивість currentTarget типізована як EventTarget | null.

         Оскільки EventTarget — це загальний контракт для об'єктів, здатних працювати з подіями (Window, Document
         та будь-яких DOM-вузлів), цей тип не дає чіткого уявлення TypeScript-у, на який саме HTML-елемент ми
         зареєстрували обробник (на кнопку, інпут чи форму).

         Через це TypeScript забороняє прямо звертатися до специфічних властивостей HTML-елементів, тож вирази
         e.currentTarget.value чи e.currentTarget.disabled викликають помилку типів.

         Щоб використати специфічну властивість, розробник змушений робити ручне звуження типів (Type Guard):


         ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
         │                                                                                                             │
         │   function handleClick(e: Event) {                                                                          │
         │     e.currentTarget.disabled      ──> Помилка TS: currentTarget має тип EventTarget | null: контракт        │
         │                                       EventTarget не містить властивості disabled, до того ж currentTarget  │
         │                                       може взагалі бути null                                                │
         │                                                                                                             │
         │                                                                                                             │
         │     if (e.currentTarget instanceof HTMLButtonElement) {                                                     │
         │       console.log(e.currentTarget.disabled);     ──> Працює лише після звуження типу через перевірку        │
         │     }                                                                                                       │
         │   }                                                                                                         │
         │                                                                                                             │
         └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘



     РІШЕННЯ REACT: Оптимізація через Type Parameter <T>

         В синтетичних подіях React вирішили оптимізувати цю рутину з ручними перевірками (Type Guards) за допомогою
         Дженериків. Саме для цього в інтерфейсах подій з'явився Type Parameter <T> (Target Element).

         Усередині базового контракту React.SyntheticEvent, від якого наслюдують усі синтетичні події, властивість
         currentTarget типізована через перетин типів (Intersection Type):

                                        ┌─────────────────────────────────────┐
                                        │   currentTarget: EventTarget & T;   │
                                        └─────────────────────────────────────┘


         Де:
              ◦ EventTarget — базовий контракт для об'єктів, які вміють працювати з подіями.
                Він вимагає наявності методів: addEventListener, removeEventListener, dispatchEvent.


              ◦ T (Target Element) — конкретний тип DOM-елемента, який ми передали як Type Argument
                (наприклад, HTMLButtonElement).

                Він вимагає наявності специфічних властивостей і методів, присутніх цьому DOM-елементу
                (наприклад, disabled, value, form).





  📍 Що означає обмеження (Constraint) T extends EventTarget:
  ───────────────────────────────────────────────────────────

      Якби у типізації React базовий інтерфейс синтетичної події (SyntheticEvent) був написаний з обмеженням:

                                ┌───────────────────────────────────────────────────────┐
                                │   interface SyntheticEvent<T extends EventTarget> {   │
                                │     currentTarget: T;                                 │
                                │   }                                                   │
                                └───────────────────────────────────────────────────────┘

     TypeScript перевіряв би переданий Type Argument ще під час підстановки на місце <T>.

     І якби тип не задовольняв контракт EventTarget (не був би об'єктом, який вміє працювати з подіями: тобто не
     мав би методів addEventListener, dispatchEvent тощо), TypeScript видав би помилку вже одразу під час спроби
     підставити невалідний тип у Type Parameter:


                   │  Type '{ myId: number; }' does not satisfy the constraint 'EventTarget'.
                   │
                   │  Type '{ myId: number; }' is missing the following properties from type 'EventTarget':
                   │  addEventListener, dispatchEvent, removeEventListener





  📍 Як насправді типізоване поле e.currentTarget в React:
  ────────────────────────────────────────────────────────

      У реальній типізації синтетичних подій React (@types/react) обмеження <T extends EventTarget> не використовується.

      Натомість типізація поля currentTarget реалізована через перетин типів (Intersection Type):

                             ┌───────────────────────────────────────────────────────┐
                             │   interface SyntheticEvent<T = Element, E = Event> {  │
                             │     currentTarget: EventTarget & T;                   │
                             │   }                                                   │
                             └───────────────────────────────────────────────────────┘

      Чому саме автори типів React обрали саме таку архітектуру (перетин типів замість обмеження T extends EventTarget),
      достеменно невідомо.





  📍 Що взагалі означає extends у Дженериках (Generic Constraints)?
  ─────────────────────────────────────────────────────────────────

      У TypeScript параметр типу <T> за замовчуванням означає що на його місце може прийти взагалі будь-який тип
      (string, number, якийсь інтерфейс, будь-що).

      Однак, коли логіка вимагає наявності конкретних властивостей у переданому Type Argument, ВИРИСТОВУЄТЬСЯ
      ОБМЕЖЕННЯ ДЖЕНЕРИКА (Generic Constraint) ЧЕРЕЗ КЛЮЧОВЕ СЛОВО extends.

      Тобто використовуючи extends з Type Parameter ми вказуємо компілятору: "Я готовий прийняти будь-який тип,
      АЛЕ він гарантовано повинен мати певний набір властивостей, щоб мій код не зламався".


      Коли extends використовується з Type Parameter в Generic-типах, він читається не як «УСПАДКОВУЄ»
      (як у класах ООП), а як «ЗАДОВОЛЬНЯЄ КОНТРАКТ» або «МАЄ ЯК МІНІМУМ ТАКУ САМУ СТРУКТУРУ»

      Це називається Duck Typing (Качина типізація):
               «If it looks like a duck, swims like a duck, and quacks like a duck, then it's a duck».


      У TypeScript це означає, що компілятора цікавить лише вміст об'єкта (наявність потрібних полів та методів):
      якщо об'єкт має всі небхідні поля, які вимагає інтерфейс що треба задовільнити, TypeScript вважає його валідним.


          ┌────────────────  Найкращий спосіб це зрозуміти — приклад із властивістю length:  ─────────────────┐
          │                                                                                                   │
          │   ОБМЕЖЕННЯ: T зобов'язаний мати властивість length типу number                                   │
          │                                                                                                   │
          │                                                                                                   │
          │   function logLength<T extends { length: number }>(arg: T) {                                      │
          │     console.log(arg.length);    ──> Завдяки цьому обмеженню TS дозволяє напряму звертатися до     │
          │   }                                 цієї властивості, бо ми гарантували, що вона там точно буде   │
          │                                                                                                   │
          │                                                                                                   │
          │                                                                                                   │
          │   logLength("Hello");                         ──> Працює, бо у рядка є властивість length         │
          │                                                                                                   │
          │   logLength([1, 2, 3]);                       ──> Працює, бо у масиву є властивість length        │
          │                                                                                                   │
          │   logLength({ name: "Alex", length: 180 });   ──> Працює, бо ми передали об'єкт із полем length   │
          │                                                                                                   │
          │                                                                                                   │
          │   logLength(42);                              ──> ПОМИЛКА: число не має властивості length        │
          │                                                                                                   │
          └───────────────────────────────────────────────────────────────────────────────────────────────────┘




────────────────────────────────────────────────────
  📍 Два способи типізації SyntheticEvent у коді:
────────────────────────────────────────────────────


  СПОСІБ 1. Автоматичний вивід типів (Inline Callbacks):
  ──────────────────────────────────────────────────────

      Якщо event handler оголошується безпосередньо у JSX-атрибуті, TypeScript застосовує контекстне типізування
      (Contextual Typing) — один із механізмів Type Inference — і автоматично визначає:


            ◦ Конкретний інтерфейс синтетичної події на основі назви JSX-атрибута:

                   • onClick    ──> React.MouseEvent

                   • onChange   ──> React.ChangeEvent

                   • onKeyDown  ──> React.KeyboardEvent

              Адже пам'ятаємо, що кожна назва події (e.type) у типізації відповідає конкретному інтерфейсу події.

              Наприклад, для події 'click' у TypeScript використовується MouseEvent, для 'keydown' — KeyboardEvent,
              а для 'focus' — FocusEvent.



            ◦ Перший параметр типу T (який використовується для типізації поля e.currentTarget — елементу на
              який був навішаний JSX-обробник).

              Цей параметр типу логічно визначається на основі того JSX-тегу, на який навішений атрибут
              (<button>, <input> тощо).

              Наприклад, якщо JSX-обробник навішений на тег <button> параметр типу T автоматично отримує тип
              HTMLButtonElement.



            ◦ Другий параметр типу E (тип нативної події, який використовується для e.nativeEvent)

              Тип нативної події також визначається автоматично, оскільки він уже прописаний у декларації відповідного
              специфічного інтерфейсу, який TypeScript визначає на основі типу JSX-атрибута (перший пункт).



                                    ┌─────────────────────────────────────────────┐
                                    │                                             │
                                    │   <button onClick={(e) => {         ──> 1   │
                                    │     console.log(e.clientX);         ──> 2   │
                                    │   }}>                                       │
                                    │     Click me                                │
                                    │   </button>                                 │
                                    │                                             │
                                    └─────────────────────────────────────────────┘

                     1. TypeScript бачить JSX-атрибут onClick на тегу <button> і завдяки контекстному типізуванню
                        автоматично визначає тип параметра e (синтетичної події) як React.MouseEvent<HTMLButtonElement>

                     2. Завдяки цьому ми отримуємо автокомпліт властивостей подій миші (clientX, clientY) та можемо
                        звертатися до них без додаткого звуження типів.




  СПОСІБ 2. Явна типізація зовнішньої функції (Out-of-line Handlers):
  ───────────────────────────────────────────────────────────────────

      Якщо обробник виноситься в окрему функцію, контекст втрачається і тоді є два шляхи типізації параметра e
      (синтетичної події):


      ВАРІАНТ А: Пряма типізація параметра event (Найпопулярніший підхід)

                       ┌────────────────────────────────────────────────────────────────────────┐
                       │                                                                        │
                       │   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {    │
                       │     console.log(e.clientX);                                            │
                       │   };                                                                   │
                       │                                                                        │
                       │                                                                        │
                       │   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {   │
                       │     console.log(e.currentTarget.value);                                │
                       │   };                                                                   │
                       │                                                                        │
                       │                                                                        │
                       │                                                                        │
                       │   <button onClick={handleClick}>Click</button>                         │
                       │   <input onChange={handleChange} />                                    │
                       │                                                                        │
                       └────────────────────────────────────────────────────────────────────────┘




                       📍 Таблиця відповідності типів синтетичних подій JSX-атрибутам та елементам,
                                          на яких ці атрибути використовуються

    ┌───────────────────────────────────┬──────────────────────────────────┬───────────────────────────────────────┐
    │            JSX Атрибут            │         Тип події у React        │        Типовий DOM-елемент (T)        │
    ├───────────────────────────────────┼──────────────────────────────────┼───────────────────────────────────────┤
    │                                   │                                  │                                       │
    │  onClick, onMouseDown, onMouseUp  │  React.MouseEvent<T>             │  HTMLButtonElement, HTMLDivElement    │
    │                                   │                                  │                                       │
    │  onChange                         │  React.ChangeEvent<T>            │  HTMLInputElement, HTMLSelectElement  │
    │  onInput                          │  React.InputEvent<T>             │  HTMLInputElement, HTMLSelectElement  │
    │                                   │                                  │                                       │
    │  onSubmit                         │  React.SubmitEvent<T>            │  HTMLFormElement                      │
    │                                   │                                  │                                       │
    │  onKeyDown, onKeyUp               │  React.KeyboardEvent<T>          │  HTMLInputElement                     │
    │                                   │                                  │                                       │
    │  onFocus, onBlur                  │  React.FocusEvent<T>             │  HTMLInputElement                     │
    │                                   │                                  │                                       │
    │  onScroll                         │  React.UIEvent<T>                │  HTMLDivElement                       │
    │                                   │                                  │                                       │
    │  onDragOver, onDrop               │  React.DragEvent<T>              │  HTMLDivElement                       │
    │                                   │                                  │                                       │
    └───────────────────────────────────┴──────────────────────────────────┴───────────────────────────────────────┘




      ВАРІАНТ Б: Типізація всієї функції-обробника через спеціалізовані типи React

         Замість того, щоб безпосередньо типізувати параметр події (event) у сигнатурі функції-обробника, ми типізуємо
         увесь обробник за допомогою спеціалізованих типів обробників подій з бібліотеки React (React.MouseEventHandler,
         React.ChangeEventHandler, etc).

         Таким чином, параметр e (event) автоматично отримує тип React.MouseEvent<HTMLButtonElement>, оскільки в типі
         React.MouseEventHandler<HTMLButtonElement>, яким типізовано весь обробник, уже визначений тип параметра функції,
         тобто event.

                    ┌──────────────────────────────────────────────────────────────────────────────┐
                    │                                                                              │
                    │   const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {   │
                    │     console.log(e.clientX);                                                  │
                    │   };                                                                         │
                    │                                                                              │
                    └──────────────────────────────────────────────────────────────────────────────┘




               📍 Таблиця відповідності типів обробників синтетичних подій JSX-атрибутам та DOM-елементам,
                                    на яких ці атрибути зазвичай використовуються

    ┌───────────────────────────────────┬──────────────────────────────────┬───────────────────────────────────────┐
    │            JSX Атрибут            │       Тип обробника у React      │        Типовий DOM-елемент (T)        │
    ├───────────────────────────────────┼──────────────────────────────────┼───────────────────────────────────────┤
    │                                   │                                  │                                       │
    │  onClick, onMouseDown, onMouseUp  │  React.MouseEventHandler<T>      │  HTMLButtonElement, HTMLDivElement    │
    │                                   │                                  │                                       │
    │  onChange                         │  React.ChangeEventHandler<T>     │  HTMLInputElement, HTMLSelectElement  │
    │  onInput                          │  React.InputEventHandler<T>      │  HTMLInputElement, HTMLSelectElement  │
    │                                   │                                  │                                       │
    │  onSubmit                         │  React.SubmitEventHandler<T>     │  HTMLFormElement                      │
    │                                   │                                  │                                       │
    │  onKeyDown, onKeyUp               │  React.KeyboardEventHandler<T>   │  HTMLInputElement                     │
    │                                   │                                  │                                       │
    │  onFocus, onBlur                  │  React.FocusEventHandler<T>      │  HTMLInputElement                     │
    │                                   │                                  │                                       │
    │  onScroll                         │  React.UIEventHandler<T>         │  HTMLDivElement                       │
    │                                   │                                  │                                       │
    │  onDragOver, onDrop               │  React.DragEventHandler<T>       │  HTMLDivElement                       │
    │                                   │                                  │                                       │
    └───────────────────────────────────┴──────────────────────────────────┴───────────────────────────────────────┘






════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                         📍 DOM EVENTS (Нативні Події Браузера)
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  Усі нативні об'єкти подій (events), які браузер передає в у функції-обробники (event handlers), створюються браузером
  на основі класів, побудованих за принципом об'єктно-орієнтованого успадкування (ООП / Class Extension).


══════════════════════════
  1. Базовий клас Event:
══════════════════════════

  В основі цієї системи лежить базовий клас Event. Він задає універсальну каркасну структуру, яку повинен мати
  будь-який об'єкт події (event).

  Він гарантує, що БУДЬ-ЯКИЙ ОБ'ЄКТ ПОДІЇ матиме наступні базові поля та методи:

       ◦ e.target — посилання на конкретний DOM-елемент, на якому безпосередньо сталася подія
         (наприклад, точна кнопка чи інпут, по якому клікнув користувач)

       ◦ e.currentTarget — посилання на DOM-елемент, на який нав'язаний обробник події, який перехопив даний event

       ◦ e.type — назва конкретної події (рядок, наприклад: 'click', 'keydown', 'transitionend')


       ◦ e.preventDefault() — метод для скасування дефолтних дій браузера при конкретній події
         (наприклад, запобігання дефолтній відправці форми та перезавантаженню сторінки при натисканні кнопки submit)

       ◦ e.stopPropagation() — метод для зупинки подальшого розповсюдження (propagation) події по DOM-дереву (як вниз
         так і вгору). Він зупиняє весь процес Propagation, а не лише спливання (Bubbling).




                 ════════════════════════════════════════  📍 Event Propagation  ═══════════════════════════════════════

                    Event propagation (поширення події) — це процес проходження події через propagation path:
                    від window до target через DOM-дерево (коренем якого є document), а потім у зворотньому напрямку
                    під час bubbling — від target до window.
                                                                  (Target)
                    window ──> document ──> <body> ──> <div> ──> <button> ──> <div> ──> <body> ──> document ──> window


                     Цей процес складається з трьох послідовних фаз:

                           1. Capturing Phase (Занурення / Перехоплення):
                              Подія рухається згори вниз від window через DOM-дерево в напрямку до target
                              (елементу, на якому виникла ця подія)

                              window ──> document ──> <body> ──> <div> ──> <button> (Target)


                           2. Target Phase (Цільова фаза):
                              Подія досягає target (безпосереднього елемента, на якому вона виникла)


                           3. Bubbling Phase (Спливання):
                              Фаза поширення події, під час якої після досягнення target подія рухається назад вгору
                              по DOM-дереву — від target до вершини (window).

                              <button> (Target) ──> <div> ──> <body> ──> document ──> window


                                                          Виклик e.stopPropagation()
                                                         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                       На фазі Capturing
                      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                        Якщо викликати e.stopPropagation() на фазі Capturing (через обробник із { capture: true }),
                        то подальше поширення події припиниться на елементі, на якому спрацював цей обробник: подія
                        не дійде до цільового елемента (Target) та не перейде до фази Bubbling.

                            ┌───────────────────────────────────────────────────────────────────────────────────────┐
                            │                                                                                       │
                            │   parentDiv.addEventListener("click", (e) => {                                        │
                            │     console.log("1. Батько перехопив подію на фазі Capturing.");                      │
                            │                                                                                       │
                            │     e.stopPropagation();  // Якщо викличемо це тут                                    │
                            │   }, { capture: true });  // Й вкажемо щоб обробник спрацював ще НА ФАЗІ ЗАНУРЕННЯ    │
                            │                                                                                       │
                            │                                                                                       │
                            │                                                                                       │
                            │   button.addEventListener("click", () => {                                            │
                            │     console.log("2. Клік по кнопці"); // ЦЕЙ КОД НІКОЛИ НЕ ВИКОНАЄТЬСЯ                │
                            │   });                                 // Тобто подія не дійде до target               │
                            │                                                                                       │
                            └───────────────────────────────────────────────────────────────────────────────────────┘


                       На фазі Bubbling
                      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                        Якщо ж викликати e.stopPropagation() на фазі Bubbling (не передавати в метод addEventListener
                        третім аргументом об'єкт із налаштуваннями { capture: true }, оскільки за замовчуванням capture
                        дорівнює false) — подія дійде до target й потім спливатиме вгору, поки не буде переховлена
                        обробником події з викликом e.stopPropagation(), після чого її подальше поширення припиниться.

                        Вона не підніматиметься далі до вищих батьківських елементів по DOM-дереву.




══════════════════════════════════════════════════
  2. Похідні класи-спадкоємці (Extension-класи):
══════════════════════════════════════════════════

  Щоб не загромаджувати базовий клас специфічними властивостями, які потрібні лише для окремих івентів (наприклад,
  координати миші відносно viewport при кліку чи код натиснутої клавіші), браузер використовує механізм розширення
  класів (class extension).

  Ці специфічні властивості винесені в окремі класи, які РОЗШИРЮЮТЬ базовий Event, тобто УСПАДКОВУЮТЬ його властивості
  та методи (class inheritance):



                                Event
                                │
                                ├──── class UIEvent extends Event
                                │     │
                                │     ├── class MouseEvent extends UIEvent
                                │     │
                                │     ├── class KeyboardEvent extends UIEvent
                                │     │
                                │     └── ...
                                │
                                ├── class TransitionEvent extends Event
                                │
                                ├── AnimationEvent extends Event
                                │
                                └── ...



  📍 UIEvent extends Event
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

     UIEvent — це похідний клас, який розширює базовий Event і слугує суперкласом (надкласом) ДЛЯ ПОДІЙ, ЩО ВИНИКАЮТЬ
     БЕЗПОСЕРЕДНЬО ПРИ ВЗАЄМОДІЇ КОРИСТУВАЧА З ІНТЕРФЕЙСОМ (кліки мишею, введення з клавіатури, наведення фокусу, etc)

     Оскільки такі події мають спільні властивості їх винесли в окремий надклас UIEvent, щоб уникнути дублювання.

     Тож UIEvent розширює Event властивостями, які є спільними для подій, що виникають безпосередньо при взаємодії
     користувача з інтерфейсом, а саме:

           ◦ view: посилання на об’єкт window, у контексті якого відбулася взаємодія користувача з інтерфейсом
             (наприклад, window поточної сторінки або window iframe).

           ◦ detail: числове значення з додатковими деталями UI-взаємодії. Це значення залежить від конкретного
             типу події, наприклад для MouseEvent — це лічильник послідовних кліків у межах короткого проміжку
             часу (1 — звичайний клік, 2 — dblclick, 3 — потрійний клік).



                   ════════════════════════════════ 📍 Inline Frame (Вбудований фрейм) ═════════════════════════════════

                      <iframe> (Inline Frame) — це спеціальний HTML-тег, який дозволяє вбудувати окремий HTML-документ
                      (іншу веб-сторінку) всередину поточної сторінки.


                      Кожен <iframe> завантажує свою сторінку в окремому ізольованому середовищі:

                          ◦ У нього своє власне, ізольоване від головної сторінки DOM-дерево

                          ◦ Власне JavaScript-середовище виконання (Realm):

                               Код усередині фрейму виконується в окремому JavaScript-середовищі та не має прямого
                               доступу до змінних і стану JavaScript-середовища батьківської сторінки.

                               Тож помилка або нескінченний цикл у коді всередині фрейму не зможе нашкодити стану
                               головної сторінки.


                          ◦ Окремий глобальний об'єкт window:

                               Тому UI-подія, що виникла всередині фрейму, у властивості e.view посилатиметься саме
                               на window фрейму, а не на window батьківської сторінки.


                          ◦ Свої стилі (CSS), які не застосовуються до DOM-дерева батьківської сторінки і навпаки.


                                              Основні сценарії використання <iframe> у веб-розробці:
                                             ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                      1. Інтеграція стороннього медіа-контенту без виходу із сайту:
                         Дозволяє відобразити інтерактивний контент зі стороннього сервісу безпосередньо на сторінці
                         нашого застосунку:

                            ◦ Інтерактивні відеопрогравачі (YouTube):

                                Коли на сайті відображається відео з YouTube, користувач може відтворити його,
                                перемикати якість чи розгортати на весь екран прямо на нашому сайті, не переходячи
                                на youtube.com.

                            ◦ Інтерактивні карти (Google Maps):

                                Вбудована карта, на якій користувач може зумувати, переміщати маркер чи прокладати
                                маршрут безпосередньо на нашому сайті.

                            ◦ Віджети соціальних мереж та коментарів:
                                Відображення стрічки новин, блоку коментарів, які працюють на сторонніх серверах і
                                оновлюються в реальному часі.


                      2. Безпечна обробка чутливих даних (Платіжні шлюзи / Payment Gateways):
                         Використання сторонніх платіжних систем для ізоляції конфіденційних даних карток (LiqPay, тощо)

                            Замість того, щоб сайт сам збирав номер картки та CVV-код (що створює ризик викрадення даних
                            у разі злому сайту), форма введення картки завантажується всередині <iframe> безпосередньо
                            з сервера платіжної системи.

                            Й оскілки iframe завантажений з іншого origin, завдяки браузерній ізоляції та Same-Origin
                            Policy батьківський сайт не має прямого доступу до DOM-дерева всередині <iframe>, а отже,
                            не може прочитати введений користувачем номер картки через звичайний DOM API.


                   ═════════════════════════════════════════════════════════════════════════════════════════════════════



  📍 MouseEvent extends UIEvent
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     MouseEvent розширює UIEvent координатами миші відносно viewport при кліку (clientX, clientY) та числовим
     значенням, що ідентифікує кнопку миші (button):

        ◦ clientX / clientY: координати курсора в пікселях відносно viewport

        ◦ button: числове значення, яке вказує, яку саме кнопку миші було задіяно (click, mousedown, mouseup):

               • 0 — ліва кнопка миші (основний клік)
               • 1 — середня кнопка миші (коліщатко)
               • 2 — права кнопка миші (контекстне меню)



  📍 KeyboardEvent extends UIEvent
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     KeyboardEvent розширює UIEvent даними про клавішу:

        ◦ key: символ або назва клавіші з урахуванням розкладки та мови (наприклад, 'a', 'A', 'Ф', 'Enter').
          Якщо змінити мову з англійської на українську, значення key зміниться з 'a' на 'ф'.


        ◦ code: постійний фізичний код конкретної клавіші на клавіатурі.
          Кожна фізична клавіша має свій унікальний код, який ніколи не змінюється від мови чи розкладки.

          Наприклад: фізична клавіша, яка відповідає позиції KeyA (клавіша «A» в англійській розкладці),
          матиме code: 'KeyA', незалежно від того, яка мова чи розкладка зараз увімкнена.


        ◦ ctrlKey (також altKey, shiftKey, metaKey): булевий прапорець (boolean), який вказує, чи була затиснута
          відповідна клавіша-модифікатор у момент події.



  📍 TransitionEvent extends Event
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     TransitionEvent розширює Event параметрами CSS-переходу (propertyName, elapsedTime).

        ◦ propertyName: назва CSS-властивості, для якої відбувається transition
          (наприклад, height, opacity, transform).

        ◦ elapsedTime: показує, скільки секунд минуло від початку transition на момент спрацьовування події.
          Це значення повністю залежить від того, яку саме подію ми слухаємо:

               • transitionstart ─ 0 (бо transition тільки-но розпочалася)

               • transitioncancel ─ час, який минув від початку transition до моменту його скасування (наприклад, 0.15s)

               • transitionend ─ час, який минув від початку transition до його завершення (наприклад, 0.3s)




════════════════════════════════════════════
  3. Створення екземпляра події браузером:
════════════════════════════════════════════

  Коли у браузері відбувається якась взаємодія користувача з інтерфейсом, браузер використовує ці класи-спадкоємці
  як конструктори для створення об'єктів подій (екземплярів).

  Рушій браузера обирає відповідний клас-спадкоємець, створює його новий екземпляр (instance), заповнює його
  даними і передає цей об'єкт (створений event) аргументом у обробник подій (event handler, який ми передаємо
  другим аргументом при виклику addEventListener):


       ◦ При кліку браузер створює екземпляр MouseEvent для події "click"

       ◦ При натисканні клавіші браузер створює екземпляр KeyboardEvent для події "keydown"

       ◦ При закінченні переходу (transition) браузер створює екземпляр TransitionEvent для події "transitionend"



════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


                                       ┌──────────────────────────────────┐
                                       │           class Event            │  <--- Базовий клас
                                       │  (target, type, preventDefault)  │
                                       └─────────────────┬────────────────┘
                                                         │
                               ┌─────────────────────────┴─────────────────────────┐
                               ▼                                                   ▼
                   ┌───────────────────────┐                           ┌───────────────────────┐
                   │     class UIEvent     │ <-- Похідний клас         │ class TransitionEvent │ <-- Похідний клас CSS
                   │    (view, detail)     │     подій інтерфейсу      │    (propertyName)     │        transitions
                   └───────────┬───────────┘                           └───────────┬───────────┘
                               │                                                   │
              ┌────────────────┴────────────────┐                                  ▼
              ▼                                 ▼
  ┌───────────────────────┐        ┌───────────────────────┐              ◦ "transitionstart"   <-- Конкретні типи подій
  │    class MouseEvent   │        │  class KeyboardEvent  │              ◦ "transitionend"               (e.type)
  │   (clientX, button)   │        │ (key, code, ctrlKey)  │              ◦ "transitionrun"
  └───────────┬───────────┘        └───────────┬───────────┘              ◦ "transitioncancel"
              │                                │
              ▼                                ▼

         ◦ "click"                        ◦ "keydown"
         ◦ "dblclick"                     ◦ "keyup"
         ◦ "mousedown"                    ◦ "keypress"
         ◦ "mouseup"
         ◦ "mousemove"
         ◦ "mouseenter"
         ◦ "mouseleave"



═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                                Типізація useRef
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  Стандартні хуки в React — це заздалегідь типізовані функції, описані у пакеті @types/react. Оскільки типізація React
  винесена в цей окремий пакет, під час створення TypeScript-проєкту його потрібно дозавантажувати окремо.

  В архітектурі React стандартні хуки можна умовно поділити на дві категорії за принципом їхньої типізації:


────────────────────────────────────────────────────────────────────
  1. Хуки зі статичним (незмінним) контрактом (без Type Parameter)
────────────────────────────────────────────────────────────────────

  Хуки на кшталт useEffect або useLayoutEffect мають фіксовану сигнатуру, яка не залежить від Type Parameter.

  Тобто типи їх аргументів і те, що вони повертають, заздалегідь чітко відомі й не змінюються залежно від способу
  використання. Вони мають статичний (незмінний / жорстко визначений) контракт:


   1. Першим аргументом завжди має бути функція зворотного виклику (callback), яка повертає або void, або функцію
      очищення, з сигнатурою () => void.


   2. Другий аргумент є опціональним і має тип ReadonlyArray<unknown> або undefined.


      2.1 ReadonlyArray<unknown>
      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
          Це масив залежностей (dependencies), в який передаються значення, від яких залежить чи буде callback-функція,
          передана першим аргументом, викликатися повторно.


          Чому ReadonlyArray:

             Бо це масив залежностей, який React використовує виключно для читання та порівняння із попередньою
             версією при ререндері компонента.

             Контракт ReadonlyArray повністю закриває можливість випадкового мутування цього масиву (виклику
             методів push, splice тощо) як усередині хука, так і зовні.


          Чому unknown:

             В масив залежностей передаються значення абсолютно різних типів (примітиви, об'єкти, функції).

             Для типізації такого масиву оптимальним варіантом є Universal Type unknown, який є надмножиною для
             всіх типів, а отже містить в собі будь-які можливі типи даних.


      2.2 undefined
      ‾‾‾‾‾‾‾‾‾‾‾‾‾
          Другий аргумент можна взагалі не передавати — тоді значення параметра буде undefined.

          У такому випадку колбек, переданий першим аргументом, виконуватиметься після кожного ререндеру компонента.



  Оскільки для хуків useEffect або useLayoutEffect їхня сигнатура заздалегідь визначена й не залежить від конкретного
  Type Parameter, для їхньої типізації Type Parameters не потрібні.



──────────────────────────────────────────────
 2. Хуки для збереження даних (Generic-хуки)
──────────────────────────────────────────────

  useRef та useState мають параметризований (гнучкий) контракт.

  Тобто контракт, який визначається не при оголошенні хука, а безпосередньо при його виклику ─ залежно від типу,
  який ми явно передаємо як Type Argument на місце Type Parameter, або типу, який TypeScript виводить автоматично
  (Type Inference), якщо аргумент типу не вказано.

  Коли розробники React створювали useRef та useState, вони не могли заздалегіть передбачити, значення яких типів ми
  вирішимо зберігати в рефі або в локальному стані.


    ◦ Для рефа це може бути number (ID таймера), string, об'єкт або нативний DOM-елемент (наприклад, HTMLDivElement).
      Значення рефу також може змінюватися через пряму мутацію властивості .current або автоматично оновлюватися
      самим React, коли реф прив'язаний до DOM-елемента.

    ◦ Для локального стану це може бути будь-який тип даних: примітив, масив або об'єкт.
      Значення стану також може замінюватися через setter.


  Саме тому ці хуки реалізовані як Generic-хуки (функції, які використовують Type Parameter).

  Type Parameter дозволяє не задавати конкретний тип при оголошенні хука, а створювати узагальнений тип-заглушку <T>,
  яка вказує, що під час виклику цього хука на це місце буде підставлений конкретний тип даних.

  Завдяки цьому хуки useRef та useState є параметрично поліморфними — тобто здатними працювати з будь-якими типами
  даних за допомогою єдиної реалізації.




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                                📍 Типізації хука useRef
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


                               У React хук useRef має два основні сценарії використання:
                                 │
                              1. ├── Збереження значення між ререндерами
                                 │     │
                                 │     ├── значення, яке вже існує на момент першого рендеру
                                 │     │
                                 │     └── значення, яке ще не існує (початкове значення undefined)
                                 │
                                 │
                              2. └── Збереження посилання на DOM-елемент



════════════════════════════════════════════════════════════════════════════
  1. Збереження значення між ререндерами (зміна якого не викличе ререндер)
════════════════════════════════════════════════════════════════════════════

  Призначення:
  ‾‾‾‾‾‾‾‾‾‾‾‾
     Хук useRef використовується для збереження значення (наприклад, ID таймера чи попередніх пропсів) між
     ререндерами компонента, зміна якого не повинна тригерити повторний ререндер.

     Це значення зберігається у властивості ref.current. Тож подальша мутація цієї властивості (прямий перезапис
     значення), не викличе ререндер, а сам ререндер компонента не скине значення в цьому полі.


  Початкове значення (initialValue):
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     В хук передається повноцінне початкове значення, яке вже існує на момент першого рендеру (а не тимчасова
     заглушка, яка згодом перезапишеться значенням іншого типу, не сумісним із початково визначеним типом).

     Тип цього значення одразу є сумісним із Type Argument, який ми передаємо вручну або який TypeScript виводить
     автоматично (Type Inference).


     КЛЮЧОВІ МОМЕНТИ:

          1. Повна відповідність типів:
             Тип початкового значення є сумісним з переданим (або виведеним) Type Argument <T>.

          2. Стабільність типу при подальшій зміні:
             TypeScript дозволятиме надалі записувати в ref.current лише значення, сумісні з початково визначеним
             типом.

             Тобто початкове значення не є тимчасовою заглушкою, яка згодом буде замінена значенням іншого
             несумісного типу.


  Поведінка властивості ref.current:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     У старих версіях React типізація useRef через різні Overload Signatures могла повертати або MutableRefObject<T>
     з мутабельним .current, або RefObject<T> з readonly .current.


        ┌───────────────────────────────  Стара типізація useRef (до React 19)  ───────────────────────────────┐
        │                                                                                                      │
        │                    Інтерфейси об'єктів, які повертали Overload Signatures useRef:                    │
        │                                                                                                      │
        │                                                                                                      │
        │   interface MutableRefObject<T> {                                                                    │
        │     current: T;                   ──> Властивість можна вільно перезаписувати (мутабельна)           │
        │   }                                                                                                  │
        │                                                                                                      │
        │   interface RefObject<T> {                                                                           │
        │     readonly current: T | null;   ──> Властивість закрито для ручного перезапису (нею керує React)   │
        │   }                                                                                                  │
        │                                                                                                      │
        └──────────────────────────────────────────────────────────────────────────────────────────────────────┘


     Починаючи з React 19 (2024 p.) цей поділ прибрали: useRef тепер в усіх випадках (і коли useRef використовується
     для збереження посилання на DOM-element, і коли в ref зберігається звичайне значення) повертає RefObject з
     мутабельною властивістю .current.

     Тобто тепер властивість .current завжди є мутабельною, тому TypeScript дозволяє змінювати її вручну через пряме
     присвоєння: ref.current = newValue;


           ┌───────────────────────────  Сучасна типізація useRef (React 19+)  ────────────────────────────┐
           │                                                                                               │
           │                                                                                               │
           │                                                             Типізація useRef у @types/react   │
           │                                                             ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾   │
           │                                                                                               │
           │   interface RefObject<T> {                                                                    │
           │     current: T;      ──> Властивість мутабельна завжди                                        │
           │   }                                                                                           │
           │                                                                                               │
           │                                                                                               │
           │                                                                                               │
           │             ─────────  Використання в Overload Signatures хука useRef  ─────────              │
           │                                                                                               │
           │                                                                                               │
           │   (1)  function useRef<T>(initialValue: T): RefObject<T>;                                     │
           │                                                                                               │
           │   (2)  function useRef<T>(initialValue: T | null): RefObject<T | null>;                       │
           │                                                                                               │
           │   (3)  function useRef<T>(initialValue: T | undefined): RefObject<T | undefined>;             │
           │                                                                                               │
           │                                                                                               │
           │                                                                                               │
           │                                                                                               │
           │                                                                   Реалізація useRef у React   │
           │                                                                   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾   │
           │                                                                                               │
           │                                                                                               │
           │             ────────────────  Implementation Signature useRef  ─────────────────              │
           │                                                                                               │
           │                                                                                               │
           │   function useRef<T>(initialValue: T | null | undefined): RefObject(T | null | undefined) {   │
           │     //реалізація хука                                                                         │
           │   }                                                                                           │
           │                                                                                               │
           │                                                                                               │
           └───────────────────────────────────────────────────────────────────────────────────────────────┘


                  (1) Overload Signature для звичайного початкового значення: Якщо useRef потрібен для
                      збереження значення, яке вже існує на момент першого рендеру (виклику useRef).


                  (2) Overload Signature для посилання на DOM-елемент: Якщо useRef потрібен для
                      збереження посилання на DOM-елемент.

                      На момент першого рендеру DOM-вузла ще немає, тому initialValue — null.
                      Після створення DOM-вузла React сам запише посилання на нього в ref.current


                  (3) Overload Signature для початкового значення undefined: Якщо useRef потрібен для
                      збереження значення, яке на момент першого рендеру ще не визначене.

                      У такому випадку initialValue — undefined. Пізніше в ref.current можна буде
                      записати значення типу T.



═════════════════════════════════════════════════════════════
  2. Отримання посилання на нативний DOM-елемент (DOM Ref)
═════════════════════════════════════════════════════════════

  Призначення:
  ‾‾‾‾‾‾‾‾‾‾‾‾
     Хук useRef використовується, щоб отримати посилання на нативний DOM-вузол браузера (наприклад, HTMLDivElement).


  Початкове значення (initialValue):
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Нюанс із null: На момент першого рендеру компонента реального DOM-вузла в браузері ще не існує.

     React створить його пізніше й сам додасть посилання на нього в поле ref.current. Тому як початковий аргумент
     функції ми змушені передавати null.


  Поведінка властивості ref.current:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Вимога до .current: Коли DOM-елемент змонтується, React сам підставить посилання на нього в ref.current.

     До React 19 це поле було ReadOnly (тільки для читання) на рівні TypeScript-типізації, щоб захистити посилання від
     випадкового ручного перезапису. Тобто TypeScript не дозволяв напряму змінити поле: ref.current = newValue;

     Сучасна типізація useRef (React 19+) більше не встановлює такого обмеження: поле .current є мутабельним, тому його
     можна змінювати вручну. Відповідно, відповідальність за те, щоб випадково не перезаписати посилання на DOM-елемент,
     тепер лежить на розробнику.



════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                                📍 Типізація хука useState
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  Хук useState використовується для збереження значення між рендерами, зміна якого повинна викликати повторний рендер
  компонента (на відміну від useRef).

  useState повертає кортедж із двох елементів: [поточне значення state, setter для його оновлення].


        ┌─────────────────────────────────────────  Типізація useState  ────────────────────────────────────────┐
        │                                                                                                       │
        │                                                                                                       │
        │                                                                   Типізація useState у @types/react   │
        │                                                                   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾   │
        │                                                                                                       │
        │                                                                                                       │
        │   type SetStateAction<S> = S | ((prevState: S) => S);                                                 │
        │                                                                                                       │
        │   type Dispatch<A> = (value: A) => void;                                                              │
        │                                                                                                       │
        │                                                                                                       │
        │                                                                                                       │
        │        ─────────────────────────  Overload Signatures хука useState  ─────────────────────────        │
        │                                                                                                       │
        │                                                                                                       │
        │   (1) function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];            │
        │                                                                                                       │
        │   (2) function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];   │
        │                                                                                                       │
        │                                                                                                       │
        │                                                                                                       │
        │                                                                                                       │
        │                                                                         Реалізація useState у React   │
        │                                                                         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾   │
        │                                                                                                       │
        │                                                                                                       │
        │        ─────────────────────────  Implementation Signature useState  ─────────────────────────        │
        │                                                                                                       │
        │                                                                                                       │
        │   type BasicStateAction<S> = S | ((prevState: S) => S);                                               │
        │                                                                                                       │
        │                                                                                                       │
        │   function useState<S>(initialState: (() => S) | S): [S, Dispatch<SetStateAction<S>>] {               │
        │     //реалізація хука                                                                                 │
        │   }                                                                                                   │
        │                                                                                                       │
        │                                                                                                       │
        └───────────────────────────────────────────────────────────────────────────────────────────────────────┘



────────────────────────────────────────   ┌──────────────────────────────────────────┐
  1. Декралація типу сетера (setState)     │  type Dispatch<A> = (value: A) => void;  │
────────────────────────────────────────   └──────────────────────────────────────────┘

  Сетер (setState) — це другий елемент кортежу, який повертає хук useState.


  Чому він типізований як Dispatch?

  У типізації React цей сетер має тип Dispatch, оскільки є dispatch-функцією: Він приймає як аргумент оновлення state
  (action) і передає (диспачить) його внутрішньому механізму React для подальшої обробки та визначення нового значення
  state.



  Що таке Dispatch у концепції програмування?
  ───────────────────────────────────────────

     Dispatch — це функція, яка приймає інструкцію (action) і диспатчить її певному механізму для подальшої обробки.
     Таким механізмом може бути React або Redux.

          ◦ У React dispatch-функція передає оновлення локального стану внутрішньому механізму React.

          ◦ У Redux dispatch-функція передає action у middleware pipeline, де middleware можуть виконати
            додаткову обробку: змінити, відкласти або зупинити action.

            Якщо ж action передається далі, він доходить до reducer для визначення нового глобального state.


     Тобто Dispatch — це універсальний термін для функції, яка надсилає action (дію) у систему, яка має його обробити.



  Детальніше про Dispatch у React:
  ────────────────────────────────

     Це функція, яка приймає оновлення state (action) і відправляє його внутрішньому механізму React, де воно
     обробляється для визначення нового значення state та планування оновлення компонента.


     Сеттер setState ─ є саме такою dispatch-функцією:

        1. Коли ми викликаємо setState(newValue) або setState(prev => prev + value) сетер не змінює state напряму.

        2. Він діспатчить оновлення у внутрішній механізм React: «Ось значення (звичайний action) або функція
           (action, який є функцією) для обчислення нового значення цього state».

        3. Отриманий action потрапляє у внутрішню чергу оновлень (Update Queue) компонента, де можуть накопичуватися
           кілька оновлень. Під час наступного рендера React послідовно опрацює накопичені updates та визначить нове
           значення state.


     Саме тому setState має контракт Dispatch<A>.

                                      ┌──────────────────────────────────────────┐
                                      │  type Dispatch<A> = (value: A) => void;  │
                                      └──────────────────────────────────────────┘

     Значення, анотоване цим контрактом, має бути функцією, яка ПРИЙМАЄ ОДИН АРГУМЕНТ типу A (Action) і НІЧОГО НЕ
     ПОВЕРТАЄ (void — результат виклику цієї функції не призначений для подальшого використання в коді).



────────────────────────────────────────────────   ┌───────────────────────────────────────────────────────┐
  2. Декралація типу аргументу сетера:  Action     │  type SetStateAction<S> = S | ((prevState: S) => S);  │
────────────────────────────────────────────────   └───────────────────────────────────────────────────────┘


  ВАЖЛИВИЙ МОМЕНТ:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Функція setState в React розроблена таким чином, щоб приймати або нове значення state, або callback-функцію,
     яка отримує попередній state як аргумент і повертає новий.


     Тобто нам заздалегідь відомо, які саме два варіанти значень можна передавати в setter:

          ◦ Або нове значення state   ──> S (state)

          ◦ Або функція для обчислення нового значення state на основі попереднього.
            Вона приймає попередній state та повертає новий   ──> (prevState: S) => S


     Й оскільки тип аргументу сетера (setState) відомий заздалегідь, він був зручно задекларований в TypeScript
     як окремий Union Type SetStateAction<S>, який описує допустимі типи екшенів для оновлення state:

                               ┌───────────────────────────────────────────────────────┐
                               │  type SetStateAction<S> = S | ((prevState: S) => S);  │
                               └───────────────────────────────────────────────────────┘


     Назва SetStateAction<S> підкреслює, що це саме ТИП ЕКШЕНУ (дії) для оновлення state, який приймає dispatch-функція
     setState.



────────────────────────────────────────
  3. Overload Signatures хука useState
────────────────────────────────────────

          ┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
          │                                                                                                   │
          │   function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];            │
          │                                                                                                   │
          │   function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];   │
          │                                                                                                   │
          └───────────────────────────────────────────────────────────────────────────────────────────────────┘



────────────────────────────────────────────────────
  3.1  Overload Signature із початковим значенням:
────────────────────────────────────────────────────


  Призначення сигнатури:
  ──────────────────────

     Ця Overload Signature використовується коли в useState явно передано initialState (початковий стан або
     функцію-ініціалізатор, виклик якої поверне початковий стан).

     Тобто коли useState потрібен для зберігання стану, початкове значення якого вже існує або може бути обчислене
     на момент першого рендеру (ініцілізації стану).



  Варіанти аргументу initialState:
  ────────────────────────────────

     За цією сигнатурою в useState як аргумент (initialState) можна передати:

       1. АБО ЯВНЕ ЗНАЧЕННЯ (S):

            Значення, яке вже існує на момент виклику хука (наприклад, примітив, об'єкт, тощо).

            Приклад: const [count, setCount] = useState(0);


       2. АБО ЛЕДАЧИЙ ІНІЦІАЛІЗАТОР / Lazy Initializer (() => S):

            Функцію-ініціалізатор, яка повертає початкове значення (S).

            React викликає її один раз при першому рендері (під час ініціалізації state), й використовує її результат
            як початкове значення state.

            Приклад: const [count, setCount] = useState(() => savedCount ? savedCount : 0);



  Автоматичне виведення типів (Type Inference):
  ─────────────────────────────────────────────

     При використанні цієї сигнатури явне вказання Type Argument <S> є надлишковим, оскільки TypeScript автоматично
     виведе тип стану безпосередньо з initialState (Type Inference). Саме цей автоматично виведений тип стану і буде
     використаний для типізації аргументу сеттера.

     Типізація працює коректно навіть без явного вказання Type Argument <S> завдяки тому, що в хук передається
     повноцінне значення, яке вже існує або буде обчислене на момент першого рендеру (ініцілізації стану), а не
     тимчасова заглушка, яка в майбутньому оновиться значенням іншого, несумісного типу.

     Звісно, якщо планується, що state надалі допускатиме значення ширшого типу, ніж тип initialState, тоді потрібно
     явно передати в Type Argument ширший тип, який вміщатиме всі можливі типи state (наприклад, Union Type):

                                  const [user, setUser] = useState<User | null>(null);
                                  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾



  Структура кортежу, який повертає useState:
  ──────────────────────────────────────────

     Хук повертає кортеж, де тип S (який був автоматично виведений з initialState або переданий як Type Argument)
     використовується і для поточного значення state, і для типізації його подальших оновлень:

                                       ┌─────────────────────────────────────┐
                                       │  [S, Dispatch<SetStateAction<S>>];  │
                                       └─────────────────────────────────────┘

        ◦ Поточне значення стану (Current State): має тип S

        ◦ Сеттер оновлення стану (State Dispatcher): приймає action, який буде або значенням типу S, або функцією,
          що отримає попередній state типу S та поверне новий state типу S.



──────────────────────────────────────────────────────────────────────────────────────────────
  3.2  Overload Signature без початкового значення (Якщо useState викликано без аргументів):
──────────────────────────────────────────────────────────────────────────────────────────────

             function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];


  Призначення сигнатури:
  ──────────────────────

     Ця Overload Signature використовується коли хук useState викликається взагалі без аргументів: useState().

     Тобто коли на момент виклику хука початковий стан (initialState) не передається, оскільки значення, яке ми
     прануємо зберігати в цьому state ще не прийшло (наприклад, дані мають завантажитися пізніше через асинхронний
     запит).

     За цією сигнатурою аргумент в useState відсутній взагалі:  const [user, setUser] = useState<User>();
                                                                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


  Механіка відсутності аргументів (JS Runtime & Default Type Parameter):
  ──────────────────────────────────────────────────────────────────────

     У JavaScript, якщо функцію викликати без аргументу, відповідний параметр отримає значення undefined.

     Хук useState також можна викликати без аргументу initialState. У такому випадку цей параметр також отримає
     значення undefined.

     TypeScript враховує цю JS поведінку і описує її окремою Overload Signature, в якій задано Default Type Parameter
     (значення Type Parameter за замовчуванням): S = undefined (початкове значення state може взагалі не передаватися
     в хук й тоді воно матиме тип undefined).



  Пастка з відсутністю Type Inference та заблокованим станом:
  ───────────────────────────────────────────────────────────

     Оскільки хук useState викликається без аргументу (ми не передаємо initialState), TypeScript не має з чого
     автоматично вивести Type Parameter (S) за допомогою механізму Type Inference.

     У такому разі тип стану (S) визначається через Default Type Parameter, вказаний у цій сигнатурі як: S = undefined

     Якщо залишити тип state у такому вигляді, стан буде заблокований: ми не зможемо оновити його, коли прийдуть
     реальні дані, оскільки setter очікуватиме лише Action, який повинен бути:

         ◦ або значенням undefined

         ◦ або функцією, яка отримує попередній state (undefined) та повертає новий state, який також повинен мати
           тип undefined



  Рішення: Явне вказання Type Argument:
  ─────────────────────────────────────

     Тому при використанні useState без аргументів ОБОВ'ЯЗКОВО потрібно явно передавати Type Argument із типом даних,
     які ми плануємо зберігати в state (якщо, звісно, state у майбутньому має містити значення, відмінні від undefined).

                                     ┌─────────────────────────────────────────────┐
                                     │  type User = {                              │
                                     │    id: number;                              │
                                     │    name: string                             │
                                     │  }                                          │
                                     │                                             │
                                     │  const [user, setUser] = useState<User>();  │
                                     └─────────────────────────────────────────────┘


     У сигнатурі вже прописано S | undefined, тому після підстановки User на місце Параметра Типу S утвориться
     потрібний Union Type (User | undefined) для поточного state та сеттера.



  Структура кортежу, який повертає useState:
  ──────────────────────────────────────────

     За цією сигнатурою хук useState повертає кортеж:

        1. Де першим елементом є поточне значення стану (Current State), яке має тип: S | undefined.

           Це означає, що state може містити або значення типу S, або undefined.

           Оскільки це Union Type, TypeScript вимагатиме обов'язкового звуження типу (Type Narrowing) перед
           використанням значення стану.

           Зважаючи на те, що один із типів у юніоні — це undefined (відсутність значення), звуження виконується
           шляхом перевірки на наявність даних:

                 ◦ Optional Chaining: user?.name

                 ◦ Або Type Guard: if (user) {}


        2. Другим елементом кортежу є сеттер (State Dispatcher), який приймає action, який може бути:

             ◦ або значенням типу S | undefined,

             ◦ або функцією, що отримає попередній state типу S | undefined та поверне новий state типу S | undefined




─────────────────────────────────────────────
  4. Implementation Signature хука useState
─────────────────────────────────────────────

  Implementation Signature повинна мати достатньо широку сигнатуру, щоб враховувати будь-який варіант виклику функції,
  дозволений через її Overload Signatures.

  Тобто Implementation Signature зобов'язана:

      1. Приймати всі можливі типи аргументів, які описані в її Overload Signatures

      2. Повертати тип, який також вміщає всі можливі варіанти значень, що повертають її Overload Signatures


                       ┌────────────────────────────────────────────────────────────────────────┐
                       │                                                                        │
                       │   type BasicStateAction<S> = S | ((prevState: S) => S);    ───> (1)    │
                       │                                                                        │
                       │                                                                        │
                       │   function useState<S>(                                    ───> (2)    │
                       │     initialState?: (() => S) | S                                       │
                       │   ): [S | undefined, Dispatch<BasicStateAction<S | undefined>>] {      │
                       │                                                                        │
                       │     //реалізація хука                                                  │
                       │   }                                                                    │
                       │                                                                        │
                       └────────────────────────────────────────────────────────────────────────┘


  1.  Типізація Action для сетеру setState, прописана в коді самого React
  ───────────────────────────────────────────────────────────────────────

     BasicStateAction<S> — це також типізація екшену сетера (setState), як і SetStateAction<S>.
     Вони абсолютно ідентичні за ситаксисом та струтурою, єдина різниця між ними — це де саме вони прописані:

          ◦ BasicStateAction<S> — це внутрішня типізація екшену, прописана в самому коді бібліотеки React,
            (її використовує Implementation Signature хука useState, яка також там прописана)

          ◦ SetStateAction<S> — це типізація екшену, прописана в публічному пакеті @types/react.
            (її використовують Overload Signatures хука useState, які також прописані в цьому пакеті)



  2. Аргументи Implementation Signature хука useState
  ───────────────────────────────────────────────────

     Оскільки за Overload Signatures в хук useState аргументом може передаватися:

          ◦ АБО початкове значення стану, або функція (Lazy Initializer), виклик якої поверне початкове значення стану
            (Overload Signature з початковим значенням)

          ◦ АБО аргумент може не передаватися взагалі  (Overload Signature без початкового значення)


     Параметри Implementation Signature мають передбачати всі ці випадки, тому вони виглядають ось так:

                                         ┌────────────────────────────────────┐
                                         │   (initialState?: (() => S) | S)   │
                                         └────────────────────────────────────┘

     Implementation Signature хука оголошує контракт, за яким хук приймає один опційний аргумент (тобто він може не
     передаватися взагалі).

     Якщо ж він все ж таки передається, це буде або значення типу S (початкове значення стану), або функція, яка
     повертає значення типу S.



  3. Результат, який повертає Implementation Signature хука useState (Return Type)
  ────────────────────────────────────────────────────────────────────────────────

     Оскільки значення, яке повертає хук useState за Overload Signatures, завжди є кортежем [currentState, dispatcher],
     але його типізація залежить від наявності аргументу:

         1. За першою Overload Signature (якщо initialState передано):

              1.1  Перший елемент (currentState) має тип S, визначений через Type Inference з initialState
                   (або переданий як Type Argument для ширшого типу);

              1.2  Другий елемент (State Dispatcher) приймає Action, прив'язаний до того ж виведеного типу S
                   (і для нового значення, і для prevState / nextState у оновленні через функцію).


         2. За другою Overload Signature (якщо initialState відсутній):

              2.1  Перший елемент (currentState) отримує Union Type S | undefined;

              2.2  Другий елемент (State Dispatcher) приймає Action, прив'язаний до того ж Union Type S | undefined
                   (і для значення, і для prevState / nextState у оновленні через функцію).


     Й Return Type Implementation Signature зобов'язаний вміщати обидва ці варіанти:

                          ┌──────────────────────────────────────────────────────────────────┐
                          │   : [S | undefined, Dispatch<BasicStateAction<S | undefined>>]   │
                          └──────────────────────────────────────────────────────────────────┘


     Тому Implementation Signature повертає кортеж із двох елементів:

          1. Де першим елементом кортежу є поточний стан (Current State), який має тип S | undefined
             (оскільки на момент першого рендеру початкове значення може бути не передане).

          2. Другим елементом кортежу є сеттер оновлення стану (State Dispatcher):
             Типізація якого гарантує що він зможе обробити як нове значення стану типу S, так і undefined, якщо стан
             скидається або ініціалізувався без даних.




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                              Вбудовані Generic-інтерфейси (Built-in Generic Interfaces)

                                     Array<T>, ReadonlyArray<T>, Promise<T>
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

  Вбудовані Generic-інтерфейси — це первинний і основний спосіб типізації складних даних (масивів, об'єктів, промісів)
  у TypeScript, закладений розробниками мови з моменту її створення.

  Саме через декларації interface з Type Parameter (<T>) творці TypeScript заклали типізацію для всього JavaScript.

  Ключове слово type (Type Aliases) було додано в TypeScript значно пізніше. На самому початку існував тільки interface.


  Чому Built-in (Вбудовані)?
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    Вони є частиною стандартної бібліотеки TypeScript. Нам не потрібно описувати їх вручну чи дозавантажувати через
    npm (як, наприклад, типізацію React-хуків у пакеті @types/react) — вони доступні глобально в будь-якому .ts файлі.


  Чому Generic-інтерфейси?
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Це контракти, описані через ключове слово interface з Type Parameter (<T>).

     Вони описують точну структуру й методи об'єкта:

       ◦ interface Array<T> заздалегідь описує поле length, а також методи .map(), .filter(), .push()

       ◦ interface Promise<T> заздалегідь описує методи .then(), .catch(), .finally()

     При цьому конкретний тип внутрішніх даних не зафіксований назавжди, а залишається параметризованим —
     він підставляється розробником під час використання (наприклад, `Array<number>` чи `Promise<User>`).




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                      📍  ТИПІЗАЦІЯ МУТАБЕЛЬНИХ МАСИВІВ: Array<T>
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

  Базова й первинна типізація будь-якого мутабельного масиву в TypeScript описується вбудованим інтерфейсом:


                               ┌────────────────────── Синтаксис ──────────────────────┐
                               │                                                       │
                               │   interface Array<T> {                                │
                               │     length: number;                                   │
                               │                                                       │
                               │     push(...items: T[]): number;                      │
                               │                                                       │
                               │     filter(predicate: (value: T) => boolean): T[];    │
                               │                                                       │
                               │     map<U>(callback: (value: T) => U): U[];           │
                               │                                                       │
                               │     ...інші стандартні методи масиву                  │
                               │   }                                                   │
                               │                                                       │
                               └───────────────────────────────────────────────────────┘



  Запис назваМетоду() без двокрапки — це скорочений синтаксис оголошення методів усередині об'єктів та класів (Short
  Method Definition). TypeScript лише адаптував цей JS-синтаксис для опису типів цих методів усередині interface.

  Коли ми створюємо об'єкт або клас у JavaScript, ми маємо два способи оголосити метод:

       1. Старий спосіб (ES5)
          Потрібно було писати назву властивості, двокрапку та ключове слово function:


                                       ┌────────────────────────────────────────┐
                                       │                                        │
                                       │    const calculator = {                │
                                       │      double: function(number) {        │
                                       │        return number * this.factor;    │
                                       │      }                                 │
                                       │    };                                  │
                                       │                                        │
                                       └────────────────────────────────────────┘

       2. Сучасний скорочений спосіб (ES6+): Short Method Definition
           Двокрапка та слово function опускаються:

                                       ┌────────────────────────────────────────┐
                                       │                                        │
                                       │    const calculator = {                │
                                       │      double(number) {                  │
                                       │        return number * this.factor;    │
                                       │      }                                 │
                                       │    };                                  │
                                       │                                        │
                                       └────────────────────────────────────────┘




                    ════════════════════════════════════════════════════════════════════════════════
                                  📍  ДЕТАЛЬНИЙ РОЗБІР СТРУКТУРИ ТА СИНТАКСИСУ ARRAY<T>
                    ════════════════════════════════════════════════════════════════════════════════


──────────────────────────────────────    ┌──────────────────────────────┐
  1.1  Декларація Generic-інтерфейсу      │  interface Array<T> { ... }  │
──────────────────────────────────────    └──────────────────────────────┘


  Ми декларуємо контракт (інтерфейс) з ім'ям Array та одразу оголошуємо параметр типу <T> (Type Parameter).

  Оскільки в JS масив є спеціальним об'єктом, TypeScript описує його структуру та типізує його властивості та методи
  саме через interface ─ контракт, створений для опису структури об'єктів (Object Shapes).


  Вимоги контракту:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

     Оскільки контракт описано через interface ─ значення, анотоване цим контактом, повинно мати object type.
     Примітивні типи даних не можуть відповідати цьому контракту.


     Також значення, анотований цим контрактом, повинне складатися з елементів типу T, який буде переданий як Type
     Argument на місце Type Parameter під час використання цього контракту.

     Наприклад, Array<number> чи Array<string | null>.




──────────────────────────────────────    ┌──────────────────────────────┐
  1.2  Властивість length                 │        length: number;       │
──────────────────────────────────────    └──────────────────────────────┘

  Вимоги контракту:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Значення, анотоване цим контактом, повинно мати властивість length, у якій зберігається значення типу number.


  Гарантії TypeScript:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Якщо ми звернемося до властивості length значення, анотованого контактом Array, TypeScript гарантує, що ця
     властивість існує й у ній зберігається число, тож ми можемо виконувати з ним математичні операції та викликати
     на ньому чслові методи




──────────────────────────────────────    ┌────────────────────────────────┐
  1.3  Метод push                         │  push(...items: T[]): number;  │
──────────────────────────────────────    └────────────────────────────────┘


   Як працює метод push:
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
      ◦ Приймає довільну кількість аргументів через кому (від 0 до N)

      ◦ Додає всі передані аргументи в кінець масиву в тому ж порядку, в якому вони були передані

      ◦ Повертає length оновленого масиву



   Rest Operator у Параметрах Функції:
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Rest-оператор (...) використовується у сигнатурах функцій для об'єднання переданих аргументів у єдиний масив,
     коли функція може приймати невизначену кількість аргументів (від 0 до будь-якої кількості).

     Метод масивів push може приймати будь-яку кількість аргументів. Це handy, коли, наприклад, нам потрібно об'єднати
     два масиви: ми можемо просто викликати метод push й передати в нього як аргумент другий масив через Spread Operator


                     ┌──────────────────────────────────────────────────────────────────────────┐
                     │    const a = [1, 2];                                                     │
                     │    const b = [3, 4];                                                     │
                     │                                                                          │
                     │    a.push(...b);   ──> Розгортаємо другий масив через Spread Operator    │
                     │                                                                          │
                     │   console.log(a);  ──> [1, 2, 3, 4]                                      │
                     └──────────────────────────────────────────────────────────────────────────┘


    Ми використовуємо Rest-оператор при типізації методу push, щоб об'єднати всі окремі аргументи, які були предані
    при виклику, в один масив з ім'ям items.

    Тепер ми можемо легко типізувати ці аргументи через T[]. Це означає, що кожен окремий аргумент, переданий при
    виклику, повинен мати тип T.



  Вимоги контракту:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Значення, анотоване контактом Array, повинно мати метод push. Цей метод може приймати довільну кількість
     аргументів, кожен з яких повинен мати тип T, й повертати тип number (length)



  Гарантії TypeScript:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     TypeScript гарантує, що у метод push можна передати тільки елементи типу T. Якщо хоча б один аргумент не відповідає
     типу T, TypeScript виведе помилку.

     Також він гарантує, що результатом виконання методу push завжди буде значення типу number (нова довжина масиву),
     що дозволяє одразу використовувати результат у математичних обчисленнях.




──────────────────────────────────────    ┌──────────────────────────────────────────────────┐
  1.4  Метод filter                       │  filter(predicate: (value: T) => boolean): T[];  │
──────────────────────────────────────    └──────────────────────────────────────────────────┘

  Термінологія:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾
     Предикат (Predicate) — це будь-яка функція, результатом виконання якої є булеве значення (true або false).

     У методі filter предикат слугує функцією-умовою: якщо вона повертає true, елемент потрапляє до підсумкового масиву,
     якщо false — відсіюється.



  Вимоги контракту:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Значення, анотоване контрактом Array, повинно мати метод filter. Цей метод повинен приймати як аргумент предикат
     (callback-функцію), яка, в свою чергу, приймає аргумент типу T і повертати boolean.

     Сам метод повинен повертати масив типу T[] ─ новий відфільтрований масив.



  Гарантії TypeScript:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     TypeScript гарантує, що результатом виконання методу filter буде масив. Це дозволяє одразу звертатися до його
     властивості length або викликати на ньому методи масивів (map, reduce тощо).

     Також TypeScript гарантує Type Retention (збереження / утримання типу): елементи відфільтрованого масиву зберігають
     свій початковий тип T, вказаний при анотації Array<T>. На відміну від методу map, який може трансформувати тип
     елементів з T у новий тип U.




──────────────────────────────────────    ┌─────────────────────────────────────────────┐
  1.4  Метод map                          │   map<U>(callback: (value: T) => U): U[];   │
──────────────────────────────────────    └─────────────────────────────────────────────┘

   Оскільки метод map призначений для трансформації кожного елемента масиву і така трансформація може передбачати не
   лише зміну значення, а й повну зміну типу (наприклад, перетворення object у string), для методу map ми оголошуємо
   власний Type Parameter <U> ─ тип елемента після трансформації.


   Метод map приймає як аргумент callback-функцію (value: T) => U, яка, у свою чергу, приймає аргумент типу T (елемент
   початкового типу) і повертає трансформоване значення нового типу U.

   Сам метод map викликає цю функцію для кожного елемента масиву (T[]) й повертає як результат новий масив типу U[],
   довжина якого дорівнює довжині початкового масиву, але елементи мають новий трансформований тип U.


                              ┌─────────────────────────────────────────────────────────┐
                              │                                                         │
                              │   type User = { id: number; name: string };             │
                              │                                                         │
                              │   const users: User[] = [                               │
                              │     { id: 1, name: "Hanna" },                           │
                              │     { id: 2, name: "Alice" }                            │
                              │   ];                                                    │
                              │                                                         │
                              │   const names = users.map((user: User) => user.name);   │
                              │                                                         │
                              │     ─────── ─────── ─────── ───────                     │
                              │       T = User                                          │
                              │       U = string (тип user.name)                        │
                              │       names: string[] (тобто U[])                       │
                              │                                                         │
                              └─────────────────────────────────────────────────────────┘


  Вимоги контракту:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Значення, анотоване контрактом Array, повинно мати метод map. Цей метод повинен приймати як аргумент
     callback-функцію, яка, в свою чергу, приймає значення типу T і повертає значення типу U.

     Сам метод map повинен повертати масив типу U[].



  Гарантії TypeScript:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     TypeScript гарантує автоматичний вивід типу U на основі значення, яке повертає callback-функція (Type Inference).
     Це звільняє від необхідності явно передавати Type Argument при виклику методу: users.map<string>(...)

     Також TypeScript гарантує, що результатом виконання методу map буде масив. Це дозволяє одразу звертатися до його
     властивості length або викликати на ньому методи масивів (map, reduce тощо).




                    ════════════════════════════════════════════════════════════════════════════════
                                 📍  ПРАКТИЧНЕ ВИКОРИСТАННЯ Array<T> (ТИПІЗАЦІЯ МАСИВІВ)
                    ════════════════════════════════════════════════════════════════════════════════



  Ми використовуємо готовий контракт Array<T> для анотації (вказування типу) масиву у коді.

  Під час анотації ми передаємо конкретний тип значення (Type Argument) на місце параметра типу <T>.
  Це вказує TypeScript, з елементів якого саме типу повинен складатися даний масив.


                  ┌─────────────────────────────────────────────────────────────────────────────────┐
                  │                                                                                 │
                  │   const numbers: Array<number> = [1, 2, 3];          ───> масив чисел           │
                  │                                                                                 │
                  │   const names: Array<string> = ["Hanna", "Alice"];   ───> масив рядків          │
                  │                                                                                 │
                  │                                                                                 │
                  │   type User = { id: number; name: string };                                     │
                  │                                                                                 │
                  │   const users: Array<User> = [                       ───> масив об'єктів        │
                  │     { id: 1, name: "Hanna" },                                                   │
                  │     { id: 2, name: "Alice" }                                                    │
                  │   ];                                                                            │
                  │                                                                                 │
                  │                                                                                 │
                  │           ──────────── Масиви змішаних типів (Union Type) ────────────          │
                  │                                                                                 │
                  │                                                                                 │
                  │  ────────────────────────────────────────────────────────────────────────────   │
                  │   Масив результатів: елементом може бути число (бал) або null, якщо кандидат    │
                  │   з якихось причин взагалі не брав участі у тестуванні                          │
                  │  ────────────────────────────────────────────────────────────────────────────   │
                  │                                                                                 │
                  │   const scores: Array<number | null> = [100, null, 85, 90];                     │
                  │                                                                                 │
                  │                                                                                 │
                  │  ────────────────────────────────────────────────────────────────────────────   │
                  │   Масив дозволених статусів: елементом може бути лише значення, яке має один    │
                  │   із трьох літеральних типів                                                    │
                  │  ────────────────────────────────────────────────────────────────────────────   │
                  │                                                                                 │
                  │   type Status = "pending" | "fulfilled" | "rejected";                           │
                  │                                                                                 │
                  │   const statuses: Array<Status> = ["pending", "fulfilled", "pending"];          │
                  │                                                                                 │
                  └─────────────────────────────────────────────────────────────────────────────────┘




                    ════════════════════════════════════════════════════════════════════════════════
                                             📍  СИНТАКСИЧНИЙ ЦУКОР: T[]
                    ════════════════════════════════════════════════════════════════════════════════


  Запис T[] (наприклад, number[]) це лише синтаксичний цукор (візуальне поліпшення) над Build-in Generic Interface
  Array<T>.

  Скорочений запис T[] — це суто візуальна зручність для розробників на етапі написання коду. Під час парсингу та
  побудови AST (Abstract Syntax Tree) компілятор TypeScript одразу розгортає (desugars) будь-який T[] в Array<T>.


          ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
          │                             Розгортання (desugaring) T[] в Array<T>                             │
          │                                                                                                 │
          │                                                                                                 │
          │   number[]   ───>  Array<number>                                                                │
          │                                                                                                 │
          │   string[]   ───>  Array<string>                                                                │
          │                                                                                                 │
          │   User[]     ───>  Array<User>                                                                  │
          │                                                                                                 │
          │                                                                                                 │
          │               ─────────────── Масиви змішаних типів (Union Type) ───────────────                │
          │                                                                                                 │
          │                                                                                                 │
          │   (number | null)[]                         ───>  Array<number | null>                          │
          │                                                                                                 │
          │   ("pending" | "fulfilled" | "rejected")[]  ───>  Array<"pending" | "fulfilled" | "rejected">   │
          │                                                                                                 │
          │                                                                                                 │
          │                                                                                                 │
          │               ───────────── Або чистіші варіанти (Best Practice): ──────────────                │
          │                                                                                                 │
          │                                                                                                 │
          │   type Score = number | null;                                                                   │
          │                                                                                                 │
          │   Score[]   ───>  Array<Score>                                                                  │
          │                                                                                                 │
          │                                                                                                 │
          │                                                                                                 │
          │   type Status = "pending" | "fulfilled" | "rejected";                                           │
          │                                                                                                 │
          │   Status[]   ───>  Array<Status>                                                                │
          │                                                                                                 │
          └─────────────────────────────────────────────────────────────────────────────────────────────────┘


  Коли що використовувати:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
       ◦ T[] використовується найчастіше в повсякденній розробці через легкість читання.

       ◦ Array<T> зручніше використовувати, коли тип елемента є складним Union Type, оскільки це дозволяє уникнути
         додаткових дужок: Array<number | null> замість (number | null)[].




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                📍  Типізація імутабельних масивів: ReadonlyArray<T>
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  Проблема використання Shared & Global Data:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Масиви в JavaScript мають Reference Type. Коли ми ділимося посиланням на масив (передаємо у дочірні компоненти,
     імпортуємо як глобальні константні значення, або витягуємо зі стору), ці дані стають спільними для кількох частин
     програми.

     Джерело даних (батьківський компонент або store) має бути впевнене, що споживачі не змінять цей масив безконтрольно
     через мутуючі методи (push, splice) чи прямий запис за індексом (arr[0] = value).



  Невидима деградація стану:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Головна небезпека мутації полягає в її невидимості.

     Окрім того, що мутація зіпсує оригінальні дані, це ще відбудеться непомітно для інших частин програми, бо метод
     .push(), .splice() або пряма зміна arr[0] = value модифікують масив, але не змінюють його посилання.

     React (props або useState) та Redux відстежують зміни через поверхневе порівняння посилань (Shallow Reference
     Check) prevArray === nextArray.

     Оскільки посилання в пам'яті залишилося те саме, система вважає, що дані не змінилися: жодного ререндеру немає,
     програма продовжує поширівати вже змінені й некоректні дані, навіть не знаючи, що з ними проводилися якісь
     модифікації


  Архітектурне правило: State Ownership (Володіння станом)
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Зміною даних займається виключно сторона, яка їх зберігає (власник стану). Власник стану надає споживачам лише
     ПУБЛІЧНЕ API ДЛЯ ЗАПИТУ ЗМІН, але саму модифікацію виконує самостійно — створюючи новий масив (який звісно має
     нове посилання), а не мутуючи старий.

     Споживачі (дочірні компоненти) отримують дані, які мають read-only контракт (ReadonlyArray<T>) і не повинні
     намагатися їх змінити безпосередньо.

        React (Parent ──> Child):
        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
           ◦ Власник стану: Батьківський компонент

           ◦ Що передає:
                 • Масив з read-only контрактом: ReadonlyArray<T>
                 • Та handler function (onDelete, onAdd, тощо)

           ◦ Як відбувається зміна:
                 Дочірній компонент лише викликає onDelete(id), а створенням нового масиву через filter/map й
                 оновленням стану займається батьківський компонент


        Redux / Zustand Store:
        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
           ◦ Власник стану: Глобальний Store (Redux або Zustand)


           ◦ Що передає:
                 • Селектор повертає масив з read-only контрактом: ReadonlyArray<T>
                 • Та інструменти оновлення: методи стору (Zustand) або Action Creators (Redux)


           ◦ Як відбувається зміна:
                 Компонент диспатчить action, створений через Action Creator (Redux) або викликає метод стору (Zustand),
                 (тобто просто використовує надане стором API), а модифікацію даних вже займаєтся відповідний стор,
                 якому ці дані належать.


     ReadonlyArray<T> створений саме для того, щоб на рівні типізації гарантувати дотримання правила State Ownership,
     тобто захистити передані дані (чи то пропси, чи спільні дані зі стору/констант) від побічних мутацій з боку
     споживачів.


  Практичні сценарії, де потрібен ReadonlyArray<T>:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      React Props:
      ‾‾‾‾‾‾‾‾‾‾‾‾
         Коли ми передаємо масив пропсом у дочірній компонент, ми очікуємо, що той використає його лише для читання
         та рендерингу, а не намагатиметься його модифікувати.


      Redux / Zustand Store:
      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
         Коли ми витягуємо масив зі стору, архітектура розраховує, що ці дані використаються лише для читання, а зміна
         цього масиву відбуватиметься виключно через диспатч екшенів (Redux) або виклики методів стору (Zustand).


      Глобальні константи:
      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
         Коли ми оголошуємо глобальні константні значення, які повинні залишатися незмінними протягом усього життєвого
         циклу програми й використовуватися read only.



                    ════════════════════════════════════════════════════════════════════════════════
                                     📍  ReadonlyArray<T> є надмножиною Array<T>
                    ════════════════════════════════════════════════════════════════════════════════


  Array<T> є підтипом (subtype) ReadonlyArray<T>, це означає, що всі масиви з типізацією Array<T> можуть бути передані
  туди, де очікується імутабельний масив ReadonlyArray<T, АЛЕ НЕ НАВПАКИ.

  ReadonlyArray<T> описує БІЛЬШУ множину значень, ніж Array<T>, оскільки ставить менше вимог до масиву (вимагає лише
  наявності методів читання, на відміну від Array<T>, який очікує ще й методи мутування).

   ОТЖЕ:

     ◦ Будь-який Array<T> є підмножиною ReadonlyArray<T>

     ◦ Оскільки мутабельний масив (Array<T>) гарантовано має всі методи читання, його можна безпечно передавати туди,
       де очікується імутабельний масив (ReadonlyArray<T>)

     ◦ Передавати імутабельний масив (ReadonlyArray<T>) туди, де очікується мутабельний (Array<T>) — ЗАБОРОНЕНО

       Спроба передати ReadonlyArray<T> туди, де очікується Array<T>, викличе помилку компіляції, оскільки
       ReadonlyArray<T> не має гарантій наявності методів мутації (push, splice тощо), які очікує Array<T>.




                   ════════════════════════════════════════════════════════════════════════════════
                                     📍 СТРУКТУРА ТА СИНТАКСИС ReadonlyArray<T>
                   ════════════════════════════════════════════════════════════════════════════════


  ReadonlyArray<T> — це Built-in Generic Interface у TypeScript, який повністю копіює структуру звичайного Array<T>,
  але з його контракту вилучено всі мутуючі методи та доступ на запис за індексом.


  Основні відмінності контракту:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      ◦ Вилучено всі мутуючі методи:
        Методи які мутують оригінальний масив, такі як push(), pop(), shift(), unshift(), splice(), sort(), reverse()
        повністю відсутні в інтерфейсі ReadonlyArray<T>. Спроба їх викликати спричинить помилку компіляції.


      ◦ Заборонено запис за індексом:
        Вираз arr[0] = newValue ───> ПОМИЛКА компіляції (Index signature is read-only).

      ◦ Збережено методи, які не змінюють вихідний масив, а просто повертають нове значення або новий масив: map(),
        filter(), reduce(), slice(), find(), includes().


                               ┌────────────────────── Синтаксис ──────────────────────┐
                               │                                                       │
                               │   interface Array<T> {                                │
                               │     readonly length: number;                          │
                               │                                                       │
                               │     readonly [index: number]: T;                      │
                               │                                                       │
                               │     filter(predicate: (value: T) => boolean): T[];    │
                               │                                                       │
                               │     map<U>(callback: (value: T) => U): U[];           │
                               │                                                       │
                               │     ...інші не мутуючі методи масиву                  │
                               │   }                                                   │
                               │                                                       │
                               └───────────────────────────────────────────────────────┘


─────────────────────────────────────────────────────────
  Квадратні дужки [ ... ] замість назви поля в об'єкті:
─────────────────────────────────────────────────────────

   У JavaScript: Computed Property Names
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
       Квадратні дужки всередині об'єкта використовуються, щоб динамічно обчислити назву ключа зі змінної або виразу.

       Цей синтаксис в JS називається Computed Property Names — Обчислювані Назви Властивостей.



   У TypeScript: Index Signature
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
       Використовуються в інтерфейсах та типах, щоб описати об'єктні типи, у яких назви ключів заздалегідь невідомі,
       але відомий їхній тип та тип значення, які вони зберігають.

       Запис [index: number]: T означає, що БУДЬ-ЯКИЙ КЛЮЧ З ТИПОМ NUMBER (числовий ключ) повертає значення типу T.

       Цей синтаксис в TS називаться Index Signature (Сигнатура індексу).



───────────────────────────
  Ключове слово readonly:
───────────────────────────

   Модифікатор readonly — це виключно синтаксис TypeScript.

   Його головне призначення: Гарантувати імутабельність даних на етапі статичного аналізу коду, чим запобігти
   випадковим побічним ефектам (side-effects) та мутаціям немутабельних даних.

   Використання readonly перед ім'ям властивості в interface або type забороняє перезапис конкретного поля після його
   первинної ініціалізації.


   readonly вказує компілятору TypeScript дозволяти лише зчитування значення за цим ключем, але блокувати будь-яку
   спробу його перезапису.


             ───────────────────────────────────────────────────────────────────────────────────────────────────────────
                             Заборона запису за індексом на рівні типів:   readonly [index: number]: T;
             ───────────────────────────────────────────────────────────────────────────────────────────────────────────

                У JavaScript масив є об'єктом, де індекси (0, 1, 2...) виступають ключами об'єкта.

                У звичайному інтерфейсі Array<T> доступ за індексом описується через Index Signature, яка дозволяє і
                зчитування, і запис:

                          [index: number]: T;   ──> Дозволяє і arr[0] (читання), і arr[0] = newValue (запис)
                          ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


                У ReadonlyArray<T> перед сигнатурою індексу додається модифікатор readonly:

                          readonly [index: number]: T;    ──> Дозволяє ЛИШЕ читання arr[0]
                          ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                Модифікатор readonly наказує компілятору TypeScript блокувати будь-які операції присвоєння за числовим
                ключем. Сам JavaScript у рантаймі це дозволяє, але TypeScript видасть помилку ще на етапі компіляції.


             ───────────────────────────────────────────────────────────────────────────────────────────────────────────
                                    Захист від модифікації довжини:   readonly length: number;
             ───────────────────────────────────────────────────────────────────────────────────────────────────────────

                У JavaScript властивість length є перезаписуваною (writable):

                   ◦ Якщо присвоїти властивості значення, менше за поточний розмір, JavaScript видалить усі елементи,
                     що виходять за нову межу.

                   ◦ Якщо ж навпаки збільшити length, масив заповниться порожніми слотами (undefined).

                Тож ручна зміна arr.length = 2 обріже масив, незворотно видаливши зайві елементи з пам'яті,
                а arr.length = 0 повністю його очистить.

                Модифікатор readonly перед властивість length забороняє будь-яке її перезаписування.


════════════════════════════════════════════════════════════════
   📍  СИНТАКСИЧНИЙ ЦУКОР: readonly T[] ──> ReadonlyArray<T>
════════════════════════════════════════════════════════════════




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                    📍  Типізація асинхронних операцій: Promise<T>
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════



            ┌────────────────────────────────────────  СИНТАКСИС  ─────────────────────────────────────────┐
            │                                                                                              │
            │   interface Promise<T> {                                                                     │
            │                                                                                              │
            │     then<TResult1 = T, TResult2 = never>(                                                    │
            │       onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,     │
            │       onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,   │
            │     ): Promise<TResult1 | TResult2>;                                                         │
            │                                                                                              │
            │     catch<TResult = never>(                                                                  │
            │       onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,     │
            │     ): Promise<T | TResult>;                                                                 │
            │                                                                                              │
            │     finally(onFinally?: (() => void) | undefined | null): Promise<T>;                        │
            │                                                                                              │
            │   }                                                                                          │
            │                                                                                              │
            └──────────────────────────────────────────────────────────────────────────────────────────────┘



  📍 Чому then приймає два callback-аргументи?
  ────────────────────────────────────────────

      Метод .then() ─ це універсальний метод, який вміє обробляти будь-який результат асинхронної операції
      (як успішне виконання, так і виникнення помилки).

      Саме тому він спроєктований так, щоб приймати два колбеки:

           ◦ onFulfilled — викличеться, якщо Promise виконається успішно
           ◦ onRejected — викличеться, якщо Promise завершиться з помилкою


      На методі .then() повністю й побудований ланцюжок промісів: .catch() це лише синтаксична огортка, всередині
      якого все одно викликається цей метод .then() (а от .finally() має трохи складніший механізм всередині).

      Саме .then() приймає як аргументи callback-функції для поточного промісу (на якому він був викликаний або
      напряму або через огортку) та створює новий проміс для наступної ланки ланцюжка.

      Далі метод з'єднує поточний проміс з промісом, який повертає, через створення внутрішнього об’єкта
      PromiseReaction для поточного промісу та реєстрацію в його внутрішніх слотах:

           ◦ посилань на колбеки onFulfilled, onRejected (передані як аргументи в метод .then())

           ◦ нового промісу (який повертає метод .then()) і його системних функцій resolve/reject



  📍 Чому на практиці ми передаємо лише ОДНУ функцію?
  ───────────────────────────────────────────────────

      Якщо передати функцію обробки помилок безпосередньо другим аргументом у .then(): then(onFulfilled, onRejected)
                                                                                       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      Виникає проблема: onRejected (другий аргумент) перехоплює помилки (rejection) лише поточного промісу (того,
      на якому безпосередньо був викликаний метод .then()).

      Якщо помилка (throw new Error) станеться всередині самого onFulfilled (першого аргументу), другий аргумент її
      не побачить і не перехопить.

      Виняток (Exception ─ об'єкт помилки, згенерований через throw) з onFulfilled перетвориться на reason (причину
      rejection) нового промісу, який повертає метод then(). І нам все одно доведеться далі в ланцюжку обробляти цю
      помилку щоб вона не вилетіла в зовнішній код і не зламалапрограму.

      Тобто довелося б писати ще один .then() далі в ланцюжку виключно для перехоплення помилки, яка може виникнути
      в самому onFulfilled. Тож зручніше робити одразу загальну обробку всіх помилок, ніж локальну, а потім ще
      глобальну.


      Тому сучасний стандарт (Best Practice) — це передавати в then лише одну функцію (onFulfilled), а для обробки
      помилок використовувати окремий метод catch() далі по ланцюжку. Це дозволяє перехоплювати помилки як від самого
      промісу, так і від будь-якого колбека у ланцюжку.



  📍 Роль методу .catch() як синтаксичної обгортки:
  ─────────────────────────────────────────────────

     Для обробки успіху та помилки у різних ланках нам довелося б спочатку викликати .then() з onFulfilled, а потім
     окремий .then() з onRejected, й у другому .then() щоразу явно прописувати undefined першим аргументом:

                                       ┌───────────────────────────────────┐
                                       │    then(undefined, onRejected)    │
                                       └───────────────────────────────────┘

     Щоб уникнути цієї незручності, був доданий метод .catch() ─ синтаксична огортка (Syntactic Sugar) над методом
     .then(), яка приймає лише один аргумент (onRejected), й під капотом вже сама викликає метод .then() з двома
     аргументами: then(undefined, onRejected)

     Тобто catch() бере на себе позиціювання аргументів, не змушуючи нас самих писати undefined в аргументах вручну:
     він сам передасть undefined як перший аргумнент, залишивши fulfillment без власного хендлера (туди автоматично
     буде підставлуний Identity Handler).

     Основна мета методу .catch() — надати зручніший синтаксис для обробки rejection, без необхідності вручну
     передавати undefined як перший аргумент методу .then().



  📍 Чому callback-аргументи в then(), catch() та finally() є опціональними?
  ──────────────────────────────────────────────────────────────────────────

    Усі три методи Promise приймають як аргументи ОПЦІОНАЛЬНІ (необов'язкові) callback-функції.

                                        ┌─────────────────────────────────────┐
                                        │   then(onFulfilled?, onRejected?)   │
                                        │                                     │
                                        │   catch(onRejected?)                │
                                        │                                     │
                                        │   finally(onFinally?)               │
                                        └─────────────────────────────────────┘

    Опціональність колбеків в методах — це свідомий архітектурний задум, який дозволяє не обробляти результат промісу
    на кожному етапі ланцюжка.

    Якщо хендлер для якоїсь ланки ланцюжка не потрібен, його можна просто не передавати.

    Його відсутність не перерве ланцюжок й не призведе до втрати результату промісу: необроблений fulfillment або
    rejection автоматично передасться (path-through) далі по ланцюжку через дефолтні хендлери (Identity Handler та
    Thrower Handler).


                                        Концепція Транзиту Даних (Pass-Through)
                                      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

     Щоб ланцюжок (chaining) промісів не переривався, коли у черговому методі немає хендлера для відповідного стану,
     специфікація ECMAScript заклала концепцію автоматичної підстановки дефолтних хендлерів (системних функцій) на
     їхнє місце.

     Identity Handler та Thrower Handler — це і є ті дефолтні хендлери, які забезпечують Транзит Даних (Pass-Through):
     передачу результату (значення або помилка) в наступну ланку ланцюжка без змін.


     Якщо метод не отримує відповідну callback-функцію, замість неї використається дефолтний хендлер:

             1. Identity Handler (для fulfillment) — функція, яка приймає вхідний аргумент й повертає його
                як результат, без жодних змін: (x) => x
                                              ‾‾‾‾‾‾‾‾‾‾

             2. Thrower Handler (для rejection) — функція, єдина мета якої — взяти отриману помилку й знову
                викинути її через throw: (err) => { throw err; }
                                        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


     Тож опціональність колбеків дає розробнику можливість обрати: «На цьому етапі я не хочу обробляти результат
     промісу — нехай він продовжить рухатися далі без змін».

     Й завдяки дефолтним хендлерам йому не потрібно передавати порожні колбеки вручну лише для того, щоб зберегти
     цілісність Promise-ланцюжка.



                    ════════════════════════════════════════════════════════════════════════════════
                                 📍  ДЕТАЛЬНИЙ РОЗБІР СТРУКТУРИ ТА СИНТАКСИСУ Promise<T>
                    ════════════════════════════════════════════════════════════════════════════════



──────────────────────────────────────   ┌────────────────────────────────┐
  1.  Декларація Generic-інтерфейсу      │  interface Promise<T> { ... }  │
──────────────────────────────────────   └────────────────────────────────┘


  Ми декларуємо контракт (інтерфейс) з ім'ям Promise та одразу оголошуємо параметр типу <T> (Type Parameter).

  Type Parameter у контракті Promise<T> описує тип ВИКЛЮЧНО УСПІШНОГО РЕЗУЛЬТАТУ (fulfillment value), тобто
  значення, яке переведе проміс у стан fulfilled й передасться як аргумент в callback-функцію onFulfilled.


  📍 А як тоді типізується rejection reason?
  ──────────────────────────────────────────

    На відміну від fulfillment value, тип rejection reason у Promise<T> не фіксується через Type Parameter.
    У сигнатурах методів .then() та .catch() він типізований як any.

    Причин для відсутності Type Parameter для помилки є декілька:

        ПО-ПЕРШЕ, інструкція throw може кинути значення будь-якого типу (Error, string, number, null, object).

        ПО-ДРУГЕ, окрім очікуваних бізнес-помилок (логіку викидання яких ми прописуємо самі), усередині onFulfilled
        може статися системна помилка (наприклад, TypeError при спробі звернутися до властивості null), що також
        переведе проміс у стан rejected.

    Тож статично вивести єдиний тип помилки неможливо, альтернативою був би нескінченний Union Type усіх потенційних
    типів помилок.

    Тому для типізації rejection reason у методах Promise використовується Escape Hatch any (який вимикає перевірки
    TypeScript і сумісний майже з будь-яким типом).



  Вимоги контракту:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

     Оскільки контракт описано через interface ─ значення, анотоване як Promise, повинно мати object type.
     Примітивні типи даних не можуть відповідати цьому контракту.

     Також згідно з контрактом, значення, анотоване як Promise, повинно мати три методи: then, catch та finally.



───────────────────   ┌───────────────────────────────────────────────────────────────────────────────────┐
  2.  Метод then      │  then<TResult1, TResult2>(onFulfilled, onRejected): Promise<TResult1 | TResult2>  │
───────────────────   └───────────────────────────────────────────────────────────────────────────────────┘


              ┌─────────────────────────────────────── Синтакси:  ────────────────────────────────────────┐
              │                                                                                           │
              │   then<TResult1 = T, TResult2 = never>(                                                   │
              │                                                                                           │
              │     onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,    │
              │                                                                                           │
              │     onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null   │
              │                                                                                           │
              │   ): Promise<TResult1 | TResult2>;                                                        │
              │                                                                                           │
              └───────────────────────────────────────────────────────────────────────────────────────────┘



──────────────────────────────────────────────   ┌────────────────────────────┐
  2.1  Оголошує два власні Type Parameters:      │  then<TResult1, TResult2>  │
──────────────────────────────────────────────   └────────────────────────────┘

     ◦ TResult1 ─ тип результату, який поверне переданий як аргумент хендлер onFulfilled

     ◦ TResult2 ─ тип результату, який поверне переданий як аргумент хендлер onRejected


────────────────────────────────────────   ┌─────────────────────────────┐
  2.2  Приймає два опційні аргументи:      │  onFulfilled та onRejected  │
────────────────────────────────────────   └─────────────────────────────┘

  Вони мають Union Type, який включає в себе сигнатуру самої callback-функції, об'єднану з типами undefined та null:

       ◦ onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null

       ◦ onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null



  📍 Чому Union Type містить і undefined, і null?
  ───────────────────────────────────────────────

    Знак питання після назви методу вказує що параметр не є еобов'язковим. Це автоматично додає тип undefined.
    Тобто, якщо викликати просто .then(), пропущені аргументи матимуть значення undefined (з типом undefined).

    Але тип null додано спеціально, щоб дозволити розробникам явно показати в коді, що вони навмисно пропускають
    аргумент (наприклад, пропуск функції onFulfilled, якщо їх цікавить лише перехоплення помилки в onRejected).

                                          ┌──────────────────────────────────┐
                                          │  promise.then(null, onRejected)  │
                                          └──────────────────────────────────┘

    В обох випадках (і null, і undefined) рушій розуміє, що колбек відсутній і використовує дефолтні хендлери:
    Identity Handler або Thrower Handler.


    На практиці це означає: Контракт .then() дозволяє передавати в кожен із двох аргументів або callback-функцію
    відповідного типу, або null, або undefined. Якщо просто не передавати аргумент, він автоматично стане undefined.
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

    Що мається на увазі під відповідним типом:

         ◦ onFulfilled — функція, яка прийматиме аргумент value типу T та повертатиме значення типу
           TResult1 | PromiseLike<TResult1>

         ◦ onRejected — функція, яка прийматиме аргумент reason типу any та повертатиме значення типу
           TResult2 | PromiseLike<TResult2>



  📍 Аргументи які приймають callback-функції onFulfilled та onRejected:
  ──────────────────────────────────────────────────────────────────────

    Type Parameter T у Promise<T> задає тип успішного результату (fulfillment value), з яким зарезолвиться проміс.
    Саме це значення передається як аргумент у хендлер onFulfilled, тому тип аргументу onFulfilled дорівнює T.


    Хендлер onRejected приймає як аргумент rejection reason типу any, оскілки інструкція throw може викинути значення
    будь-якого типу.



  📍 Що повертають колбеки: Union Type (TResult | PromiseLike<TResult>)
  ─────────────────────────────────────────────────────────────────────

    Кожен колбек може повернути одне з двох значень:

       ◦ Звичайне значення: TResult1 (для onFulfilled), TResult2 (для onRejected)

           Це звичайні типи даних: string, number, object, undefined тощо.
           Якщо хендлер повертає таке значення, проміс, який повретає .then(), одразу резолвиться ним.


       ◦ Асинхронне значення: PromiseLike<TResult1> або PromiseLike<TResult2>

           Це об'єкт типу Thenable — будь-який об'єкт або функція, що має метод .then().
           Це може бути як нативний Promise, так і промісоподібний об'єкт зі сторонніх бібліотек
           (наприклад, з Bluebird)



    Механізм розпакування (Unwrapping) та роль PromiseLike:
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

       Згідно зі специфікацією ECMAScript, проміси ніколи не можуть бути вкладені один в одного.
       Тобто value або reason промісу не можуть бути іншим промісом.

       Рушій JavaScript НІКОЛИ НЕ СТВОРЮЄ ВКЛАДЕНИХ ПРОМІСІВ.

       Якщо колбек повертає проміс, JS автоматично зупиняє виконання, чекає поки проміс завершиться та
       передає його кінцевий результат (fulfillment value або rejection reason) у проміс, який повертає
       метод .then().



    Що було б, якби ми не вказали PromiseLike серед варіантів результатів колбека:
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

       TypeScript заздалегідь не знає, яку саме функцію ми передамо в onFulfilled або onRejected.
       Існує ймовірність, що ця функція може містити асинхронну дію й тому поверне інший проміс.

       Якби ми не додали PromiseLike як одну з опцій для результату колбека, TypeScript помилково сприймав
       би цей внутрішній проміс як звичайне значення.

       У такому разі для TypeScript метод .then() повертав би тип Promise<Promise<TResult1>> (вкладий проміс),
       хоча в Runtime рушій JS усе одно призупиняв би виконання, чекав завершення внутрішнього промісу й
       розпаковував його до плоского значення, перед тим як передати результат в наступний проміс.

       У результаті проміс, який повернув метод .then() мав би тип Promise<TResult>, тоді як для TypeScript
       очікував тип Promise<Promise<TResult1>>.

       Виникала б розбіжність між типами в редакторі та реальністю в Runtime.



    Як це працює завдяки PromiseLike:
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      Додаючи PromiseLike<TResult> в Union Type результату колбека (onFulfilled або onRejected), ми явно вказуємо
      TypeScript, що функція може повернути як звичайне значення, так і промісоподібний об'єкт:

                                  ┌──────────────────────────────────────────────────┐
                                  │  (value: T) => TResult1 | PromiseLike<TResult1>  │
                                  └──────────────────────────────────────────────────┘

     Тип результатів, які повретають колбеки (onFulfilled та onRejected), використовується TypeScript-ом для
     автоматичного виведення (Type Inference) типу fulfillment value промісу, який повертає метод .then().

                           ┌─────────────────────────────────────────────────────────────────┐
                           │  then(onFulfilled?, onRejected?): Promise<TResult1 | TResult2>  │
                           └─────────────────────────────────────────────────────────────────┘

      Й оскільки за специфікацією ECMAScript проміси не можуть бути вкладеними один в одного, рушій JS автоматично
      чекає розв'язання внутрішнього промісу з колбека.

      Й лише після того як внутрішній проміс виконається (зарезолвиться або зареджектиться), рушій перенесе його
      підсумковий результат (вже звичайне значення: fulfillment value або rejection reason) у проміс, повернений
      методом .then().


      Алгоритм TypeScript дзеркалить цю поведінку: він знає, що внутрішній проміс буде розпакований у Runtime,
      тому автоматично розпаковує (unwrap) або сплющує (flatten) підсумковий тип.

                  ┌──────────────────────────────────────────────────────────────────────────────────┐
                  │                                                                                  │
                  │   onFulfilled: TResult1 | PromiseLike<TResult1>                                  │
                  │   onRejected:  TResult2 | PromiseLike<TResult2>                                  │
                  │                                         ↓                                        │
                  │                           Promise<TResult1 | TResult2>                           │
                  │                                                                                  │
                  └──────────────────────────────────────────────────────────────────────────────────┘


    Пояснення до схеми:
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

        ◦ PromiseLike<T> (як і нативний Promise<T>) приймає лише один Type Argument (параметр типу) — це тип
          успішного значення (fulfillment value), яким при успіху заповниться промісоподібний об'єкт.

          Тип rejection reason окремим Type Parameter не задається. у сигнатурі колбеків він має тип any.


        ◦  TypeScript бачить, що колбек може повернути промісоподібний об'єкт (PromiseLike<TResult1>), але враховує
          правило Runtime:

             «Рушій JS не дозволить промісоподібному об'єкту стати внутрішнім значенням промісу, він чекатиме його
             розв'язання, розпакує внутрішній промісоподібний об'єкт до звичайного значення й передасть це значення
             як результат (fulfillment value) у проміс, створений методом .then()»


        ◦ Промісу від .then() критично знати тип значення, з яким він зарезолвиться.

        ◦ Й оскільки для внутрішнього промісу це значення дорівнює TResult1, а в Runtime воно стане результатом
          зовнішнього — TypeScript вказує тип fulfillment value для промісу від .then() саме як TResult1, без огортки
          PromiseLike<TResult1>



─────────────────────────────────   ┌────────────────────────────────┐
  2.3  Повертає новий Promise:      │  Promise<TResult1 | TResult2>  │
─────────────────────────────────   └────────────────────────────────┘

     Для типізації поверненого значення ми використовуємо контракт Promise<T>, що очікує Type Argument, який стане
     типом УСПІШНОГО РЕЗУЛЬТАТУ ПРОМІСУ (fulfillment value).

     Передаючи Union Type (<TResult1 | TResult2>) як Type Argument, ми вказуємо, що fulfillment value нового промісу
     може мати тип результату виконання onFulfilled або onRejected.

     Тобто значення, яке поверне метод .then() буде промісом, успішний результат якого матиме Union Type:
     TResult1 | TResult2 (або тип результату, який поверне onFulfilled, або тип результату, який поверне onRejected)


     Виникає питання:
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
          Чому тип TResult2 (який повертає onRejected) входить до Union Type (типу fulfillment value нового промісу)?
          Чи не мав би він йти у rejection reason?



     1. Відновлення потоку (Recovery):
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
         Важливо розуміти, що один із головних сценаріїв використання onRejected — відновлення потоку (Recovery):
         перехопити й обробити помилку так, щоб вона не продовжувала безконтрольно спливати далі.

         За цим сценарієм onRejected повертає успішний результат, який переводить наступний проміс у ланцюжку в стан
         fulfilled. Тобто повертає програму на happy path, трансформуючи неконтрольовану помилку в контрольований
         (очікуваний й вже прорахований) результат: string, number, object, undefined, null.

             ◦ Наприклад, onRejected перехоплює помилку, розшифровує її код у userMessage: string, й повертає її
               як результат для подальшого відображення в UI.

             ◦ Або якщо onRejected просто логує помилку (console.error) без явного return, він повертає undefined,
               що також є успішним значенням, бо помилка оброблена й тепер контрольована.



     Водночас, незважаючи на основний сценарій Recovery, існують випадки, коли onRejected не завершує обробку помилки
     успішним результатом.

     Якщо помилку не вдалося остаточно обробити, onRejected може викинути її знову або повернути rejected Promise,
     щоб передати rejection далі по ланцюжку.


     2. Повторне викидання помилки (throw):
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
         Якщо onRejected повторно викидає помилку, наступний Promise переходить у стан rejected.
         Функція, яка завершується через throw, не повертає значення, тому тип її результату — never.

         Саме так працює дефолтний хендлер Thrower Handler, який використовується, якщо onRejected не переданий:

         (err) => { throw err; }
         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

         Тому для TResult2 за замовчуванням вказано тип never:  <TResult1 = T, TResult2 = never>
                                                                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
         Й при об'єднанні TResult1 | never тип never є надлишковим членом Union Type і спрощується, залишаючи
         лише Promise<TResult1>.
              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


     3. Повернення rejected Promise:
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
         Якщо onRejected повертає Promise, який завершується у стані rejected, наступний Promise очікує його
         завершення й після цього також переходить у стан rejected, отримуючи його rejection reason.



                            ───────────────────────── Тип never як надлишковий член Union Type ─────────────────────────

                              Тип never — це порожня множина значень (Ø), маркер неможливості (impossibility), який
                              вказує: «Сюди ніколи не прийдуть дані, бо функція ніколи не завершиться, або через
                              викидання (throw) помилки або через нескінченний цикл».

                              За правилами теорії множин, об'єднання будь-якого типу A з порожньою множиною never
                              спрощується до типу A.

                                                                ┌───────────────────┐
                                                                │  A | never  => A  │
                                                                └───────────────────┘


                              Оскільки never є підтипом будь-якого типу (в тому числі й A), це означає що будь-який
                              тип (у тому числі й A) виступає надмножиною для never.

                              Тобто множина A вже включає в себе множину значень never, тому never є надлишковим
                              членом цього Union й ПІДЛЯГАЄ СПРОЩЕННЮ.

                              Це не означає, що never містить якесь значення, яке вже охоплює множина A: навпаки,
                              never не має жодного можливого значення, тому не існує жодного можливого значення,
                              яке могло б порушити вимогу типу A.




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                                 📍 Thenable-структури
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


───────────────────────────────────
 📍 Передумови та застій JS мови:
───────────────────────────────────

  Нативний Promise з'явився лише в ES6 (2015 рік), хоча сама мова JavaScript існувала вже 20 років (з 1995), і в ній
  давно була гостра потреба в обробці асинхронних операцій.

  Поки специфікація ECMAScript перебувала у тривалому застої й довгий час майже не отримувала нових великих оновлень
  (не розширювала свої можливості й не додавала нові інструменти, потреба в яких була очевидною), веб-додатки стрімко
  еволюціонували.

  Вони перестали бути статичними HTML-сторінками: їм вже треба було виконувати безліч фонових та мережевих задач без
  блокування інтерфейсу, наприклад:

        ◦ Робити запити до сервера без перезавантаження сторінки й обробляти результат (AJAX)

        ◦ Працювати з таймерами (setTimeout, setInterval)

        ◦ Обробляти події користувача, тощо...

  Тобто виконувати все те, що потребує асинхронності — операції, результат яких стає доступним пізніше й які не повинні
  блокувати виконання JavaScript під час очікування.


────────────────────────────────────
 📍 Ера колбеків та Callback Hell:
────────────────────────────────────

  Оскільки в самій JavaScript мові довго не було зручного інструменту для роботи з асинхроннимим операціями (такого
  як Promise), розробники не мали зручного способу щоб:

       ——>  1. Ініціювати асинхронну дію

       ——>  2. Відпустити головний потік для виконання інших задач без блокування інтерфейсу

       ——>  3. Після завершення асинхронної дії, зручно обробити результат або перехопити помилку


  Основним способом була передача звичайних колбеків: функцію передавали як аргумент в іншу функцію, щоб вона була
  викликана пізніше, коли асинхронна операція завершиться.

  Це призводило до Callback Hell, де велика вкладеність колбеків робила код нечитабельним.


──────────────────────────────────────────────────────
 📍 Поява сторонніх бібліотек та контракту Thenable:
──────────────────────────────────────────────────────

  Щоб розв'язати цю проблему, спільнота розробників самостійно почала створювати додаткові бібліотеки (такі як
  Bluebird, Q, тощо) із власними промісоподібними об'єктами.

  Тобто кожна бібліотека створювала свій власний варіант вирішення проблеми.

  Ці бібліотеки не були пов'язані між собою, але їхні промісоподібні об'єкти мали спільну ключову рису — наявність
  методу .then(), завдяки якому можна було будувати ланцюжки промісподібних об'єктів та обробляти результати
  асинхронних операцій.


       │ Thenable — це промісоподібний об'єкт або функція, що має метод .then() для обробки результату
       │  або помилки асинхронної операції


  У TypeScript такі Thenable-об'єкти типізувалися окремо для кожної бібліотеки.

  Тобто, кожна бібліотека мала власний окремий тип, який описував структуру її промісоподібних об'єктів, наприклад
  Bluebird<T> для бібліотеки Bluebird.


─────────────────────────────────────────────
 📍 Поява Promise в JS та PromiseLike у TS:
─────────────────────────────────────────────

  Коли ж в ES6 нарешті з'явився нативний Promise, виникла необхідність одночасно підтримувати не лише сторонні
  Thenable-структури, але й нативні проміси.

  Оскільки автори TypeScript не могли знати наперед, який саме проміс (нативний чи сторонній з бібліотеки)
  використає розробник, їм потрібен був єдиний спільний тип для всіх промісоподібних структур.

  Тому в TypeScript створили тип PromiseLike<T> — загальний інтерфейс, який описує будь-який промісоподібний
  об'єкт, у якого є метод .then().

  Це дозволило узагальнити типізацію промісів, концентруючись на спільному контракті .then(), а не на тому,
  якими саме інструментами чи бібліотеками реалізована промісоподібна структура.



════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                                    📍 PROMISE
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


                                             Структура (Internal Slots):
                                            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

  Promise — це об'єкт, всередині якого зберігаються стан і результат асинхронної операції. Ці дані зберігаються у
  внутрішніх слотах (Internal Slots) об'єкта Promise.

  Слот (Slot) — це приховане системне поле об'єкта в пам'яті, яке повністю недоступне для читання чи запису через
  звичайний JS-код (через крапку).

        ◦ [[PromiseState]] — зберігає поточний стан ("pending", "fulfilled" або "rejected")

        ◦ [[PromiseResult]] — зберігає значення, пов'язане зі станом Promise: fulfillment value при fulfilled або
          rejection reason при rejected

  Оскільки прямий доступ до слота [[PromiseResult]] із зовнішнього коду відсутній, розпакування (unwrapping) даних
  виконується лише через спеціальні інструменти: методи .then() та оператор await.



                                                 Життєвий цикл Promise:
                                               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

  Синхронна частина:
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

    1. Делегування асинхронної дії:

       Як тільки JS-рушій зустрічає виклик асинхронної функції (наприклад, fetch()):

             1.1  Він делегує виконання її асинхронної операції фоновим підсистемам браузера через Web API

             1.2  Й негайно повертає об'єкт Promise (p1) у стані pending, як результат виклику цієї функції


    2. Виклик методу .then() на отриманому промісі (p1):

        Одразу ж на p1 викликається метод .then(onFulfilled), який:

             2.1  Створює НОВИЙ Promise (p2) зі станом pending

             2.2  Реєструє у промісі, на якому був викликаний (p1):

                    ◦ [[Handler]] ─ посилання на передані як агументи колбеки (onFulfilled, onRejected),
                      які мають бути виконані залежно від стану, з яким завершиться цей проміс

                    ◦ [[Capability]] ─ Посилання на новий проміс (p2) та його функції resolve/reject
                      через які результат виконання handler буде передано в p2 й визначь його стан


             2.3  Повертає щойно створений Promise (p2) як результат виклику у зовнішній код.


    3. Подальше конструювання ланцюжка:

       За таким же алгоритмом на промісі, отриманому з методу .then(), викликається метод .catch(), який також повертає
       новий проміс (p3), на якому викликається метод .finally(), який також повертає новий проміс (p4).



  Асинхрона частина:
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

    1. Коли початковий проміс p1 змінює стан на fulfilled (або rejected), зареєстрований в ньому для цього стану
       [[Handler]] ставиться в Microtask Queue.

       Значення зі слоту [[PromiseResult]] початкоого промісу (p1) передасться у [[Handler]] як аргумент, при його
       виконанні.


    2. Коли цей handler потрапляє в Call Stack і виконується, його результат визначає стан p2:

        ◦ Якщо handler викидає помилку, p2 переходить у стан rejected й його слот [[PromiseResult]] заповнюється цією
          помилкою як rejection reason.

        ◦ Якщо handler успішно повертає звичайне значення, p2 переходить у стан fulfilled, а його слот [[PromiseResult]]
          заповнюється цим значенням як fulfillment value.

        ◦ Якщо handler повертає Promise, p2 очікує завершення цього Promise, й лише тоді набуває його [[PromiseState]]
          та [[PromiseResult]] (тобто ніби дублює значення цих полів).


    3. Зміна стану p2 запускає аналогічний процес для його власних зареєстрованих реакцій, передаючи естафету далі по
       ланцюжку промісів.



════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                             Транзит Даних (Pass-Through)
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

  Pass-Through (Транзит даних) — це концепція поведінки ланцюжка Promise, яка полягає в тому, що результат (значення
  або помилка) автоматично пролітає (pass-through) крізь ті методи .then() .catch(), які не мають відповідного обробника

  Identity Handler та Thrower Handler — це дефолтні хендлери (системні функції), якими забезпечується цей транзит.


────────────────────────────────────────────────────────────
   Дефолтні хендлери (Identity Handler та Thrower Handler):
────────────────────────────────────────────────────────────

  Що це таке:
  ‾‾‾‾‾‾‾‾‾‾‾
     Identity Handler та Thrower Handler — це дефолтні системні функції (handlers), які гарантують реалізацію концепції
     Pass-Through (транзит даних та помилок по ланцюжку Promise).


  Призначення:
  ‾‾‾‾‾‾‾‾‾‾‾‾
     Гарантувати безперервність ланцюжка (chaining) Promise: якщо у методі .then() відсутній обробник для поточного
     стану, JS-рушій використовує замість нього відповідний дефолтний хендлер.

     Цей хендлер прокидає результат або помилку далі по ланцюжку промісів, не дозволяючи даним застрягти.


  Алгоритм підстановки:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Якщо під час виклику методу .then() йому бракує будь-якого з двох очікуваних аргументів (аргумент відсутній або не
     є функцією), JS-рушій автоматично реєструє замість нього відповідний дефолтний хендлер:

        ◦ Замість onFulfilled для ТРАНЗИТУ ЗНАЧЕННЯ УСПІХУ (fulfilled pass-through) підставляється Identity Handler
          (x) => x

        ◦ замість onRejected для ТРАНЗИТУ ПОМИЛКИ (rejection pass-through) підставляється Thrower Handler
          (err) => { throw err; }


  ВАЖЛИВО:
  ‾‾‾‾‾‾‾‾
     Усі підстановки дефолтних хендлерів відбуваються виключно при використанні методу .then(). Метод .catch() ─ це
     лише обгортка, яка всередині себе також викликає .then()

     Тобто метод .catch(onRejected) під капотом викликає this.then(undefined, onRejected). У цей момент JS-рушій
     бачить, що першим аргументом, де очікується функція onFulfilled, було передано undefined, тож він автоматично
     реєструє замість неї Identity Handler.




────────────────────────────────────────────────────────────────   ┌───────────────────────┐
  1. Identity Handler (Функція тотожності / Тотожний хендлер):     │   (value) => value    │
────────────────────────────────────────────────────────────────   └───────────────────────┘

  Що це таке:
  ‾‾‾‾‾‾‾‾‾‾‾
     Це системна функція, яка приймає вхідний аргумент й повертає його як результат, без жодних змін.


  Коли застосовується:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Коли під час виклику методу .then() переданий аргумент onFulfilled відсутній або не є функцією, для обробки
     fulfilled використовується Identity Handler.

     Наприклад: при виклику методу .catch(onRejected), який під капотом викликає .then(undefined, onRejected).
     Оскільки перший аргумент передано як undefined, рушій автоматично реєструє Identity Handler як [[Handler]]
     для стану fulfilled.


  Механіка роботи:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Зареєстрований Identity Handler викликається виключно тоді, коли поточний проміс (p1) переходить у стан fulfilled.

     При виклику Identity Handler отримує fulfillment value зі слота [[PromiseResult]] поточного промісу (p1) як
     вхідний аргумент і просто повертає його без змін.

     Тобто відбувається ТРАНЗИТ ДАНИХ (передача даних далі по ланцюжку без змін).

     Проміс p2, посилання на який збережено у системному слоті [[Capability]] поточного промісу (p1), також переходить
     у стан fulfilled із цим самим значенням у слоті [[PromiseResult]].



─────────────────────────────────────────────────────────────────────────  ┌─────────────────────────────────┐
  2. Thrower Handler (Функція-викидач / функція повторного викидання):     │  (reason) => { throw reason; }  │
─────────────────────────────────────────────────────────────────────────  └─────────────────────────────────┘

  Що це таке:
  ‾‾‾‾‾‾‾‾‾‾‾
     Це системна функція, єдина мета якої — взяти отриману помилку й знову викинути її через throw.


  Коли застосовується:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Коли під час виклику методу .then() переданий аргумент onRejected відсутній або не є функцією, для обробки
     rejection використовується Thrower Handler.

     Наприклад: при виклику методу .then(onFulfilled), який також очікує другим аргументом функцію onRejected,
     але ми її не передаємо, тож виклик фактично виглядає як .then(onFulfilled, undefined).

     Оскільки другий аргумент передано як undefined, рушій автоматично реєструє Thrower Handler як [[Handler]]
     для стану rejected.



  Механіка роботи:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     Зареєстрований Thrower Handler викликається виключно тоді, коли поточний проміс переходить у стан rejected.

     При виклику Thrower Handler отримує rejection reason (помилку) зі слота [[PromiseResult]] поточного промісу
     як вхідний аргумент і просто повторно її викидає через throw.

     Тобто відбувається ТРАНЗИТ ПОМИЛКИ (прокидання помилки далі по ланцюжку без змін).

     Цей виняток переводить наступний проміс ланцюжка, посилання на який збережено у системному слоті [[Capability]]
     поточного промісу, у стан rejected із тією самою помилкою у слоті [[PromiseResult]].




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                                 📍 Record<K, V>
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  Record<K, V> — це тип, який описує об'єкт, де:

        ◦ K (Keys) — тип ключів об'єкта

        ◦ V (Values) — тип значень, які зберігаються за цими ключами



  Коли його використовують:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

     1. Коли об'єкт має динамічні ключі (відомий тип ключів, але не їхні точні назви чи кількість)

        Наприклад, ми знаємо, що ключами будуть рядки (string), а значеннями — числа (number),
        але які саме назви матимуть поля — заздалегідь невідомо.

                                  ┌──────────────────────────────────────────────────┐
                                  │   const userScores: Record<string, number> = {   │
                                  │     alex: 100,                                   │
                                  │     john: 85,                                    │
                                  │   };                                             │
                                  └──────────────────────────────────────────────────┘


        Альтернативою є використання Index Signature:

                                  ┌──────────────────────────────────────────────────┐
                                  │   type UserScores = { [key: string]: number }    │
                                  │                                                  │
                                  │   const userScores: UserScores = {               │
                                  │     alex: 100,                                   │
                                  │     john: 85,                                    │
                                  │   };                                             │
                                  └──────────────────────────────────────────────────┘


     2. Коли ключі є відомими й чітко фіксованими через Union Type

        Якщо передати Union Type конкретних ключів, TypeScript вимагатиме, щоб в об'єкті обов'язково
        були присутні абсолютно всі ключі з цього Union Type.

                                ┌──────────────────────────────────────────────────────┐
                                │   type Role = 'admin' | 'user' | 'guest';            │
                                │                                                      │
                                │   const rolePermissions: Record<Role, boolean> = {   │
                                │     admin: true,                                     │
                                │     user: true,                                      │
                                │     guest: false,                                    │
                                │   };                                                 │
                                └──────────────────────────────────────────────────────┘





════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                               📍 FUNCTION SIGNATURE
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

  Будь-яка функція завжди складається з двох частин (незалежно від того чи це JS чи TS):


      1. Signature (Сигнатура ─ підпис/заголовок):
      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

          Це все, що описано ДО відкриваючої фігурної дужки. Сигнатура визначає зовнішній інтерфейс виклику:

             ◦ Назву функції

             ◦ Параметри: їх кількість, порядок та типи (якщо це TS))

             ◦ Тип значення, яке повертається (якщо це TS)


          Зовнішній інтерфейс функції (Сигнатура) — це інструкція з її використання для зовнішнього коду.

          Вона визначає все, що необхідно знати для виклику цієї функції: її ім'я, які аргументи передавати (та їхні
          типи) і що очікувати у відповідь.

          Без цих даних функцію неможливо викликати.


      2. Внутрішня реалізація (Тіло функції):
      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

          Це те, що приховане від зовнішнього коду: JavaScript-код всередині фігурних дужок { ... }, який ми не бачимо
          під час використання функції.



────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                  Overload Signatures vs. Implementation Signature
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


   Implementation Signature (Сигнатура реалізації функції)
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      Слово Implementation перекладається як РЕАЛІЗАЦІЯ або ВТІЛЕННЯ. Реалізація функції ─ це код усередині фігурних
      дужок { ... }, який виконує обчислювальну роботу.

      Implementation Signature ─ це заголовок функції, який стоїть безпосередньо перед її тілом (фігурними дужками).


      ОСНОВНІ ВЛАСТИВОСТІ:

          ◦ Існує завжди — як у чистому JavaScript, так і в TypeScript

          ◦ Слугує публічним контрактом для зовнішнього коду ТІЛЬКИ тоді, коли у функції немає жодної Overload Signature

          ◦ Якщо з'являється хоча б одна Overload Signature, Implementation Signature втрачає публічний статус і більше
            не використовується для зовнішньої типізації. Вона залишається потрібною виключно для перевірки типізації
            всередині тіла функції.




   Overload Signature (Сигнатура Додаткового Навантаження / Багаторежимності)
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      Слово overload означає «накласти зверху» або «накрити додатковими значеннями».

      Overload Signature — це заголовок, після якого відсутнє тіло функції, тобто після нього немає фігурних дужок.


      ОСНОВНІ ВЛАСТИВОСТІ:

           ◦ Описують чітку залежність «вхідний тип аргументу ──> вихідний тип результату»

           ◦ Їхня кількість відповідає кількості типів, які об'єднані в Union Type для вхідного аргументу

           ◦ Існують ТІЛЬКИ в TypeScript і видаляються під час трансляції в JavaScript


────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                  Проблема Union Type у параметрах функції та її вирішення через Overload Signatures
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


  Опис аргументів функції через Union Type
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      Нам потрібна функція, яка буде подвоювати отримане значення, яке може бути числом або рядком.
      Щоб надати функції можливість працювати з різними типами, ми використовуємо Union type (number | string)
      в аргументах.

      Тип значення, яке повертає ця функція, ми можемо не вказувати, оскільки все одно спрацює Type Inference
      (автоматичне виведення типів): TypeScript проаналізує всі оператори return у тілі функції і автоматично
      виведе тип значення, яке повертає функція як Union: number | string.


                       ┌────────────────────────────────────────────────────────────────────────┐
                       │                                                                        │
                       │          Implementation Signature                                      │
                       │  ┌───────────────────────────────────┐                                 │
                       │   function double(x: number | string) {                                │
                       │     if (typeof x === 'number') {                                       │
                       │       return x * 2;                 ──> return типу number             │
                       │     }                                                                  │
                       │     return x + x;                   ──> return типу string             │
                       │   }                                                                    │
                       │                                                                        │
                       │   const result = double('hello');   ──> тип result: number | string    │
                       │                                                                        │
                       └────────────────────────────────────────────────────────────────────────┘


      В нашій функції прослідковується логічна залежність: якщо аргументом приходить рядок — повертається рядок,
      якщо число — число (варіанту, де прийде рядок, а повернеться число не існує).

      Коли ми викликаємо функцію і передаємо як аргумент рядок:

                                        ┌───────────────────────────────────┐
                                        │  const result = double("hello");  │
                                        └───────────────────────────────────┘

      Ми очікуємо, що функція зробить логічне звуження типів і зрозуміє: «передали рядок ─ значить результат є рядком»

      Але TypeChecker не вміє відслідковувати такі закономірності й автоматично звужувати типи. Для нього ця функція
      завжди повретає number | string.


  Практичний наслідок: Блокування специфічних методів
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      Проблема виникає далі по коді, коли ми викликаємо цю функцію й хочемо використати результат, який вона повернула.

      Ми передаємо в функцію рядок "hello" й очікуємо що повернутий результат буде рядком "hellohello".

      Але для Type Checker результат цієї операції має тип number | string. Й оскільки в змінній result може опинитися
      number, він БЛОКУЄ використання будь-яких рядкових методів на результаті (так само як і числових).


                          ┌────────────────────────────────────────────────────────────────────┐
                          │                                                                    │
                          │   const result = double("hello");                                  │
                          │                                                                    │
                          │   const upper = result.toUpperCase(); ──> ПОМИЛКА КОМПІЛЯЦІЇ:      │
                          │                                                                    │
                          │   Property 'toUpperCase' does not exist on type 'number | string'  │
                          │   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾   │
                          └────────────────────────────────────────────────────────────────────┘


      Для того щоб ми все ж таки мали змогу звернутися до специфічних методів нам треба звужувати тип, тобто писати
      зайвий ручний код.

                                    ┌────────────────────────────────────────────┐
                                    │                                            │
                                    │   const result = double("hello");          │
                                    │                                            │
                                    │   if (typeof result === "string") {        │
                                    │     const upper = result.toUpperCase();    │
                                    │   }                                        │
                                    │                                            │
                                    └────────────────────────────────────────────┘



  Короткий підсумок проблеми:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      Коли функція стає складнішою (наприклад, має працювати і з числами, і з рядками), її Implementation Signature
      змушена розширюватися через Union Operator:

                        ┌────────────────────────────────────────────────────────────────────┐
                        │    function double(x: string | number): string | number { ... }    │
                        └────────────────────────────────────────────────────────────────────┘

      Але така широка сигнатура створює проблему для використання результату цієї функції (втрачається точний зв'язок
      між вхідним і вихідним типом), що змушує робити звуження типів після кожного виклику цієї функції.


  Рішення: Використати Overload Signature (сигнатури додаткового навантаження / накладання).
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾



────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                       Overload Signature (Сигнатура Додаткового Навантаження / Багаторежимності)
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


    ЩО ЦЕ:
  ‾‾‾‾‾‾‾‾‾‾‾
        Слово overload означає «накласти зверху» або «накрити додатковими значеннями».

        Overload Signatures — це більш точні, додаткові сигнатури (заголовки), які ми пишемо (накладаємо) зверху над
        початковою сигнатурою (Implementation Signature), щоб перевизначити (уточнити) зовнішній контракт виклику,
        коли єдиного заголовка стає недостатньо.



    СИНТАКСИЧНА ВІДМІННІСТЬ:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

        Головна синтаксична різниця між Implementation Signature та Overload Signature полягає в наявності тіла:

           ◦ Implementation Signature — це заголовок функції, який стоїть безпосередньо перед її тілом, тобто перед
             фігурними дужками { ... }

           ◦ Overload Signature — це заголовок функції, після якого тіло відсутнє, тобто після нього не йдуть фігурні
             дужки { ... }



    ЩО РОБЛЯТЬ:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

      ◦ Описують чітку залежність «тип аргументу ──> тип результату»:

           Кількість Overload Signatures залежить від того, скільки типів об'єднує Union Type в аргументі.

           Якщо аргумент приймає 2 типи (number | string) — ми створюємо дві Overload Signatures (окремо для string
           і окремо для number).


      ◦ Накривають (overload) Implementation Signature, перехоплюючи на себе зовнішню типізацію функції

           Ми оголошуємо Overload Signature для кожного типу з Union Type прямо над Implementation Signature.

           При виклику цієї функції далі по коду, TypeChecker аналізує всі її сигнатури.


                 │ Сигнатура визначає зовнішній інтерфейс виклику функції ─ це інструкція використання
                 │ функції для зовнішнього коду, яка містить ім'я, параметри та тип результату.


           Якщо функція має Overload Signatures, TypeChecker викреслює Implementation Signature з кандидатів на роль
           публічного контракту цієї функції.

           Таким чином, Overload Signatures стають єдиними кандидатами на роль публічного контракту цієї функції.


           Оскільки ми накрили (overloaded) Implementation Signature більш точними контрактами зверху, її власна широка
           типізація більше не використовується при виклику.


           Вона залишається потрібною виключно для внутрішньої перевірки тіла функції:

                 ◦ Чи відповідають return усередині фігурних дужок типу, вказаному в Implementation Signature.

                 ◦ Чи типи аргемунтів, вказаних в Implementation Signature, достатньо широкі, щоб вмістити типи
                   аргументів з усіх Overload Signatures.


      ◦ Існують виключно в TypeScript:

            Це інструмент виключно статичного аналізу, тобто синтаксис оголошення функції без тіла {} дозволений
            виключно в .ts файлах.

            У чистому JavaScript такий код викличе помилку синтаксису (SyntaxError), оскільки JS вимагає наявності
            тіла {} для кожного оголошення function.

            Під час компіляції TypeScript повністю стирає всі Overload Signatures, залишаючи в підсумковому JS-файлі
            лише Implementation Signature з її тілом.



    СИНТАКСИС:
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾
        Ми оголошуємо окремі Overload Signatures для кожного типу з Union Type прямо над Implementation Signature:

                            ┌──────────────────────────────────────────────────────────────┐
                            │                                                              │
                            │      ────── Накладені зверху Overload Signatures ──────      │
                            │        (вони перехоплюють на себе зовнішню типізацію)        │
                            │                                                              │
                            │    function double(x: string): string;                       │
                            │    function double(x: number): number;                       │
                            │                                                              │
                            │                                                              │
                            │      ──────────────── Базова реалізація ───────────────      │
                            │              (Implementation Signature + Body)               │
                            │                                                              │
                            │    function double(x: string | number): string | number {    │
                            │      if (typeof x === "string") return x + x;                │
                            │      return x * 2;                                           │
                            │    }                                                         │
                            │                                                              │
                            └──────────────────────────────────────────────────────────────┘



  Коли TypeChecker аналізує виклик функції double(...), він бере всі зареєстровані для неї сигнатури й виконує
  визначення сигнатури (Signature Resolution) — порівнює типи переданих аргументів із параметрами, збереженими
  в контракті


  ───────────────────────────────────────────
   1. Формування первинного списку сигнатур:
  ───────────────────────────────────────────

        Ще під час аналізу файлу, в якому оголошена наша функція, TypeChecker запам'ятовує усі її сигнатури.

        Й далі, у момент її виклику, він витягує їх з пам'яті та об'єднує у первинний список кандидатів на роль
        публічного контракту цієї функції (Overload Signatures + Implementation Signature).


  ───────────────────────────────────────────────────────────────────────
   2. Implementation Exclusion Barrier (бар'єр, що виключає реалізацію):
  ───────────────────────────────────────────────────────────────────────

        Згідно з алгоритмом TS, якщо у цьому списку є хоча б одне оголошення без тіла (Overload Signature), вмикається
        бар'єр виключення: TypeChecker АВТОМАТИЧНО ВИКЛЮЧАЄ Implementation Signature зі списку кандидатів на роль
        публічного контракту цієї функції

        З цього моменту Implementation Signature перестає існувати для зовнішнього коду. Надалі TypeChecker працює
        ВИКЛЮЧНО зі списком Overload Signatures.


  ───────────────────────────────────────────────────────────────────────
   3. Послідовна перевірка відповідності типів (механіка switch / case):
  ───────────────────────────────────────────────────────────────────────

      TypeChecker бере сформований список Overload Signatures і починає йти по ньому зверху вниз, аналізуючи кожну
      сигнатуру як окремий case-блок:


         3.1  Перевірка першої Overload Signature (Case 1):

              TypeChecker бере першу Overload Signature і порівнює тип аргументу, переданого при виклику функції,
              з типом параметра, вказаним у цій сигнатурі.


                     │  Параметр — це змінна, яку ми вказуємо в оголошенні функції (на етапі написання сигнатури):
                     │  ┌─────────────────────────────────────────────────────────────────────────────────┐
                     │  │   function double(x: string): string;  ──> тут x з типом string — це параметр   │
                     │  └─────────────────────────────────────────────────────────────────────────────────┘
                     │
                     │  Аргумент — це конкретне значення, яке ми передаємо у функцію в момент її виклику:
                     │  ┌─────────────────────────────────────────────────────────────────────────────────┐
                     │  │          double("hello") ➔ тут "hello" з типом string — це аргумент             │
                     │  └─────────────────────────────────────────────────────────────────────────────────┘



         3.2  Збіг і зупинка (Success & Break):

              Якщо тип переданого аргументу відповідає типу параметра сигнатури ──> TypeChecker ОБИРАЄ її як зовнішній
              контракт для цього виклику.

              Для цього виклику функція повертає саме той тип значення, який закріплений за цією сигнатурою.

              Після цього TypeChecker ОДРАЗУ ЗУПИНЯЄ алгоритм і більше НЕ перевіряє наступні сигнатури (працює як break
              у switch/case).

              Тобто відбувається автоматичне звуження типів: результат виклику функції перестає бути широким Union Type,
              а стає конкретним типом, вказаним у цій сигнатурі.


          3.3  Невдача і перехід (Mismatch & Next):

               Якщо тип аргументу не відповідає типу параметра ──> TypeChecker відхиляє поточну сигнатуру й переходить
               до наступної Overload Signature за списком (як наступний case).


  ──────────────────────────────────────────────
   4. Результат перевірки або фіксація помилки:
  ──────────────────────────────────────────────

      CASE 1 (Успішний виклик):

          Якщо потрібну Overload Signature знайдено ──> функція успішно викликається, а результату виклику присвоюється
          точний тип із цієї сигнатури (без Union Type і без потреби у Type Guards).


      CASE 2 (Помилка перевірки типів):

          Якщо жодна Overload Signature не підійшла ──> TypeChecker кидає помилку: "No overload matches this call"
          і навіть не намагається перевірити Implementation Signature.

          Навіть якщо Implementation Signature за своїм типом могла б прийняти цей аргумент, через бар'єр, що виключає
          реалізацію (Implementation Exclusion Barrier), Type Checker не розглядає її як кандидата на роль
          публічного контракту цієї функції

                ┌─────────────────────────────────────────────────────────────────────────────────────┐
                │  const res1 = double("hello");       ──> res1 має тип string                        │
                │                                                                                     │
                │  const upper = res1.toUpperCase();   ──> Жодної помилки, все працює без Type Guard  │
                └─────────────────────────────────────────────────────────────────────────────────────┘


           З Overload Signatures звуження типу відбувається автоматично залежно від типу аргументу який ми передаємо.


──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/