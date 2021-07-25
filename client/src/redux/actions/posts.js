import {
    LOAD_ALL_POSTS,
    LOAD_MY_POSTS,
    LOAD_USER_POSTS,
    LOAD_SPECULATING_POSTS,
    LOAD_GOAL_POSTS,
    CREATE_POST,
    DELETE_POSTS,
    POSTS_ERROR,
    LIKE_POST,
    UPDATE_GOAL_AFTER_DELETE,
    UPDATE_GOAL_AFTER_CREATE
} from "./types";
import axios from "axios";
import { url } from "../../utils/constants";
import { loadUser } from "../../utils/localStorage";

//for profile page, fetch specific user's posts
export const fetchUserPosts = username => async dispatch => {
    try {
        const res = await axios.get(url + '/post/profile/' + username);
        res.data.sort(
            (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        );
        await Promise.all(
            res.data.map(async post => {
                const username = post.username;
                const user = await axios.get(url + `/user?username=${username}`);
                post.user = {};
                post.user.username = user.data.username;
                post.user.profilePicture = user.data.profilePicture;

                //bundle goal
                const goal = await axios.get(url + "/goal/" + post.goalId);
                post.goal = {
                    _id: goal.data._id,
                    status: goal.data.status,
                    title: goal.data.title,
                    numDays: goal.data.numDays,
                    usersBetAgainst: goal.data.usersBetAgainst,
                    atonement: goal.data.atonement,
                    postIds: goal.data.postIds,
                    madeAtonement: goal.data.madeAtonement,
                };
            })
        )
        dispatch({
            type: LOAD_USER_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POSTS_ERROR
        });
    }
}

//for render user's main page posts
export const fetchMyPosts = () => async dispatch => {
    try {
        const currUser = loadUser();
        const res = await axios.get(url + '/post/main/' + currUser._id);
        await Promise.all(
            res.data.map(async post => {
                const username = post.username;
                const user = await axios.get(url + `/user?username=${username}`);
                post.user = {};
                post.user.username = user.data.username;
                post.user.profilePicture = user.data.profilePicture;

                //bundle goal
                const goal = await axios.get(url + "/goal/" + post.goalId);
                post.goal = {
                    _id: goal.data._id,
                    status: goal.data.status,
                    title: goal.data.title,
                    numDays: goal.data.numDays,
                    usersBetAgainst: goal.data.usersBetAgainst,
                    atonement: goal.data.atonement,
                    postIds: goal.data.postIds,
                    madeAtonement: goal.data.madeAtonement,
                };
            })
        )
        dispatch({
            type: LOAD_MY_POSTS,
            payload: res.data.sort(
                (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
            )
        });
    } catch (error) {
        dispatch({
            type: POSTS_ERROR
        });
    }
}



//for render all user's post in explore page
export const fetchAllPosts = () => async dispatch => {
    try {
        const res = await axios.get(url + '/post');
        await Promise.all(
            res.data.map(async post => {
                //bundle user
                const username = post.username;
                const user = await axios.get(url + `/user?username=${username}`);
                post.user = {};
                post.user.username = user.data.username;
                post.user.profilePicture = user.data.profilePicture;

                //bundle goal
                const goal = await axios.get(url + "/goal/" + post.goalId);
                post.goal = {
                    _id: goal.data._id,
                    status: goal.data.status,
                    title: goal.data.title,
                    numDays: goal.data.numDays,
                    usersBetAgainst: goal.data.usersBetAgainst,
                    atonement: goal.data.atonement,
                    postIds: goal.data.postIds,
                    madeAtonement: goal.data.madeAtonement,
                };
                //console.log(post);
            })
        )
        dispatch({
            type: LOAD_ALL_POSTS,
            payload: res.data.sort(
                (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
            )
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: POSTS_ERROR
        });
    }
}

//for speculating pages
export const fetchSpeculatingPosts = () => async dispatch => {
    const user = loadUser();
    try {
        const res = await axios.get(url + "/post/speculate/" + user._id);
        await Promise.all(
            res.data.map(async post => {
                const username = post.username;
                const user = await axios.get(url + `/user?username=${username}`);
                post.user = {};
                post.user.username = user.data.username;
                post.user.profilePicture = user.data.profilePicture;

                //bundle goal
                const goal = await axios.get(url + "/goal/" + post.goalId);
                post.goal = {
                    _id: goal.data._id,
                    status: goal.data.status,
                    title: goal.data.title,
                    numDays: goal.data.numDays,
                    usersBetAgainst: goal.data.usersBetAgainst,
                    atonement: goal.data.atonement,
                    postIds: goal.data.postIds,
                    madeAtonement: goal.data.madeAtonement,
                };
            })
        )
        dispatch({
            type: LOAD_SPECULATING_POSTS,
            payload: res.data.sort(
                (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
            )
        });
    } catch (error) {
        dispatch({
            type: POSTS_ERROR
        });
    }
}

//fetch posts for that specific goal
export const fetchGoalPosts = goalId => async dispatch => {
    try {
        const res = await axios.get(url + "/post/goal/" + goalId);
        await Promise.all(
            res.data.map(async post => {
                const username = post.username;
                const user = await axios.get(url + `/user?username=${username}`);
                post.user = {};
                post.user.username = user.data.username;
                post.user.profilePicture = user.data.profilePicture;

                //bundle goal
                const goal = await axios.get(url + "/goal/" + post.goalId);
                post.goal = {
                    _id: goal.data._id,
                    status: goal.data.status,
                    title: goal.data.title,
                    numDays: goal.data.numDays,
                    usersBetAgainst: goal.data.usersBetAgainst,
                    atonement: goal.data.atonement,
                    postIds: goal.data.postIds,
                    madeAtonement: goal.data.madeAtonement,
                };
            })
        )
        res.data.sort(
            (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        );
        dispatch({
            type: LOAD_GOAL_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR
        });
    }
}

//create new post
//can only created in Progress page by currUser only
//so as for state change just add to goal posts
export const createPost = post => async dispatch => {
    try {
        const res = await axios.post(url + "/post", post);
        //console.log(res.data);
        const username = res.data.username;
        const user = await axios.get(url + `/user?username=${username}`);
        res.data.user = {};
        res.data.user.username = user.data.username;
        res.data.user.profilePicture = user.data.profilePicture;

        //bundle goal
        const goal = await axios.get(url + "/goal/" + post.goalId);
        res.data.goal = {
            _id: goal.data._id,
            status: goal.data.status,
            title: goal.data.title,
            numDays: goal.data.numDays,
            usersBetAgainst: goal.data.usersBetAgainst,
            atonement: goal.data.atonement,
            postIds: goal.data.postIds,
            madeAtonement: goal.data.madeAtonement,
        };

        dispatch({
            type: CREATE_POST,
            payload: res.data
        });
        dispatch({
            type: UPDATE_GOAL_AFTER_CREATE,
            payload: res.data._id
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: POSTS_ERROR
        });
    }
}

//delete post
export const deletePost = (postId, body) => async dispatch => {
    try {
        await axios.delete(url + "/post/" + postId, body);
        dispatch({
            type: DELETE_POSTS,
            payload: postId
        });
        dispatch({
            type: UPDATE_GOAL_AFTER_DELETE,
            payload: postId
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: POSTS_ERROR
        });
    }
}

//like post
export const likePost = (postId, body) => async dispatch => {
    try {
        await axios.put(url + "/post/" + postId + "/like", body);
        dispatch({
            type: LIKE_POST
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR
        });
    }
}