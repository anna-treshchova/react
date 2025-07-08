import React from 'react';

class FirstComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        }

        console.log(this.props)
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
               <button onClick={this.increment}>Increment</button>
           </>
       )
   }
}

export default FirstComponent;


// props — це об'єкт, який наш компонент отримує (успадковує) від React.Component. Його властивостями є атрибути, які
// ми передаємо компоненту