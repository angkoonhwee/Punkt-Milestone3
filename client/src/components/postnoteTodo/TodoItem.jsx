import React, { useState, useEffect } from "react";
import "./postNoteTodo.css";

import { connect } from "react-redux";
import { toggleDailys } from "../../redux/actions/buddy";

function TodoItem({ item, toggleDailys }) {
  const [isDone, setDone] = useState(null);

  useEffect(() => {
    if (item) {
      setDone(item.status);
    }
  }, [isDone, item.status]);

  function handleCheck() {
    toggleDailys(item);
    if (isDone === "incomplete") {
      setDone("completed");
    } else {
      setDone("incomplete");
    }
  }
  
  return (
    <form className="delete-todo">
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            onChange={handleCheck} 
            defaultChecked={item.status === "completed"}
          />
          <span className="checkbox-custom "></span>
        </label>
        <div className={isDone === "completed"
              ? "input-title todo-done"
              : isDone === "late"
                ? "input-title red"
                : "input-title"
         }>
          {item.task}
        </div>
        {/* add todo-done when input is checked using onChange handler */}
      </div>
    </form>
  );
};

export default connect(null, { toggleDailys })(TodoItem);
