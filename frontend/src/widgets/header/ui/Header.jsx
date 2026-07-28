import { useEffect, useRef } from 'react';

import { CircleButton } from '@/shared/ui/CircleButton';
import { Avatar } from '@/shared/ui/Avatar';
import CloseIcon from '@/shared/assets/icons/close.svg?react';

import { SearchPanel } from '@/features/search';
import { UserMenu } from '@/features/auth';

import { useHeader } from '../model/useHeader.js'
import { RegularNav, CompactNav } from './nav';
import { Logo } from './logo';
import styles from './Header.module.scss'

export const Header = () => {
    const {
        me,

        headerSentinelRef,
        navSentinelRef,

        isHeaderCollapsed,
        screen,
        isHub,
        isMobile,
        pageType,

        isFormDisabled,
        hasHeaderOverlay,
        hasHeaderTransitions,
        isNavHidden,
        areNavIconsHidden,

        expandHeader,
        collapseHeader,
    } = useHeader()

    const prevIsHubRef = useRef(isHub);

    useEffect(() => {
        prevIsHubRef.current = isHub;
    }, [isHub]);

    if (pageType === 'details' && isMobile) return null;

    const datasetAttributes = {
        'data-screen': screen,
        'data-header-collapsed': isHeaderCollapsed,
        'data-hub': isHub,
        'data-page-type': pageType,
        'data-form-disabled': isFormDisabled,
        'data-header-overlay': hasHeaderOverlay,
        'data-nav-hidden': isNavHidden,
        'data-nav-icons-hidden': areNavIconsHidden,
        'data-transitions-disabled': !hasHeaderTransitions,
    }

    const onOverlayClick = () => {
        if (isMobile && !isHeaderCollapsed) return;
        collapseHeader()
    }

    return (
        <div className={styles.headerRoot} {...datasetAttributes}>
            <div ref={headerSentinelRef} className={styles.headerSentinel} />
            <div ref={navSentinelRef} className={styles.navSentinel} />
            <div className={styles.topBackground} />

            <header className={styles.header}>
                <div className={styles.topBar}>
                    <RegularNav />
                    <div className={styles.closeButtonWrapper}>
                        <CircleButton
                            variant='solid'
                            size='md'
                            onClick={collapseHeader}
                            aria-label='Close'
                        >
                            <CloseIcon />
                        </CircleButton>
                    </div>
                </div>

                {!isMobile &&  <Logo />}

                <SearchPanel
                    expandHeader={expandHeader}
                    compactNavSlot={<CompactNav />}
                />

                <div className={styles.userWrapper}>
                    {me &&
                        <Avatar id={me.id} label={me.email?.[0]?.toUpperCase() || '?'} />
                    }
                    <UserMenu me={me} />
                </div>
            </header>

            <div className={styles.spacer}/>
            <div className={styles.shadowLine}/>
            <div className={styles.overlay} onClick={onOverlayClick} />
        </div>
    )
}


