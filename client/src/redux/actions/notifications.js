import {
    REQ_NOTIF,
    COMMENT_NOTIF,
    ACCEPT_REQ,
    REJECT_REQ,
    NOTIF_ERROR
} from "./types";
import { url } from "../../utils/constants";
import axios from "axios";

export const fetchCommentNotif = userId => async dispatch => {
    try {
        const res = await axios.get(url + "/comment/user/" + userId);
        res.data
            .sort((c1, c2) => new Date(c2.createdAt))
            .slice(0, 15);
        dispatch({
            type: COMMENT_NOTIF,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: NOTIF_ERROR
        });
    }
}

export const fetchReqNotif = userId => async dispatch => {
    try {
        const res = await axios.get(url + `/request/${userId}/notifications`);
        dispatch({
            type: REQ_NOTIF,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: NOTIF_ERROR
        });
    }
}

export const acceptRequest = requestId => async dispatch => {
    try {
        const res = await axios.post(url + `/request/${requestId}/accept`);
        console.log(res.data);
        dispatch({
            type: ACCEPT_REQ,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: NOTIF_ERROR
        });
    }
}

export const rejectRequest = requestId => async dispatch => {
    try {
        const res = await axios.put(url + `/request/${requestId}/reject`);
        console.log(res.data);
        dispatch({
            type: REJECT_REQ,
            payload: requestId
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: NOTIF_ERROR
        });
    }
};