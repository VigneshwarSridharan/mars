import { TOGGLE_PROCESSING, UPDATE_SYMBOLS } from "./constants";

const defaultState = {
    processing: false,
    symbols: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_PROCESSING:
            return {
                ...state,
                processing: action.payload
            }
        case UPDATE_SYMBOLS:
            return {
                ...state,
                symbols: action.payload
            }
        default:
            return state;
    }
};