import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import TodoForm from './components/Form';
import TodoList from './components/List';
import TodoHeader from './components/Header';

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    id: uuidv4(),
                    description: 'Cover React Class Component Lifecycle',
                    completed: true
                },
                {
                    id: uuidv4(),
                    description: 'Complete Todo Task and push the changes to GitHub',
                    completed: false
                },
                {
                    id: uuidv4(),
                    description: 'Complete hw25.1',
                    checked: false
                }
            ]
        }
    }

    toggleTodos = (id) => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {    // (1) проходимося по кожній todo в масиві —→ (5)
                if (todo.id === id) {                               // (2) для кожного todo виконуємо перевірку й якщо id todo збігається з тим, який ми передали
                    return {...todo,  completed: !todo.completed};   // (3) повертаємо копію цього todo з оновленим полем completed
                }
                return todo                                         // (4) Якщо id не збігається — повертаємо цей todo без змін
            })
            return {todos: updatedTodos};                           // (6) Оновлюємо поле todos у state
        })
    }

                                                                                                                      /*
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
(3)  return {                                 Повертаємо новий об'єкт в якому:
       ...todo,                       —→         ◦ за попомогою spread оператора копіюємо всі поля
       completed: !todo.completed                ◦ перезаписуємо поле completed на протилежне значення
     }
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
(5)  const updatedTodos = ...         —→      Зберігаємо в updatedTodos новий масив який створює map(), де тільки
                                              одна todo була змінена через умову й всі були повернені без змін
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                                                                                                                      */

    deleteTodo = (id) => {
        this.setState((prevState) => ({                            // функція повертає новий об'єкт стану з оновленим todos
            todos: prevState.todos.filter(todo => todo.id !== id)  // filter створює новий масив, у який додає лише ті todo, id яких НЕ збігається з переданим id
        }));
    }

    render() {
        return (
            <div>
                <TodoHeader/>
                <TodoForm/>
                <TodoList
                    todos={this.state.todos}
                    toggleTodo={this.toggleTodos}
                    deleteTodo={this.deleteTodo}
                />
            </div>
        )
    }
}

/*─────────────

 Props — це властивості, які передаються як атрибути від батьківського компонента (з index.js сторінки) до дочірніх

 ПРОБЛЕМА:
   Props drilling — це ситуація, коли батьківський компонент передає дані (props) через кілька рівнів компонентів,
   навіть якщо проміжні компоненти не використовують ці дані, а лише передають далі

 РІШЕННЯ
   Використовувати глобальний менеджер стану — Redux. Він дозволяє надавати доступ до даних будь-якому компоненту
   напряму, без необхідності передавати їх через проміжні компоненти

───────────────

 ❗️Each child in a list should have a unique 'key' prop ❗️

 key — це спеціальний атрибут, який React використовує внутрішньо, щоб ідентифікувати елементи у списках або при
 динамічному рендері

   ◦ Дозволяє React ефективно реагувати на зміни й швидко ідентифікувати елемент, в якому відбулися зміни

   ◦ React не може сам призначити ключі при динамічному створенні елементів — тому ми передаємо key вручну

   ◦ Зазвичай об’єкти вже мають поле id (створене через бібліотеку uuidv4) — його зручно використовувати як key

   ◦ key має бути унікальним і стабільним — не слід використовувати індекси масиву, бо вони можуть змінюватись

─────────────*/



export default Todo;