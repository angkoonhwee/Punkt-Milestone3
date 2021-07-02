export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const SignUpStart = (userCredentials) => ({
  type: "SIGNUP_START",
});

export const SignUpSuccess = (user) => ({
  type: "SIGNUP_SUCCESS",
  payload: user,
});

export const SignUpFailure = (error) => ({
  type: "SIGNUP_FAILURE",
  payload: error,
});

export const GoogleLogin = (user) => ({
  type: "GOOGLE_LOGIN",
  payload: user,
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});
