import { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  user:
    localStorage.getItem("user") === "undefined" ||
    localStorage.getItem("user") === false
      ? null
      : JSON.parse(localStorage.getItem("user")),

  isFetching: false,
  error: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
