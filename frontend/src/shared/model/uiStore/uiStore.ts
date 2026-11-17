import { create } from 'zustand';

export type ScreenType = 'mob' | 'tab' | 'desk';

type ScreenQueries = Record<ScreenType, MediaQueryList> | null;

interface SetHeaderStateParams {
    isHeaderCollapsed: boolean;
    isMainContentLifted?: boolean;
    hasHeaderOverlay?: boolean;
}

export interface UIState {
    screen: ScreenType;
    isHeaderCollapsed: boolean;
    isMainContentLifted: boolean;
    hasHeaderOverlay: boolean;
    isAuthModalOpen: boolean;
    hasAppTransitions: boolean;
}

interface UIActions {
    setScreen: (value: ScreenType ) => void;
    setHeaderState: (params: SetHeaderStateParams) => void;
    setMainContentLifted: (value: boolean) => void;
    setHeaderOverlay: (value: boolean) => void,
    openAuthModal: () => void,
    closeAuthModal: () => void,
    setAppTransitions: (value: boolean) => void,
    syncScrollState: () => void,
}

export type UIStore  = UIState & {
    actions: UIActions
}

const screenQueries: ScreenQueries =
    typeof window !== 'undefined'
        ? {
            mob: window.matchMedia('(max-width: 767px)'),
            tab: window.matchMedia('(min-width: 768px) and (max-width: 991px)'),
            desk: window.matchMedia('(min-width: 992px)')
        } : null;


const getScreen = (): ScreenType => {
    if (!screenQueries) return 'mob';
    if (screenQueries.mob.matches) return 'mob';
    if (screenQueries.tab.matches) return 'tab';
    return 'desk';
}

export const useUIStore = create<UIStore>()((set) => ({
    screen: getScreen(),

    isHeaderCollapsed: false,
    isMainContentLifted: false,
    hasHeaderOverlay: false,

    isAuthModalOpen: false,

    hasAppTransitions: true,

    actions: {
        setScreen: (value) => set({ screen: value }),

        setHeaderState: ({
            isHeaderCollapsed,
            isMainContentLifted,
            hasHeaderOverlay = false
        }) => set((state) => ({
            isHeaderCollapsed,
            isMainContentLifted: isMainContentLifted ?? state.isMainContentLifted,
            hasHeaderOverlay: state.screen !== 'mob' ? hasHeaderOverlay : false
        })),
        setMainContentLifted: (value) => set({ isMainContentLifted: value }),
        setHeaderOverlay: (value) => set({ hasHeaderOverlay: value }),

        openAuthModal: () => set({ isAuthModalOpen: true }),
        closeAuthModal: () => set({ isAuthModalOpen: false}),

        setAppTransitions: (value) => set({ hasAppTransitions: value }),
        syncScrollState: () => set({
            isHeaderCollapsed: window.scrollY > 50,
            isMainContentLifted: window.scrollY > 50,
        }),
    },
}))

if (screenQueries) {
    let transitionsTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleMediaChange = (e: MediaQueryListEvent) => {
        if (!e.matches) return;

        const { setScreen, setAppTransitions } = useUIStore.getState().actions;

        setScreen(getScreen())
        setAppTransitions(false);

        if (transitionsTimeout) {
            clearTimeout(transitionsTimeout);
        }

        transitionsTimeout = setTimeout(() => {
            setAppTransitions(true);
            transitionsTimeout = null;
        }, 150)
    }

    screenQueries.mob.addEventListener('change', handleMediaChange);
    screenQueries.tab.addEventListener('change', handleMediaChange);
    screenQueries.desk.addEventListener('change', handleMediaChange);
}



