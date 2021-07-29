import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
    trace: true, 
    traceLimit: 25 
}); 

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);


/**********REMOVED THIS LOGIC TO ONLY LOADME, LOGIN AND SIGNUP****************/
//CURRENTLY, EVERYTIME IF BROWSER REFRESHES STORE IS CLEARED
//SO USER IN LOCALSTORAGE BECOMES NULL AND AUTO AUTH_ERROR

//every time an action is dispatched run this function
//so when login/signup, actions are dispatched and saveUser runs
// store.subscribe(throttle(() => {
//     console.log("subscription activated");
//     console.log(store.getState());
//     saveUser(store.getState().auth.user);
// }, 1000));

export default store;