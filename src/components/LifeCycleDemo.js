import React from 'react';

class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }

        console.log('constructor')
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps');
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    render() {
        console.log('render');
        return (
            <>
                <span>Count: {this.state.count}</span>
                <button onClick={() => {
                    this.setState({ count: this.state.count + 1 })
                }}>+</button>
            </>

        )
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
        return 'info';
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`componentDidUpdate (${snapshot})`);
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
}

export default LifeCycleDemo;