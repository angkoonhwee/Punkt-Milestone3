import {
    LOAD_COMMENT,
    CREATE_COMMENT,
    COMMENT_ERROR
} from "./types";
import axios from "axios";
import { url } from "../../utils/constants";

export const fetchComments = postId => async dispatch => {
    try {
        const res = await axios.get(url + "/comment/post/" + postId);
        await Promise.all(
            res.data.map(async comm => {
                const userId = comm.userId;
                const user = await axios.get(url +  `/user?userId=${userId}`);
                comm.user = {};
                comm.user.username = user.data.username;
                comm.user.profilePicture = user.data.profilePicture;
                //console.log(comm);
            })
        )
        const data = {postId: postId};
        //console.log(res.data);
        if (res.data !== 0) {
            data.comments = res.data;
        }
        dispatch({
            type: LOAD_COMMENT,
            payload: data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: COMMENT_ERROR
        })
    }
}

export const createComment = (postId, body) => async dispatch => {
    try {
        await axios.post(url + "/comment", body);
        const res = await axios.get(url + "/comment/post/" + postId);
        await Promise.all(
            res.data.map(async comm => {
                const userId = comm.userId;
                const user = await axios.get(url +  `/user?userId=${userId}`);
                comm.user = {};
                comm.user.username = user.data.username;
                comm.user.profilePicture = user.data.profilePicture;
                //console.log(comm);
            })
        )
        const data = {postId: postId};
        if (res.data !== 0) {
            const temp = [...res.data]
            data.comments = temp;
        }
        //console.log(data);
        dispatch({
            type: CREATE_COMMENT,
            payload: data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: COMMENT_ERROR
        })
    }

}