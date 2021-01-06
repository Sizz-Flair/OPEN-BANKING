import React, { Component } from 'react';


class CounterLifeCycle extends Component {
    state = {
        number: 0
    }

    constructor(props) {
        super(props); // super 부모 클래스 생성자를 가르킨다(React.Component), super(props) 선언전까지 this키워드를 사용 할 수 없다
        console.log('constructor');
    }

    componentWillMount() {
        console.log('componentWillMount(deprecated)');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        console.log('==========nextProps.number > '+nextProps.number);
        console.log('==========nextState.number > '+nextState.number);
        if (nextState.number % 5 === 0) return false;
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }
      
      componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
    }

    handleIncrease = () => {
    const { number } = this.state;
        this.setState({
            number: number + 1
        });
    }

    handleDecrease = () => {
        this.setState(
            ({ number }) => ({
            number: number - 1
            })
        );
    }
    render() {
        console.log('render');
        return (
          <div>
            <h1>카운터</h1>
            <div>값: {this.state.number}</div>
            <button onClick={this.handleIncrease}>+</button>
            <button onClick={this.handleDecrease}>-</button>
          </div>
        );
      }
}

export default CounterLifeCycle;