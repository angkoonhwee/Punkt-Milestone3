import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import posts from "./posts";
import goals from "./goals";
import comments from "./comments";
import buddy from "./buddy";

const rootReducer = combineReducers({
    auth,
    user,
    posts,
    goals,
    comments,
    buddy
});

export default rootReducer;