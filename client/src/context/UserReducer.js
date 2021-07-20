const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "SIGNUP_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "SIGNUP_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "SIGNUP_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    case "GOOGLE_LOGIN":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };

    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };

    default:
      return false;
  }
};

export default userReducer;
