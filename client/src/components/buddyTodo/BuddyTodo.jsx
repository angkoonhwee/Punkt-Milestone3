import React from "react";
import "./buddyTodo.css";
import BuddyTodoList from "./BuddyTodoList";

export default function BuddyTodo() {
  return (
    <div className="container-buddy-todo">
      <div className="buddy-todo-title">
        <h2>Set Your Todos for Tomorrow!</h2>
      </div>
      <div className="buddy-todo-content">
        <BuddyTodoList />
      </div>
    </div>
  );
}
