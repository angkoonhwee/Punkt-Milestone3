import {
    LOAD_USER_POSTS,
    LOAD_MY_POSTS,
    LOAD_ALL_POSTS,
    LOAD_SPECULATING_POSTS,
    CREATE_POST,
    DELETE_POSTS,
    POSTS_ERROR,
    LOAD_GOAL_POSTS,
    LIKE_POST
} from '../actions/types';
import { mapValues } from 'lodash';

const initialState = {
    main: null,
    explore: null,
    user: null,
    speculate: null,
    goals: null
};

const posts = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_ALL_POSTS:
            return {
                ...state,
                explore: payload
            }
        case LOAD_MY_POSTS:
            return {
                ...state,
                main: payload
            }
        case LOAD_USER_POSTS:
            return {
                ...state,
                user: payload
            }
        case LOAD_SPECULATING_POSTS:
            return {
                ...state,
                speculate: payload
            }
        case LOAD_GOAL_POSTS:
            return {
                ...state,
                goals: payload

            }
        case CREATE_POST:
            const newGoals = state.goals ? [...state.goals, payload] : [payload];

            newGoals.sort(
                (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
            );

            newGoals.map(g => {
                g.goal.postIds = payload.goal.postIds;
                
                if (g.goal.postIds.length === g.goal.numDays) {
                    g.goal.status = "Success"
                }
            });

            return {
                ...state,
                goals: newGoals
            }
        case DELETE_POSTS:
            const allPosts = { ...state };
            const finalPosts = mapValues(allPosts, (posts) => {
                let temp = posts && posts.filter(p => {
                    return p._id !== payload
                });
                temp = temp && temp.map(e => {
                    const x = e.goal.postIds.filter(p => p !== payload);
                    //console.log(x);
                    e.goal.postIds = x;
                    return e;
                });
                return temp;
            });
            //console.log(finalPosts === state);
            return finalPosts;
        case LIKE_POST:
            return { ...state };
        case POSTS_ERROR:
        default:
            return state;
    }
}

export default posts;