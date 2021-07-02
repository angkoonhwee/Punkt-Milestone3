import React from "react";
import { Edit, Delete } from "@material-ui/icons";
import "./buddyTodoItem.css";

export default function BuddyTodoItem() {
  return (
    <div className="buddy-todo-item">
      <div className="edit-todo-item">
        <Edit style={{ cursor: "pointer", color: "#1f788a" }} />
        <h6>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </h6>
      </div>
      <Delete
        style={{
          width: "8%",
          alignContent: "center",
          cursor: "pointer",
          color: "rgb(214, 73, 73)",
        }}
      />
    </div>
  );
}
