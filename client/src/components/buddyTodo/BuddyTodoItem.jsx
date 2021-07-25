import React from "react";
import { Edit, Delete } from "@material-ui/icons";
import "./buddyTodoItem.css";

//redux
import { connect } from "react-redux";
import { deleteTodos } from "../../redux/actions/buddy";

function BuddyTodoItem({ item, deleteTodos }) {

  function onDelete() {
    deleteTodos(item._id);
  };

  return (
    <div className="buddy-todo-item">
      <div className="edit-todo-item">
        <Edit style={{ color: "#1f788a" }} />
        <h6>
          {item.task}
        </h6>
      </div>
      <Delete
        onClick={onDelete}
        style={{
          width: "8%",
          alignContent: "center",
          cursor: "pointer",
          color: "rgb(214, 73, 73)",
        }}
      />
    </div>
  );
};

export default connect(null, { deleteTodos })(BuddyTodoItem);
