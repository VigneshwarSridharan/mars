import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducer';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware();
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware()
    }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));