import {
    SEND_REQ,
    FETCH_REQ,
    DELETE_REQ,
    REQ_ERROR
} from "../actions/types";

const initialState = {
    //for requests that current user requested
    request: null,
}

const request = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case FETCH_REQ:
        case SEND_REQ:
            return {
                ...state,
                request: payload
            }
        case DELETE_REQ:
            return {
                ...state,
                request: null
            }
        case REQ_ERROR:
        default:
            return {...state}
    }
};

export default request;