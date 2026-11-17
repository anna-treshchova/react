import type { ComponentPropsWithoutRef } from 'react';
import styles from './CircleButton.module.scss';

type CircleButtonVariant = 'solid' | 'glass' | 'outline' | 'ghost';
type CircleButtonSize = 'sm' | 'md' | 'lg';
type CircleButtonHover =  'default' | 'scale' | 'bg';

type CircleButtonProps = ComponentPropsWithoutRef<'button'> & {
    variant?: CircleButtonVariant;
    size: CircleButtonSize;
    hover?: CircleButtonHover;
}

export const CircleButton = ({
    type = 'button',
    variant = 'solid',
    size,
    hover = 'default',
    children,
    className,
    ...props
}: CircleButtonProps) => {

    const buttonClasses = [
       styles.button,
       styles[variant],
       styles[size],
       styles[`hover-${hover}`],
       className,
   ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    )
}


/*══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                   📍 Дженерик ComponentPropsWithoutRef<T> у React
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

  ComponentPropsWithoutRef<T> — це дженерик-тип React, контракт який влючає абсолютно всі стандартні пропси, які може
  приймати конкретний DOM-тег, окрім пропса ref.

  Наприклад, ComponentPropsWithoutRef<'button'> описує стандартні пропси, які можна передавати JSX-елементу <button>,
  за винятком ref.


  Важлива деталь щодо Argument Type дженерика ComponentPropsWithoutRef<T>:

      Як Type Argument (T) дженерик очікує саме рядок із назвою HTML-тегу ('button', 'input', 'div'), а НЕ тип
      DOM-елемента (наприклад, HTMLButtonElement).


                        ┌──────────────────────────────────────────────────────────────────────┐
                        │                                                                      │
                        │   ComponentPropsWithoutRef<'button'>              ──> Правильно      │
                        │   ComponentPropsWithoutRef<HTMLButtonElement>     ──> Неправильно    │
                        │                                                                      │
                        └──────────────────────────────────────────────────────────────────────┘



  📍 Що саме включає в себе тип ComponentPropsWithoutRef<'button'>:
  ─────────────────────────────────────────────────────────────────

     Це готовий контракт усіх стандартних атрибутів, які React дозволяє передавати в конкретний тег (наприклад <button>):

         1. Специфічні атрибути кнопки:

               ◦ type?: 'button' | 'submit' | 'reset'

               ◦ disabled?: boolean


         2. Глобальні HTML-атрибути

               ◦ id?: string

               ◦ className?: string

               ◦ style?: React.CSSProperties

               ◦ title?: string

               ◦ hidden?: boolean


         3. Всі доступні ARIA-атрибути (Accessibility):

               ◦ aria-label?: string


               ◦ aria-pressed?: boolean | 'true' | 'false' | 'mixed'

                    Стан кнопки-перемикача / Toggle Button

                    Використовується для toggle-кнопок (наприклад, "Like" чи "Додати в обране")

                    Повідомляє скрінрідеру, чи увімкнений / натиснутий зараз стан кнопки


               ◦ aria-expanded?: boolean

                    Використовується для кнопок, що відкривають/закривають блоки (меню, аккордеон)
                    Повідомляє скрінрідеру, чи відкритий зараз блок


         4. Усі обробники подій (Event Handlers):

               ◦ onClick?: React.MouseEventHandler<HTMLButtonElement>

               ◦ onFocus?: React.FocusEventHandler<HTMLButtonElement>

               ◦ onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>

               ◦ onMouseEnter, onMouseLeave тощо


         5. Внутрішній вміст елемента

               ◦ children?: React.ReactNode




  📍 Чому саме ComponentPropsWithoutRef, а не ComponentProps?
  ───────────────────────────────────────────────────────────

     В React є два схожі дженерики:

           1. ComponentProps<'button'> — включає проп ref

                 Використовується для типізації пропсів функціональних компонентів, які приймають ref від
                 батьківського компонента.


                 Зауваження щодо версій React:

                    ◦ У React 18 і раніше — щоб функціональний компонент міг прийняти ref, його обов'язково треба
                      було огорнути в React.forwardRef

                    ◦ У React 19+ — ref став звичайним пропсом, тому його можна приймати напряму через пропси
                      компонента без жодних обгорток



           2. ComponentPropsWithoutRef<'button'> — не включає в себе проп ref

                 Використовується для типізації пропсів функціональних компонентів, які не приймають ref від
                 батьківського компонента.

                 Завдяки цьому TypeScript повідомить про помилку, якщо спробувати передати ref компоненту, у типі
                 пропсів якого цей пропс не передбачений.



  📍 Розширення контракту стандартних пропсів DOM-елементіа через Intersection Operator (&):
  ──────────────────────────────────────────────────────────────────────────────────────────

     Оператор перетину (&) об'єднує кастомні пропси компонента з нативним контрактом стандартних пропсів HTML-кнопки
     (коренневого тегу компонента).

     Це забезпечує наявність усіх необхідних кастомних й базових пропсів які може отримати кнопка не змущуючи нас
     типізувати стандартні пропси вручну.


                     ┌────────────────────────────────────────────────────────────────────────────┐
                     │                                                                            │
                     │   export type CircleButtonProps = ComponentPropsWithoutRef<'button'> & {   │
                     │      variant?: 'solid' | 'ghost';   ──> Власні кастомні пропси             │
                     │      size: 'sm' | 'md' | 'lg';                                             │
                     │      hover?: 'default' | 'scale' | 'bg';                                   │
                     │   };                                                                       │
                     │                                                                            │
                     └────────────────────────────────────────────────────────────────────────────┘




══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════*/
