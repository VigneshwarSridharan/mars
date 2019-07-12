import { UPDATE_INFO, UPDATE_QUOTE } from "./constants";

const defaultState = {
    metaData: {},
    timeSeries: {},
    lastQuote: {}
};

export default (state = defaultState, { type, payload, ...action }) => {
    switch (type) {
        case UPDATE_INFO:
            return {
                ...payload
            }
        case UPDATE_QUOTE:
            return {
                ...state,
                lastQuote: {
                    ...payload
                }
            }
        default:
            return state;
    }
};