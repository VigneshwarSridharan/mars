import { TOGGLE_CHATTING, UPDATE_USERS, SET_CHAT_TO, UPDATE_ACTIVE_USERS, UPDATE_CONVERSATION, TOGGLE_TYPING } from "./constants";

const defaultState = {
    isOpen: true,
    users: [],
    chatTo: {},
    active: {},
    conversation: []
};

const getConversation = id => {
    let data = localStorage.getItem(`chat-for-${id}`) || '[]';
    return JSON.parse(data);
}
const setConversation = (id, message) => {
    let data = localStorage.getItem(`chat-for-${id}`) || '[]';
    data = JSON.parse(data);
    data = [message, ...data];
    localStorage.setItem(`chat-for-${id}`, JSON.stringify(data));
}

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
                chatTo: payload,
                conversation: getConversation(payload.user_id)
            }
        case TOGGLE_TYPING:
            return {
                ...state,
                chatTo: {
                    ...state.chatTo,
                    typing: payload
                },
            }
        case UPDATE_ACTIVE_USERS:
            return {
                ...state,
                active: payload
            }
        case UPDATE_CONVERSATION:
            setConversation(payload.user_id, payload)
            return {
                ...state,
                conversation: [payload, ...state.conversation]
            }
        default:
            return state;
    }
};