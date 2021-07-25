import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOAD_USER,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT,
    UPDATE_PROFILE,
    AUTH_ERROR,
    UPDATE_AFTER_GOAL_SUBMIT
} from "./types";
import axios from "axios";
import { url } from "../../utils/constants";
import { loadUser, saveUser } from "../../utils/localStorage";

//essentially localStorage is updated everytime authentication is successful
//and when loadMe is called to update the user in localStorage to the most recent version
export const signup = userCredential => async dispatch => {

    try {
        const res = await axios.post(url + "/auth/signup", userCredential);
        console.log(res);
        saveUser(res.data);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        // console.log(err);
        // console.log(err.response);
        saveUser(null);
        dispatch({
            type: SIGNUP_FAILURE,
            payload: err.response.data.message
        })
    }
};

export const login = userCredential => async dispatch => {
    try {
        const res = await axios.post(url + "/auth/login", userCredential);
        saveUser(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        // console.log(err);
        // console.log(err.response);
        saveUser(null);
        dispatch({
            type: LOGIN_FAILURE,
            payload: err.response.data.message
        })
    }
}

export const loadMe = () => async dispatch => {
    try {
        const currUser = loadUser();

        const res = await axios.get(url + `/user?username=${currUser.username}`);

        saveUser(res.data);
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (err) {
        console.log("from loadMe auth error");
        saveUser(null);
        dispatch({
            type: AUTH_ERROR,
            payload: err.message
        });
    }
}

export const updateProfile = body => async dispatch => {
    try {
        const currUser = loadUser();
        const res = await axios.put(url + "/user/" + currUser._id, body);
        saveUser(res.data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log("from updateProfile auth error");
        dispatch({
            type: AUTH_ERROR,
            payload: err.message
        });
    }
}

export const signupStart = () => {
    return {
        type: SIGNUP_START
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: LOGOUT
    }
}

export const updateAfterGoalSubmit = (goalId) => {
    return {
        type: UPDATE_AFTER_GOAL_SUBMIT,
        payload: goalId,
    }
}