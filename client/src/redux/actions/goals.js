import {
    GOALS_ERROR,
    GOAL_STATUS,
    LOAD_GOALS,
    SUBMIT_GOALS,
    GET_BETAGAINST,
    GET_BET,
    GET_ALL_GOALS,
    CREATE_BET
} from "./types";
import axios from "axios";
import { url } from "../../utils/constants";
import { loadUser } from "../../utils/localStorage";

export const fetchGoalById = goalId => async dispatch => {
    try {
        const res = await axios.get(url + "/goal/" + goalId);
        dispatch({
            type: LOAD_GOALS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GOALS_ERROR
        })
    }
}

export const fetchGoal = userId => async dispatch => {
    try {
        const res = await axios.get(url + "/goal/user/" + userId);
        console.log(res.data);
        dispatch({
            type: LOAD_GOALS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GOALS_ERROR
        });
    };
}

export const submitGoals = (newGoal) => async dispatch => {
    try {
        const res = await axios.post(url + "/goal", newGoal);
        //make this route return the updated user
        dispatch({
            type: SUBMIT_GOALS,
            payload: res.data
        });
        //loadMe();
    } catch (err) {
        console.log(err);
        dispatch({
            type: GOALS_ERROR
        });
    }
};

export const fetchBetAgainst = (goalId, userId) => async dispatch => {
    try {
        const res = await axios.get(
            url + "/goal/" + goalId + "/bet-against/" + userId
        );
        
        dispatch({
            type: GET_BETAGAINST,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GOALS_ERROR
        });
    }
}


export const fetchUserGoals = () => async dispatch => {
    const currUser = loadUser();
    const userId = currUser._id;
    try {
        const res = await axios.get(url + `/goal/user/${userId}/all`);
        res.data.sort(
            (g1, g2) => new Date(g2.createdAt) - new Date(g1.createdAt)
        );
        console.log(res.data);
        dispatch({
            type: GET_ALL_GOALS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GOALS_ERROR
        });
    }
}

//get list of all the bets logged in user has ever placed
export const fetchUserBets = () => async dispatch => {
    const currUser = loadUser();
    const userId = currUser._id;
    try {
        const res = await axios.get(url + `/goal/user/${userId}/bet`);
        res.data.sort(
            (g1, g2) => new Date(g2.createdAt) - new Date(g1.createdAt)
        );
        dispatch({
            type: GET_BET,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GOALS_ERROR
        });
    }
}


export const createBetAgainst = (goalId, body) => async dispatch => {
    try {
        //**why no use res data again to upload */
        const res = await axios.put(url + "/goal/" + goalId + "/bet-against", body);
        dispatch({
            type: CREATE_BET
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: GOALS_ERROR
        });
    }
}

export const updateStatus = goalId => async dispatch => {
    const user = loadUser();
    try {
        const res = await axios.put(url + "/goal/" + goalId + "/status", {
            userId: user._id,
            status: "Success",
        });
        dispatch({
            type: GOAL_STATUS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GOALS_ERROR
        });
    }
}