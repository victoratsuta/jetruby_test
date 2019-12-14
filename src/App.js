import React, {Component} from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            log: [],
            callStack: []
        };
        this.execute = false;
        this.timer = null;

    }

    onButtonClick = (number) => {

        const clickTime = new Date();

        const callback = (next = () => {
        }) => {

            const min = 1000;
            const max = 10000;
            const time = min + Math.random() * (max - min);

            this.timer = setTimeout(() => {

                const log = new Date() + `: Нажата кнопка ${number}, задержка ${time / 1000}s, время нажатия ${clickTime}`;

                this.setState((state) => (
                    {
                        log: [...state.log, log]
                    }
                ), next)

            }, time)
        };

        this.setState((state) => ({callStack: [...state.callStack, callback]}), () => !this.execute && this.executeCallStack())

    };

    executeCallStack = () => {

        if (this.state.callStack.length) {

            this.execute = true;
            const callback = this.state.callStack[0];

            this.setState((state) => (
                {
                    callStack: state.callStack.slice(1)
                }
            ), callback(this.executeCallStack))
        }

        if (!this.state.callStack.length) {
            this.execute = false;
        }
    };

    clear = () => {
        this.setState(() => (
            {
                log: [],
                callStack: []
            }
        ));
        this.execute = false;
        clearTimeout(this.timer)
    };

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {

        return (
            <div className="container">
                <div className="wrapper">
                    <div className="buttons">
                        <button key="1" onClick={() => this.onButtonClick(1)}>Button 1</button>
                        <button key="2" onClick={() => this.onButtonClick(2)}>Button 2</button>
                        <button key="3" onClick={() => this.onButtonClick(3)}>Button 3</button>
                    </div>
                    <div className="logs">
                        {this.state.log.map((item, index) => <p key={index}>{item}</p>)}
                    </div>
                    <div className="footer">
                        <button onClick={this.clear}>Reset</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
