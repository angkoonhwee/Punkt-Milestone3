import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOAD_USER,
    LOGOUT,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    AUTH_ERROR,
    UPDATE_PROFILE,
    UPDATE_AFTER_GOAL_SUBMIT,
    UPDATE_AFTER_DELETE_REQ,
    UPDATE_AFTER_SEND_REQ
} from "../actions/types";
import { loadUser } from "../../utils/localStorage";

const initialState = {
    user: loadUser(),
    isAuthenticated: false,
    isFetching: false,
    error: false,
    errorLogin: false,
    errorSignup: false
};

const auth = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetching: true,
                error: false,
                errorLogin: false,
                errorSignup: false
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case UPDATE_PROFILE:
        case LOAD_USER:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                isFetching: false,
                error: false,
                errorLogin: false,
                errorSignup: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetching: false,
                error: false,
                errorLogin: payload,
                errorSignup: false
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetching: false,
                error: false,
                errorLogin: false,
                errorSignup: payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetching: false,
                error: payload,
                errorLogin: false,
                errorSignup: false
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetching: false,
                error: false,
                errorLogin: false,
                errorSignup: false
            }

        case UPDATE_AFTER_GOAL_SUBMIT:
            const updatedUser = {
                ...state.user,
                goalId: payload
            }

            return {
                ...state,
                user: updatedUser
            }
        case UPDATE_AFTER_DELETE_REQ:
        case UPDATE_AFTER_SEND_REQ:
            const updatedReq = {
                ...state.user,
                request: payload
            }
            return {
                ...state,
                user: updatedReq
            }
        default:
            return state;
    }
}

export default auth;