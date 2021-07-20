import {
    GET_BUDDY,
    BUDDY_ERROR,
    FETCH_BUDDYUSER,
    GET_DAILYS,
    ADD_TODOS,
    TOGGLE_DAILYS,
    DELETE_TODOS
} from "../actions/types";

const initialState = {
    object: {},
    buddy: {},
    dailys: {
        user: [],
        buddy: []
    }
};

const buddy = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_BUDDY:
            return {
                ...state,
                object: payload
            };
        case FETCH_BUDDYUSER:
            return {
                ...state,
                buddy: payload
            }
        case GET_DAILYS:
            const result = {...state};
            result.dailys = payload;
            return result;
        case TOGGLE_DAILYS:
            const toggle = {...state};
            toggle.dailys.user = payload;
            return toggle;
        case ADD_TODOS:
        case DELETE_TODOS:
            const todosA = {...state};
            todosA.object.todos = payload;
            return todosA;
        case BUDDY_ERROR:
        default:
            return state;
    };
};

export default buddy;