/*══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                📍 Робота з медіа-запитами в JS через window.matchMedia
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


    У CSS коли нам потрібно змінити якісь стилі елемента або запустити якусь анімацію залежно від розміру екрана,
    (тобто виконати якісь дії залежно від вікна) ми використовуємо @media.

                                    Наприклад: @media(max-width: 767px)

    І браузер сам відстежує зміну розміру екрана користувача й перемикає стилі, прописані для конкретних розмірів.



    Але на відміну від CSS @media, у JavaScript неможливо просто описати умову й логіку, яку потрібно виконувати
    при певному розмірі екрана.

    Щоб код автоматично реагував на зміну розміру, потрібно підписатися на відповідну подію, тобто встановити слухач.


    Тож коли нам в JS-коді (наприклад, в Zustand-сторі) потрібно зрозуміти, який зараз розмір екрана, або навісити
    якусь дію на конкретну зміну екрана (наприклад, коли екран стає меншим за 768px ─ тобто приймає мобільний розмір)
    ─ використовується window.matchMedia('(max-width: 767px)').


    matchMedia ─ це метод, за допомогою якого можна спитати браузер чи відподіває поточна ширина вікна (viewport)
    користувача умові, яку ми передаємо в метод, наприклад: window.matchMedia('(max-width: 767px)').


    Цей метод повертає об'єкт, який має такий вигляд:

      ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
      │                                                                                                           │
      │   {                                                                                                       │
      │     media: "(max-width: 767px)",    ───> Передана CSS-умова                                               │
      │                                                                                                           │
      │     matches: true,                  ───> Результат: чи відповідає поточна ширина екрана цій умові         │
      │                                                                                                           │
      │     onchange: null                  ───> Властивість (слот) куди можна поласти функцію-обробник для       │
      │                                          події зміни поля matches.                                        │
      │                                                                                                           │
      │                                          Зазвичай замість нього використовують addEventListener,          │
      │   }                                      оскільки він дозволяє додавати кілька обробників події           │
      │                                                                                                           │
      └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘


    Завдяки цьому об'єкту можна:

┌──
│   По-перше, одноразово перевірити розмір вікна (mob / tab / desk), точніше спитати наприклад чи зараз екран має
│   мобільний розмір, тобто чи відповідає він переданій у метод умові: window.matchMedia('(max-width: 767px)').
└──
    У відповідь ми отримаємо об'єкт із властивістю matches, значенням якого є boolean (відповідь на наше запитання):

          ◦ Якщо true: Так, вікно браузера відповідає умові (тобто вікно користувача зараз має мобільний розмір)

          ◦ Якщо false: Ні, вікно браузера не відповідає переданій умові


    Чому одноразово?

      Бо ми лише зчитали поле matches і не підписалися на подію change, тож перевірка одноразова. Сам об'єкт
      MediaQueryList не є незмінним знімком: його властивість matches відображає поточний результат медіа-запиту.


      Це використовується коли ми прописуємо код, який може відрізнятися залежно від того, якого розміру зараз вікно.

      Ми запитуємо: «Чи ширина екрана користувача зараз мобільна?» ─ й прописуємо умову: якщо властивість matches
      об'єкта, який повернув метод matchMedia, дорівнює true (тобто зараз мобільне розмір) то застосовуємо один код,
      якщо ні — інший.

      Тобто логіка будується від того, що нам у будь-якому разі треба виконувати певний код, але його варіант
      відрізняється залежно від розміру вікна.




┌──
│   По-друге, ми можемо підписатися на зміну значення властивості matches (тобто коли розмір екрана починає або
│   перестає відповідати переданій умові ─ прослуховувати перетин межі: наприклад, перехід з 767px на 768px та назад).
└──

    Важливо: це не слухач будь-якої зміни розміру вікна (як window.onresize, який спрацьовує на кожен піксель).
    Подія в MediaQueryList спрацьовує тільки тоді, коли змінюється значення поля matches (з true на false або з
    false на true).


    Об'єкт з інтерфейсом MediaQueryList (який повертає matchMedia) є нащадком EventTarget. Це означає, що він
    успадковує стандартні методи для роботи з подіями (addEventListener, removeEventListener, тощо).

    Завдяки цьому ми можемо повісити слухач події 'change' й передати в нього другим аргументом обробник, який
    спрацьовуватиме щоразу, коли значення поля matches змінюватиметься (тобто коли екран буде перетинати вказану межу):


                           ┌───────────────────────────────────────────────────────────────┐
                           │                                                               │
                           │   const mobQuery = window.matchMedia('(max-width: 767px)');   │
                           │                                                               │
                           │                                                               │
                           │   mobQuery.addEventListener('change', (e) => {                │
                           │       if (e.matches) {                                        │
                           │           // Логіка коли ми перейшли на мобільний розмір      │
                           │       } else {                                                │
                           │           // Логіка коли ми вийшли з мобільного розміру       │
                           │       }                                                       │
                           │   });                                                         │
                           │                                                               │
                           └───────────────────────────────────────────────────────────────┘





════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                 📍 Функція create у Zustand та особливості її типізації
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


                            ┌─────────────────────────────────────────────────────────────┐
                            │                                                             │
                            │   export const useUIStore = create<UIState>()((set) => ({   │
                            │     // state and actions                                    │
                            │   }));                                                      │
                            │                                                             │
                            └─────────────────────────────────────────────────────────────┘


    create — це generic-функція Zustand, яка створює store та повертає React-хук (наприклад, useUIStore) для роботи
    з цим стором.

    Вона приймає callback-функцію (функцію-ініціалізатор), яка отримує API Zustand як аргументи (set, get, store)
    й повертає об'єкт із початковим станом та діями (actions) для зміни цього стану.

    Далі функція create використовує цей об'єкт для створення store.



   📍 У типізації Zustand передбачено дві окремі сигнатури виклику create:
   ───────────────────────────────────────────────────────────────────────

      1. Звичайна сигнатура (одинарний виклик): create((set) => ({ ... }))

             Вона очікує два Type Parameters: T — тип store, і Mos — типи вихідних middleware (Mutators Out).

             Якщо ці Type Parameters не вказані явно, TypeScript намагається вивести їх автоматично. Однак тип стану
             T може бути виведений неправильно, саме тому в TypeScript зазвичай використовують create<UIState>()(...),
             явно задаючи тип стану.



      2. Каррована сигнатура (подвійний виклик): create<UIState>()((set) => ({ ... }))

             Спеціальна сигнатура для випадку, коли ми хочемо явно передати тип нашого стору.

             Каріювання — це техніка, коли функція замість прийняття всіх аргументів одразу розбивається на ланцюжок
             функцій, які викликаються послідовно одна за одною.


             У контексті Zustand це означає, що процес створення стору відбувається у два етапи:


                2.1  Перший виклик — create<UIState>()

                     Ми викликаємо функцію create, передаючи їй Type Argument UIState.

                     На цьому етапі JS не отримує жодних аргументів у дужках й просто повертає нову проміжну функцію,
                     але TypeScript отримує тип стору: UIState.


                2.2  Другий виклик — ((set) => ({ ... }))

                     Ми одразу ж викликаємо повернуту на першому кроці функцію і передаємо їй наш callback-ініціалізатор

                     Саме тому ця сигнатура називається каррованою: виклик create не створює стор напряму, а повертає
                     іншу функцію, яка й завершує створення стору після передачі колбеку.





  📍 Нащо потрібна сигнатура з подвійним викликом: create<UIState>()(...)
  ───────────────────────────────────────────────────────────────────────

     У звичайній сигнатурі функція create має декілька Type Parameters. Тож якщо ми спробуємо передати туди лише тип
     нашого стору:

                                      ┌─────────────────────────────────────────┐
                                      │   create<UIState>((set) => ({ ... }))   │
                                      └─────────────────────────────────────────┘

     TypeScript зіштовхнеться зі своїм фундаментальним обмеженням: відсутністю часткового передавання Type Parameters
     (No Partial Generic Inference).

     Тобто TypeScript не дозволяє передати один Type Parameter вручну, а решту залишити для автоматичного виведення в
     тому самому виклику — якщо ви передали один тип, автовиведення для інших вимикається.



     Як це було вирішено в Zustand?
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
         Саме для цього і створили другу сигнатуру з каріюванням:

             1. Перший виклик create<UIState>() не приймає аргументів у JS, але в TypeScript очікує рівно один
                Type Argument UIState (тип стану). TypeScript фіксує цей тип і повертає нову функцію.

             2. Другий виклик ((set) => ({ ... })) викликає повернуту функцію й передає в неї функцію-ініціалізатор.
                Оскільки UIState уже заданий під час першого виклику, під час другого виклику TypeScript може вивести
                типи інших параметрів, зокрема Mos, із переданого callback.




════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                           📍 Універсальна типізація таймерів: ReturnType<typeof setTimeout>
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════


  ReturnType<typeof setTimeout> — це комбінація двох інструментів TypeScript: оператора typeof та вбудованого
  утилітарного типу ReturnType<T>.

  Разом вони дозволяють динамічно витягнути тип значення, яке повертає функція setTimeout, не прив'язуючись жорстко
  до конкретного середовища (браузера чи Node.js).


                                                  РОЗБІР КОНСТРУКЦІЇ:
────────────────────────
  1. typeof setTimeout
────────────────────────

    У TypeScript оператор typeof дозволяє отримати тип значення (або функції). Тож typeof setTimeout повретає тип
    setTimeout, який містить усі її overload-сигнатури.

                                   ┌───────────────────────────────────────────────┐
                                   │   type TimeoutFunction = typeof setTimeout;   │
                                   └───────────────────────────────────────────────┘


───────────────────────────────────
  2. ReturnType<...>ReturnType<T>
───────────────────────────────────

    Це вбудований у TypeScript Utility Type (утилітарний тип).


            │  Що таке утилітарний тип?
            │
            │       Утилітарний тип (Utility Type) — це вбудований у TypeScript дженерик-тип,
            │       який приймає тип (або сигнатуру) як аргумент і трансформує його у новий тип.


    ReturnType приймає тип функції T і вирізає з нього тільки тип того значення, яке ця функція повертає:

                      ┌──────────────────────────────────────────────────────────────────────────┐
                      │                                                                          │
                      │   type FetchUser = () => { id: number; name: string };                   │
                      │                                                                          │
                      │   type User = ReturnType<FetchUser>;  ──> { id: number; name: string }   │
                      │                                                                          │
                      └──────────────────────────────────────────────────────────────────────────┘

    Якщо функція має кілька overload-сигнатур, ReturnType бере тип повернення останньої overload-сигнатури.


  📍 РЕЗУЛЬТАТ ПОЄДНАННЯ:
───────────────────────────

    Коли ми пишемо ReturnType<typeof setTimeout>, TypeScript:

       1. Через typeof setTimeout отримує повну сигнатуру функції setTimeout

       2. Через ReturnType<...> дістає з цієї сигнатури лише тип значення, яке ций таймер повертає (id таймера)




  📍 ГОЛОВНА ПРОБЛЕМА:
────────────────────────

    Чому не можна просто написати що тип значення яке повертає setTimeout (id таймера) має тип number?

    Бо у JavaScript функція setTimeout працює по-різному залежно від того, де виконується код:


          ◦ У браузері метод setTimeout повертає числовий ідентифікатор типу number.

          ◦ У Node.js (SSR) він повертає спеціальний об'єкт таймера типу NodeJS.Timeout.


    Тож якщо написати тип вручну:

          ◦ let timer: number           ───> TypeScript видасть помилку під час збірки проєкту в Node.js / Next.js

          ◦ let timer: NodeJS.Timeout   ───> TypeScript видасть помилку в чистому браузерному середовищі


    ReturnType<typeof setTimeout> вирішує цю проблему: Він дозволяє отримати тип значення, яке повертає setTimeout
    відповідно до декларацій, які бачить TypeScript у проєкті.


          ◦ Якщо доступна лише браузерна декларація DOM — типом буде number

          ◦ Якщо підключені типи Node.js, результат може бути NodeJS.Timeout



    ВАЖЛИВО:

        Якщо TypeScript бачить кілька overload-сигнатур setTimeout, ReturnType бере тип повернення останньої сигнатури.
        Тому, коли підключені типи DOM і Node.js, результат залежить від того, яка сигнатура є останньою.



══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════*/