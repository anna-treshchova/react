import { useState, useEffect } from 'react';

export default function FunctionalCounter() {
    const [count, setCount] = useState(0)
    const [smile, setSmile] = useState(':)')


    useEffect(() => {   // ЕКВІВАЛЕНТНО componentDidMount —→ викликається один раз після першого рендеру
        // fetch()
        console.log('Mount! (componentDidMount)')

        return () => {        // ЕКВІВАЛЕНТНО componentWillUnmount —→ перед тим, як компонент буде видалено з DOM
            console.log('Unmount! (componentWillUnmount)')
        }
    }, []) // dependency array (масив залежностей)


    useEffect(() => {    // МАЙЖЕ ЕКВІВАЛЕНТНО componentDidUpdate —→ після першого рендеру та при кожній зміні dep
        console.log('Update! (componentDidUpdate)')
    // У класах componentDidUpdate не викликається на першому рендері. У функціях — useEffect([dep]) викликається одразу
    },  [count])


    const increment = () => {
        setCount((prevState) => prevState + 1);
        setCount((prevState) => prevState + 1);
    }
    return (
        <>
            <div>
                <span>Hello, I am first react component!</span>
                <div>
                    {count} {smile}
                </div>
            </div>
            <button onClick={increment}>Increment</button>
        </>
    )
}

//Хуки не можна викликати в умовах (if, switch) чи циклах всередині (for, while)