/*──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

     1. const startY = window.scrollY  ─  наскільки документ уже прокручений від початку (поточна позиція viewport у
        документі)

───────────────────
     2. const diff = targetY - startY  ─  різниця між позицією верхнього краю елемента й поточним scroll в документі

         ТОБТО: це відстань, на яку потрібно змінити scroll, щоб верх viewport співпав з верхом елемента

───────────────────
     3. const startTime = performance.now()  ─  кількість мілісекунд, які пройшли з моменту завантаження сторінки
                                                (у момент виклику smoothScrollTo)

         ТОБТО: startTime  ─  час початку анімації

───────────────────
     4. rafRef.current = requestAnimationFrame(step)  ─  запуск анімації

         4.1  requestAnimationFrame — це API браузера, яка використовується для виконання анімацій

              Воно реєструє функцію (callback), яку браузер викличе перед наступним оновленням (перемальовуванням)
              кадру сторінки

              Браузер регулярно оновлює зображення сторінки на екрані ─ ОНОВЛЮЄ КАДР
              (зазвичай приблизно 60 разів на секунду, тобто приблизно кожні 16 мс)


         4.2  Коли настає наступний кадр, браузер викликає: step(time)

              Де time — це кількість мілісекунд від моменту завантаження сторінки на момент виконання цього кадру

              ТОБТО:

                  1. Виклик smoothScrollTo
                     ↓
                     const startTime = performance.now()
                     ↓
                     startTime === 10000 ms


                  2. Виклик requestAnimationFrame(step)
                     ↓
                     Браузер реєструє callback, але не викликає його одразу — він чекає наступного кадру
                     ↓
                     Настає наступний кадр (~16 мс пізніше)
                     ↓
                     Браузер викликає step(time)
                     ↓
                     time === 10016 ms

───────────────────
     5. const progress = Math.min((time - startTime) / duration, 1)  ─  обчислення відношення

        progress ─ це відношення часу, який уже минув від початку анімації, до повної тривалості анімаціїм (duration)

                                                                             startTime === 10000 ms    time === 10016 ms

         5.1  (time - startTime)  ─  скільки мілісекунд уже триває анімація ─> 10016 - 10000 = 16ms - ЧАСТКА

         5.2  (time - startTime) / duration  ─  перетворює час анімації, який уже минув, у відносну величину від 0 до 1,
              яка показує яка частка від загальної тривалості анімації (duration) уже пройшла

              Це процентне співвідношення без помноження на 100%

               16/200 = 0.08 ─> це 8% від 200 (duration)


         5.3  Math.min(value, 1)  ─  Гарантує, що progress не перевищить 1 (тобто 100%)

              Якщо progress = 1  ─  анімація завершена (200ms анімації минули) бо 200/200 = 1


                         ───────────────────────────────────────────────────────────────────────────────────────────────
                                                         НАВІЩО ПОТРІБЕН PROGRESS:

                            ◦ progress потрібен, щоб визначити, на скільки змінити scroll на цьому кадрі

                            ◦ Ми використовуємо його у формулі:  нова позиція scroll = startY + diff * progress
                                                                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                                 ДЕ:
                                      ◦ startY — позиція scroll на початку анімації

                                      ◦ diff — на скільки треба проскролити загалом

                                      ◦ progress — відношення

                            diff * progress
                           ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                            Це відношення використовується, щоб визначити, яку ЧАСТИНУ від загальної відстані (diff)
                            потрібно пройти на поточному кадрі
                            ↓
                            щоб була відповідність між пройденим часом анімації та проскроленою відстанню


                            Ми визначили відношення пройденого часу анімації до загального часу й тепер приміняємо
                            його до diff (повної відстані в пікселях яку треба пройти), щоб знаючи відношення й
                            повну величину визначити ЧАСТКУ


                            Це протилежна операція до обчислення progress:
                                  Ми знали частку (time - startTime) й повну величину (duration) й визначали відношення

                         ───────────────────────────────────────────────────────────────────────────────────────────────
                               ❗Анімація рахується через час (progress), а не через додавання фіксованої кількості
                                  пікселів на кожному кадрі, щоб пройдена відстань була пропорційна часу анімації
                         ───────────────────────────────────────────────────────────────────────────────────────────────

───────────────────
     6. window.scrollTo(0, startY + diff * progress)  —  зміна позиції scroll для поточного кадру в анімації

         6.1  window.scrollTo(x, y) — API браузера, яка прокручує документ до заданих координат

              У нашому випадку горизонтальний scroll не змінюється, змінюється тільки вертикальний scroll


         6.2  startY + diff * progress  —  формула нової позиції scroll

               ◦ startY — позиція scroll на початку анімації   —> startY = 500


               ◦ diff — загальна відстань у пікселях, яку треба проскролити, щоб верх viewport співпав з верхом елемента
                  —> diff = 120

                ◦ progress — відношення   —> progress = 0.08


              scroll = 500 + 120 * 0.08 = 500 + 9.6 ≈ 510  —>  window.scrollTo(0, 510)


              ЩО ВІДБУВАЄТЬСЯ ПІД ЧАС АНІМАЦІЇ:

                  На кожному кадрі:

                        progress збільшується
                        ↓
                        diff * progress стає більшим
                        ↓
                        scroll поступово наближається до targetY


───────────────────

     7. if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)          —> raf — це скорочення від requestAnimationFrame
        }

         7.1  Перевірка, чи завершилась анімація

                ◦ progress < 1  →  час анімації ще не минув → запускаємо наступний кадр

                ◦ progress = 1  →  час анімації минув → анімація завершується


         7.2  requestAnimationFrame(step) — виклик requestAnimationFrame дає браузеру вказівку запланувати виклик
              step(time) на наступному кадрі, щоб зробити новий розрахунок й  продовжити анімацію

              Браузер створює запис у черзі анімацій, який означає: на наступному кадрі викликати step(time)

              requestAnimationFrame(step) повертає ID запланованого виклику, який ми зберігаємо щоб за потреби можна
              було скасувати цей виклик через: cancelAnimationFrame(rafRef.current)


───── ease-out ──────

     8.  ease = progress * (2 - progress) — формула створення візуального ефекту

         8.1  ease — це модифіковане значення progress, яке використовується для зміни швидкості анімації

              Ми вже знаємо що:
                                  ◦ progress = 0  —> анімація тільки почалась

                                  ◦ progress = 0.5  —> пройшла половина часу

                                  ◦ progress = 1  —> анімація завершилась


         8.2  (2 - progress) — це просто математичний вираз, який змінюється разом із progress

              ПРИКЛАДИ:          progress	    (2 - progress)
                                    0	            2
                                    0.25	        1.75
                                    0.5            	1.5
                                    0.75	        1.25
                                    1	            1


         8.3  progress * (2 - progress)

              ПРИКЛАДИ:         progress	   ease
                                   0	        0
                                   0.25       	0.4375
                                   0.5      	0.75
                                   0.75	        0.9375
                                   1	        1


              ◦ Отримуємо інше значення, ніж progress — яке на початку дає більші прирости, а в кінці — менші

              ◦ Це ease-out: рух швидкий на початку і повільний в кінці

              ◦ Аналогічно можна використати іншу формулу для ease-in — повільний рух на початку і швидкий в кінці

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


     1. barRef.current.getBoundingClientRect().top + window.scrollY  ─  позиція елемента від початку документа
                                                                                                     ‾‾‾‾‾‾‾‾‾
         1.1  element.getBoundingClientRect().top  ─  відстань від верхнього краю viewport до верхнього краю елемента
                                                                                  ‾‾‾‾‾‾‾‾
         1.2  window.scrollY  ─  наскільки документ уже прокручений від початку (поточна позиція viewport у документі)
                                           ‾‾‾‾‾‾‾‾

     2. smoothScrollTo(y, 200)  ─  виклик анімації

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

        1. Користувач скролить
           ↓
        2. IntersectionObserver змінює mode
           ↓
        3. Викликається smoothScrollTo
           ↓
        4. requestAnimationFrame(step) вказує браузеру запланувати виклик step(time) на наступному кадрі
           ↓
        5. Але користувач продовжує скролити
           ↓
        6. Спрацьовує wheel / touchmove
           ↓
        7. cancelScroll → cancelAnimationFrame(rafRef.current)
           ↓
        8. Запланований виклик step(time) скасовується


──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/