import React, { useState, useEffect } from "react";
import "./postNoteTodo.css";

import { connect } from "react-redux";
import { toggleDailys } from "../../redux/actions/buddy";

function TodoItem({ item, toggleDailys }) {
  const [isDone, setDone] = useState(false);
  const [isLate, setLate] = useState(false)

  useEffect(() => {
    if (item.status[0] === "completed") {
      setDone(true);
    } else {
      setDone(false);
    }
  }, [isDone, item.status[0]]);

  useEffect(() => {
    if (item.status[1] === "late") {
      setLate(true);
    } else {
      setLate(false);
    }
  }, [isLate, item.status[1]]);

  function handleCheck() {
    toggleDailys(item);
    // if (isDone === "incomplete") {
    //   setDone("completed");
    // } else {
    //   setDone("incomplete");
    // }
    setDone(!isDone);
  }
  
  console.log(isLate);
  return (
    <form className="delete-todo">
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            onChange={handleCheck} 
            defaultChecked={isDone}
          />
          <span className="checkbox-custom "></span>
        </label>
        <div className={isDone
              ? "input-title todo-done"
              : isLate
                ? "input-title"
                : "input-title"
              }
              style={{ color: "red" }}
        >
          {item.task}
        </div>
        {/* add todo-done when input is checked using onChange handler */}
      </div>
    </form>
  );
};

export default connect(null, { toggleDailys })(TodoItem);
