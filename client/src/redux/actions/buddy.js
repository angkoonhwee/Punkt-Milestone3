import {
    GET_BUDDY,
    FETCH_BUDDYUSER,
    GET_DAILYS,
    ADD_TODOS,
    DELETE_TODOS,
    BUDDY_ERROR,
    TOGGLE_DAILYS,
    GET_CHAT,
    GET_BUDDY_HISTORY,
    MESSAGE_SENT
} from "./types";
import { url } from "../../utils/constants";
import axios from "axios";
import { loadUser } from "../../utils/localStorage";

export const fetchBuddy = buddyId => async dispatch => {
    try {
        const res = await axios.get(url + `/buddy/${buddyId}`);
        //console.log(res.data);

        dispatch({
            type: GET_BUDDY,
            payload: res.data
        });
    } catch (err) { 
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
}

export const fetchBuddyUser = userId => async dispatch => {
    try {
        const res = await axios.get(url + `/user?userId=${userId}`);
        const user = {};
        user.username = res.data.username;
        user._id = res.data._id;
        user.profilePicture = res.data.profilePicture;
        user.dailys = [];
        user.todos = [];
        dispatch({
            type: FETCH_BUDDYUSER,
            payload: user
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
}

export const fetchDailys = () => async dispatch => {
    const user = loadUser();
    try {
        const res = await axios.get(url + `/buddy/${user._id}/dailys`);
        dispatch({
            type: GET_DAILYS,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
};

export const toggleDailys = dailys => async dispatch => {
    const user = loadUser();
    const body = {
        userId: user._id,
        state: dailys.status
    }
    try {
        const res = await axios.put(url + `/buddy/${dailys._id}/dailys`, body);
        //console.log(res.data);
        dispatch({
            type: TOGGLE_DAILYS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
};

export const addTodos = task => async dispatch => {
    const user = loadUser();
    try {
        const body = {
            userId: user._id,
            task: task
        };
        const res = await axios.post(url + "/buddy/todos/add", body);
        //console.log(res.data);

        dispatch({
            type: ADD_TODOS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
};

export const deleteTodos = todoId => async dispatch => {
    const user = loadUser();
    try {
        const body = {data: { userId: user._id }}
        //console.log(body);
        const res = await axios.delete(url + `/buddy/${todoId}/delete`, body);
            
        dispatch({
            type: DELETE_TODOS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
}

export const fetchChat = chatId => async dispatch => {
    try {
        const res = await axios.get(url + `/chat/${chatId}`);
        //console.log(res.data);
        dispatch({
            type: GET_CHAT,
            payload: res.data.messages
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
};

export const messageSent = message => {
    return {
        type: MESSAGE_SENT,
        payload: message
    };
}

export const fetchBuddyHistory = () => async dispatch => {
    const user = loadUser();
    try {
        const res = await axios.get(url + `/buddy/${user._id}/buddyHistory`);
        res.data.sort(
            (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        );
        dispatch({
            type: GET_BUDDY_HISTORY,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDDY_ERROR
        });
    }
}

