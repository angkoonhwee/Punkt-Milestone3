import React, { useState, useEffect } from "react";
import "./postNoteTodo.css";

import { connect } from "react-redux";
import { toggleDailys } from "../../redux/actions/buddy";

function TodoItem({ item, toggleDailys }) {
  const [isDone, setDone] = useState(item.status[0] === "completed");
  const [isLate, setLate] = useState(item.status[1] === "late")

  function handleCheck() {
    toggleDailys(item);
    setDone(!isDone);
  }

  function checkDailyStatus() {
    if (isLate) {
      if (isDone) {
        return "input-title red todo-done";
      } else {
        return "input-title red";
      }
    } else {
      if (isDone) {
        return "input-title todo-done";
      } else {
        return "input-title"
      }
    }
  }

  return (
    <form className="delete-todo">
      <div className="checkbox-container">
        <label className={isLate ? "checkbox-label red" : "checkbox-label"}>
          <input
            type="checkbox"
            onChange={handleCheck}
            defaultChecked={isDone}
          />
          <span className={isLate ? "checkbox-custom red" : "checkbox-custom"} />
        </label>
        <div className={checkDailyStatus()}>
          {item.task}
        </div>

      </div>
    </form>
  );
};

export default connect(null, { toggleDailys })(TodoItem);
