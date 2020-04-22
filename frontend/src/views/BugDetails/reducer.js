import { SET_BUG_DETAILS, RESET_BUG_DETAILS } from "./constants";

const defaultState = {
    bugDetails: {}
};

const resetState = JSON.stringify(defaultState);

export default (state = defaultState, { type, payload, ...action }) => {
    switch (type) {

        case SET_BUG_DETAILS:
            return {
                ...state,
                bugDetails: payload
            }

        case RESET_BUG_DETAILS:
            return {
                ...JSON.parse(resetState)
            }

        default:
            return state;
    }
};