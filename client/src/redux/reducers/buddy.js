import {
    GET_BUDDY,
    BUDDY_ERROR,
    FETCH_BUDDYUSER,
    GET_DAILYS,
    ADD_TODOS,
    TOGGLE_DAILYS,
    DELETE_TODOS,
    GET_CHAT,
    MESSAGE_SENT,
    GET_BUDDY_HISTORY
} from "../actions/types";

const initialState = {
    object: {},
    buddy: {},
    dailys: {
        user: [],
        buddy: []
    },
    chat: [],
    history: null
};

const buddy = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_BUDDY:
            const tempDailys = state.dailys;
            return {
                ...state,
                object: payload,
                dailys: {
                    ...tempDailys,
                    user: [...payload.dailys]
                }
            };
        case FETCH_BUDDYUSER:
            return {
                ...state,
                buddy: payload
            }
        case GET_DAILYS:
            const result = { ...state };
            result.dailys = payload;
            return result;
        case TOGGLE_DAILYS:
            const toggle = { ...state };
            toggle.dailys.user = payload;
            return toggle;
        case ADD_TODOS:
        case DELETE_TODOS:
            const todosA = { ...state };
            todosA.object.todos = [...payload];
            return todosA;
        case GET_CHAT:
            return {
                ...state,
                chat: payload
            }
        case MESSAGE_SENT:
            const newChat = [...state.chat];
            newChat.push(payload);
            return {
                ...state,
                chat: newChat
            };
        case GET_BUDDY_HISTORY:
            return {
                ...state,
                history: payload
            }
        case BUDDY_ERROR:
        default:
            return state;
    };
};

export default buddy;
