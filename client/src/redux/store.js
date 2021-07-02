import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./setTodoSlice";
import dailysReducer from "./dailysSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    dailys: dailysReducer,
  },
});
