import {
    LOAD_COMMENT,
    CREATE_COMMENT,
    COMMENT_ERROR
} from "../actions/types";

const initialState = [];

//payload from action creator has a structure of
// { comments: Array, postId: String }
//initialState posts object would have a resulting object like this:
/**
 * [
 *  {
 *      comments:Array,
 *      postId: String
 *  }, ...
 * ]
 */
const comments = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case LOAD_COMMENT:
        case CREATE_COMMENT:
            const temp = [...state];
            //filter out the orginal set of comments in the post
            let result = temp.filter(x => x.postId !== payload.postId);
            result.push(payload);
            return result;
        case COMMENT_ERROR:
        default:
            return [...state];
    }
}

export default comments;