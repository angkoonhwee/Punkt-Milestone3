import axios from "axios";
import { url } from "./utils/constants";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post(url + "/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
  }
};

export const signUpCall = async (userCredential, dispatch) => {
  dispatch({ type: "SIGNUP_START" });

  try {
    const res = await axios.post(url + "/auth/signup", userCredential);
    dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data.message });
  }
};

export const googleLoginCall = async (dispatch) => {
  try {
    window.open(`http://localhost:8000/auth/google`, "_self");
    const res = await axios.get(url + "/auth/google/punkt");
    console.log(res.data);
    dispatch({ type: "GOOGLE_LOGIN", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: "Google Login Failed." });
  }
};

export const logoutCall = async (dispatch) => {
  try {
    await axios.get(url + "/auth/logout");
    dispatch({ type: "LOGOUT" });
  } catch (err) {
    console.log(err);
  }
};
