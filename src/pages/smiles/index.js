import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import SmileList from './components/List';
import './SmileVoting.css'

export default function SmileVoting() {
    const [smiles, setSmiles] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [winners, setWinners] = useState(null)

    const isFirstRender = useRef(true);

    useEffect(() => {
        const smilesFromStorage = localStorage.getItem('smiles');

        if (smilesFromStorage) {
            setSmiles(JSON.parse(smilesFromStorage));
        } else {
            const newSmiles = [
                { id: uuidv4(), emoji: '😁', votes: 0 },
                { id: uuidv4(), emoji: '😉', votes: 0 },
                { id: uuidv4(), emoji: '😐', votes: 0 },
                { id: uuidv4(), emoji: '😪', votes: 0 },
                { id: uuidv4(), emoji: '😠', votes: 0 },
            ]
            setSmiles(newSmiles);
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // пропускаємо перший рендер
        }

        try {
            localStorage.setItem('smiles', JSON.stringify(smiles));
        } catch (err) {
            console.log(`Failed to save to localStorage: ${err}`);
        }
    }, [smiles])

    const toggleResult = () => {
        const highestVotes = smiles.reduce((acc, smile) => {
            if (acc < smile.votes) {
                acc = smile.votes;
            }
            return acc;
        }, 0)

        if (highestVotes > 0) {
            const newWinners = smiles.filter(smile => smile.votes === highestVotes)
            setWinners(newWinners)
            setShowResult(prevState => !prevState)
        }
    }

    const addVote = (id) => {
        setSmiles(prevState => prevState.map(smile =>
                smile.id === id ? {...smile, votes: smile.votes + 1} : smile
            )
        )
    }

    const resetVotes = () => {
        setSmiles(prevState => prevState.map(smile => ({ ...smile, votes: 0 })))
        setShowResult(false)
        setWinners(null)
    }

    return (
        <div className='smiles'>
            <h1>Which Emoji Reflects Your Feeling?</h1>

            <SmileList
                smiles={smiles}
                addVote={addVote}
            />

            <div className='smiles__btn-box'>
                <button className='result-btn' onClick={toggleResult}>
                    {!showResult ? 'Show Result' : 'Hide Result'}
                </button>
                <button className='reset-btn' onClick={resetVotes}>Reset</button>
            </div>

            { showResult &&
                <>
                    <h2>Voting results:</h2>
                    <h3>Winners:</h3>
                    <SmileList smiles={winners}/>
                </>
            }
        </div>
    )
}

/*‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                                                       useRef
                                                      ‾‾‾‾‾‾‾‾

 Хук useRef(initialValue) це React-хук, який викликається один раз — при першому рендері

 ВІН ДОЗВОЛЯЄ:

      ◦ Зберігати значення, яке:

             • Ініціалізується лише один раз при першому рендері сторінки: const isFirstRender = useRef(true)

             • Не скидається при наступних рендерах

             • Може змінюватись вручну: isFirstRender.current = false

             • Не викликає повторний рендер компонента, якщо .current змінено


      ◦ Отримати доступ до DOM-елементів напряму (наприклад щоб встановити фокус на інпут (input.focus())

      ◦ Створити контейнер, що не спричиняє повторного рендера при зміні


 КОЛИ МИ ПИШЕМО:  const isFirstRender = useRef(true);

 ЦЕ:
      1. Створює один обʼєкт { current: true } лише один раз — при першому рендері

      2. При наступних рендерах React повертає той самий об’єкт, не створюючи новий

      3. Значення current зберігається в памʼяті React і не скидається

      4. Ми можемо вільно змінювати isFirstRender.current, наприклад, ставити у false після першого рендеру

      5. Зміна current не викликає ререндер — це просто контейнер для збереження стану між рендерами

      6. Значення current залишається в пам’яті доти, доки компонент живий (поки сторінка відкрита)



 ПРИКЛАДИ ВИКОРИСТАННЯ:


 1.      Пропустити перший виклик useEffect (при першому рендері) щоб useEffect працював як componentDidUpdate()
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  НАВІЩО: щоб код в useEffect спрацював тільки при оновленнях, а не при першому рендері


  function Example({ value }) {
    const isFirstRender = useRef(true);    —→  Встановлюємо прапорець:
                                                 ◦ створюємо один об'єкт при першому рендері сторінки: isFirstRender = { current: true }
                                                 ◦ цей обʼєкт зберігається між рендерами — він не ініціюється заново, при перерендері компонента

    useEffect(() => {                      —→  useEffect викликається після першого рендеру компонента і кожного разу, коли змінюється value                                                               ◦
      if (isFirstRender.current) {
        isFirstRender.current = false;     —→  Змінюємо прапорець, що перший рендер вже відбувся
        return;                            —→  й виходимо з useEffect
      }
      ...                                  —→ Весь інший код ефекту не виконується при першому рендері
    }, [value]);
  }

  Після першого рендеру коли value зміниться вдруге  —→  isFirstRender.current уже буде false —→  тому if (...) не спрацює й useEffect виконає основну логіку



 2.                               Доступ до DOM-елемента — наприклад, .focus()
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  НАВІЩО: автоматично поставити фокус у поле при завантаженні сторінки

  function Example() {
    const inputRef = useRef();         —→  (1)  Створюється порожній контейнер, який React після першого рендеру заповнить посиланням на DOM-елемент

                                                Після першого рендеру в inputRef.current буде реальне посилання на <input>
                                                (не обʼєкт React, а справжній DOM-елемент)

    useEffect(() => {                   —→  (3)  Після першого рендеру React виконає цей useEffect
      inputRef.current.focus();         —→  (4)  inputRef.current вже посилається на справжній інпут у DOM, тому виклик focus() працює
    }, []);

    return <input ref={inputRef} />;    —→  (2)  Атрибут ref={inputRef} говорить: "Після того, як створиться цей інпут у DOM — поклади його у inputRef.current"
  }


                                ────────────────────────────────────────────────────────────────────────────────────────
                                                                   focus()

                                 focus() — це вбудований метод HTML-елементів, який:

                                   ◦ ставить фокус на елемент (тобто курсор усередині)
                                   ◦ дозволяє вводити дані без кліку миші


                                 У ЗВИЧАЙНОМУ JS: після завантаження сторінки браузер ставить курсор у поле myInput

                                    document.getElementById('myInput').focus()
                                    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


                                 У REACT:

                                     ◦ Через useRef ми отримуємо доступ до DOM-елемента:  const inputRef = useRef()
                                                                                          ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                                     ◦ Після першого рендеру (в useEffect) ми викликаємо:  inputRef.current.focus()
                                                                                           ‾‾‾‾‾‾‾‾‾‾‾↓‾‾‾‾‾‾‾‾‾‾‾‾
                                                                                      document.getElementById().focus()

                                     Це працює гарантовано, бо useEffect(() => {}, []) виконується після того, як React
                                     вставив DOM-елементи на сторінку


‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾*/