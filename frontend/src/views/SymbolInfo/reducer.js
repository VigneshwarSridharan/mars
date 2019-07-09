import { UPDATE_INFO } from "./constants";

const defaultState = {
    metaData: {},
    timeSeries: {},
    lastQuote: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_INFO:
            return {
                ...action.payload
            }
        default:
            return state;
    }
};