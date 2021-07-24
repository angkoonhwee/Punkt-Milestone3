import {
    GET_ALL_USER,
    GET_USER,
    LOAD_ERROR
} from "../actions/types";

const initialState = {
    user: null,
    searchedUser: []
};

const user = (state = initialState, action) => {
    const {type, payload } = action;

    switch(type) {
        case GET_USER:
            return {
                ...state,
                user: payload
            };
        case GET_ALL_USER:
            return {
                ...state,
                searchedUser: payload
            }
        case LOAD_ERROR:
            return {
                ...state,
                user: null,
                searchedUser: []
            };
        default:
            return state;
    }
};

export default user;