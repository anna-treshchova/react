import React from 'react';  // імпортуємо об'єкт React, в середині якого є класс Component

class FirstComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        }
    }

    increment = () => {
        // this.setState({ count: this.state.count + 1 })    // об'єкт

        this.setState((prevState) => ({ count: prevState.count + 1 }))  // функція
        this.setState((prevState) => ({ count: prevState.count + 1 }))
    }

    render() {
       return (
           <>
               <div>
                   <span>Hello, I am first react component!</span>
                   <div>
                       {this.state.count}
                   </div>
               </div>
               <div>
                   <span>Hello, I am first react component!</span>
                   <div>
                       {this.state.count}
                   </div>
               </div>
               <button onClick={this.increment}>Increment</button>
           </>
       )
   }
}

export default FirstComponent;



/*‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 1. import React from 'react'

    ◦ Імпортуємо бібліотеку React, бо вона потрібна, щоб писати React-компоненти

    ◦ У класових компонентах обов’язково імпортуємо React, щоб успадковуватися від React.Component і використовувати JSX

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 2. class FirstComponent extends React.Component {}

     Створюємо клас FirstComponent, який успадковується від React.Component, це означає, що він має всю функціональність
     React-компонента:

        ◦ метод render()

        ◦ підтримку this.props

        ◦ підтримку this.state та this.setState()

        ◦ життєвий цикл компонента — компонент отримує доступ до життєвих методів, які дозволяють керувати тим, що має
          відбуватись:

             • componentDidMount() — після відмальовування компонента

             • componentDidUpdate() — при зміні props/state

             • componentWillUnmount() — перед видаленням з DOM тощо

             • та інші (лише у класових компонентах)

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 3. Конструктор:

    constructor(props) {
         super(props);

         this.state = {
             count: 0,
         }
     }

    ◦ constructor(props) — це спеціальний метод класу, який автоматично викликається при створенні об’єкта класу
      (екземпляра компонента).

          Аргумент props — це вхідні дані, які передаються ззовні, тобто від батьківського компонента


    ◦ super(props) — цей рядок викликає конструктор батьківського класу (React.Component)

          Це обов’язково, якщо ми хочемо отримати доступ до this.props


    ◦ this.state = { count: 0 } — ініціалізуємо початковий стан компонента:

         • state — це обʼєкт, у якому зберігаються дані, які можуть змінюватися й трегирити відмалювання New Virtual DOM

         • тут ми створили змінну count і присвоїли їй значення 0

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 4. Метод render() — обов’язковий у класових компонентах

    ◦ він визначає, що саме має повертати компонент, тобто що буде відображено в DOM

    ◦ повертає JSX — спеціальний синтаксис, який React перетворює на React-елементи (елементи Virtual DOM)

    ◦ завжди має повертати один єдиний елемент (наприклад, <div> або <React.Fragment>), який може містити всередині інші


‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾*/

