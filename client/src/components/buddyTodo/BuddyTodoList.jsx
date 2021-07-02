import React from "react";
import "./buddyTodoList.css";
import BuddyTodoItem from "./BuddyTodoItem";
import BuddyTodoInput from "./BuddyTodoInput";

export default function BuddyTodoList() {
  return (
    <div className="buddy-todo-list">
      <BuddyTodoItem />
      <BuddyTodoItem />
      <BuddyTodoItem />
      <BuddyTodoItem />

      <BuddyTodoInput />
    </div>
  );
}
