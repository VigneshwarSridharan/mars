import React from 'react';

const { Provider, Consumer } = React.createContext();

class ReportsProvider extends React.Component {
    state = {
        processing: false,
        symbols: []
    }
    render() {
        let { processing, symbols } = this.state;
        let { children } = this.props;
        return (
            <Provider value={{
                processing,
                symbols,
                toggleProcess: (processing = false) => this.setState({ processing }),
                updateSymbols: (symbols = []) => this.setState({ symbols }),
                // setState: (newState = {}, callback = () => { }) => this.setState({
                //     ...state,
                //     ...newState
                // }, callback)
            }}>
                {children}
            </Provider>
        )
    }
}

export {
    Consumer,
    ReportsProvider
}
