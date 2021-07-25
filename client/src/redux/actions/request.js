import {
    SEND_REQ,
    FETCH_REQ,
    DELETE_REQ,
    UPDATE_AFTER_DELETE_REQ,
    UPDATE_AFTER_SEND_REQ,
    REQ_ERROR,
} from "./types";
import { url } from "../../utils/constants";
import axios from "axios";
import { loadUser } from "../../utils/localStorage";


const user = loadUser();
console.log(user);

export const fetchRequest = requestId => async dispatch => {
    try {
        const res = await axios.get(url + `/request/${requestId}`);
        dispatch({
            type: FETCH_REQ,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: REQ_ERROR
        });
    }
};

export const makeRequest = (receiver) => async dispatch => {
    const body = {
        sender: user._id,
        receiver
    };
    console.log(body);
    try {
        const res = await axios.post(url + "/request/", body);
        dispatch({
            type: SEND_REQ,
            payload: res.data
        });
        dispatch({
            type: UPDATE_AFTER_SEND_REQ,
            payload: res.data._id
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: REQ_ERROR
        });
    }
};

export const deleteRequest = (requestId) => async dispatch => {
    try {
        const res = await axios.delete(url +`/request/${requestId}`);
        dispatch({
            type: DELETE_REQ,
        });
        dispatch({
            type: UPDATE_AFTER_DELETE_REQ,
            payload: null
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: REQ_ERROR
        });
    }
};

