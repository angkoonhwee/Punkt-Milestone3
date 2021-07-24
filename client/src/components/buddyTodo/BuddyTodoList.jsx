import React from "react";
import "./buddyTodoList.css";
import BuddyTodoItem from "./BuddyTodoItem";
import BuddyTodoInput from "./BuddyTodoInput";

//redux
import { connect } from "react-redux";

function BuddyTodoList({ todos }) {
  if (!todos) {
    return <h1>LOADING...</h1>
  }
  return (
    <div className="buddy-todo-list">
      {todos.map(t => (
        <BuddyTodoItem key={t._id} item={t} />
      ))}
      <BuddyTodoInput />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    todos: state.buddy.object.todos
  };
};

export default connect(mapStateToProps)(BuddyTodoList);
