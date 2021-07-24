import {
    GET_USER,
    LOAD_ERROR,
    GET_ALL_USER
} from "./types";
import axios from "axios";
import { url } from "../../utils/constants";

export const fetchUser = username => async dispatch => {
    try {
        const res = await axios.get(url + `/user?username=${username}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOAD_ERROR
        });
    }
}

export const fetchUserById = userId => async dispatch => {
    try {
        const res = await axios.get(url + `/user?userId=${userId}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOAD_ERROR
        });
    }
}

export const fetchAllUser = () => async dispatch => {
    try {
        const res = await axios.get(url + "/user/all");
        dispatch({
            type: GET_ALL_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOAD_ERROR
        });
    }
}