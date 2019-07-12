import { TOGGLE_CHATTING, UPDATE_USERS, SET_CHAT_TO, UPDATE_ACTIVE_USERS } from "./constants";

const defaultState = {
    isOpen: true,
    users: [],
    chatTo: {},
    active: {}
};

export default (state = defaultState, { type, payload, ...action }) => {
    switch (type) {
        case TOGGLE_CHATTING:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        case UPDATE_USERS:
            return {
                ...state,
                users: payload
            }
        case SET_CHAT_TO:
            return {
                ...state,
                chatTo: payload
            }
        case UPDATE_ACTIVE_USERS:
            return {
                ...state,
                active: payload
            }
        default:
            return state;
    }
};