import React from "react";
import { TextareaAutosize, Fab } from "@material-ui/core";
import "./buddyTodoInput.css";
import AddIcon from "@material-ui/icons/Add";

export default function BuddyTodoInput() {
  return (
    <div className="buddy-todo-input">
      <form className="add-todo-form">
        <input
          name="buddyTodo"
          // value={comment}
          autoComplete="off"
          placeholder="What do you want to do tomorrow?"
          // onChange={handleChange}
          // ref={comm}
        />

        <button className="add-todo-btn">
          <AddIcon style={{ color: "white" }} />
        </button>
      </form>
    </div>
  );
}
