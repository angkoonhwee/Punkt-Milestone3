import {
    REQ_NOTIF,
    COMMENT_NOTIF,
    ACCEPT_REQ,
    REJECT_REQ,
    NOTIF_ERROR
} from "../actions/types"

const initialState = {
    requests: null,
    comments: null
};

const notifications = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case COMMENT_NOTIF:
            return {
                ...state,
                comments: payload
            }
        case REQ_NOTIF:
            return {
                ...state,
                requests: payload
            }
        case ACCEPT_REQ:
            return {
                ...state,
                requests: []
            }
        case REJECT_REQ:
            let temp = [...state.requests];
            temp = temp.filter(t => t !== payload);
            return {
                ...state,
                requests: temp
            }
        case NOTIF_ERROR:
        default:
            return state;
    }
}

export default notifications;