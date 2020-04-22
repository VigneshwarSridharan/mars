import { UPDATE_BUG_LIST, ADD_BUG_ITEM } from './constants'

const defaultState = {
    bugList: []
};

export default (state = defaultState, { type, payload, ...action }) => {

    switch (type) {
        case UPDATE_BUG_LIST:
            return {
                ...state,
                bugList: payload
            }
        case ADD_BUG_ITEM:
            return {
                ...state,
                bugList: [payload, ...state.bugList]
            }
        default:
            return state
    }

}