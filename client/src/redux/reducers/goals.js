import { isUndefined } from "lodash";
import {
    LOAD_GOALS,
    GOALS_ERROR,
    SUBMIT_GOALS,
    GOAL_STATUS,
    GET_BET,
    GET_BETAGAINST,
    CREATE_BET,
    GET_ALL_GOALS,
    UPDATE_GOAL_AFTER_DELETE,
    UPDATE_GOAL_AFTER_CREATE
} from "../actions/types";

import { isUndefined } from "lodash";

const initialState = {
    goals: {},
    betAgainst: [],
    userBets: [],
    userGoals: []
};

const goals = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_GOALS:
        case SUBMIT_GOALS:
        case GOAL_STATUS:
            return {
                ...state,
                goals: payload
            }
        case GET_ALL_GOALS:
            return {
                ...state,
                userGoals: payload
            }
        case GOALS_ERROR:
            return {
                ...state,
                goals: {}
            }
        case GET_BETAGAINST:
            return {
                ...state,
                betAgainst: payload
            }
        case GET_BET:
            return {
                ...state,
                userBets: payload
            }
        case CREATE_BET:
            return {...state};
        case UPDATE_GOAL_AFTER_DELETE:
            const updatedDelete = {...state};
            const temp = updatedDelete.goals.postIds.filter(p => p !== payload);
            updatedDelete.goals.postIds = [...temp];
            return updatedDelete;
        case UPDATE_GOAL_AFTER_CREATE:
            const updatedCreate = {...state};
            if (!isUndefined(updatedCreate.goals.postIds)) {
                updatedCreate.goals.postIds.push(payload);
                updatedCreate.goals.postIds = [...updatedCreate.goals.postIds];
                if (updatedCreate.goals.postIds.length === updatedCreate.goals.numDays) {
                    updatedCreate.goals.status = "Success"
                }
            }

            return updatedCreate;
        default:
            return {...state};
    }
}

export default goals;