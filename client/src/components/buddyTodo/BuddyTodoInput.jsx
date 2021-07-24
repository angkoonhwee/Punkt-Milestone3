import React, { useState } from "react";
import "./buddyTodoInput.css";
import AddIcon from "@material-ui/icons/Add";

//redux
import { connect } from "react-redux";
import { addTodos } from "../../redux/actions/buddy";

function BuddyTodoInput({ addTodos }) {
  const [task, setTask] = useState("");

  function submitTodo(e) {
    e.preventDefault();
    addTodos(task);
    setTask("");
  };

  return (
    <div className="buddy-todo-input">
      <form className="add-todo-form" onSubmit={submitTodo}>
        <input
          name="buddyTodo"
          value={task}
          autoComplete="off"
          placeholder="What do you want to do tomorrow?"
          onChange={e => setTask(e.target.value)}
        />

        <button type="submit" className="add-todo-btn">
          <AddIcon style={{ color: "white" }} />
        </button>
      </form>
    </div>
  );
};

export default connect(null, { addTodos })(BuddyTodoInput);
