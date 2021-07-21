import React, { useEffect, useState } from "react";
import "./dailyItems.css";

import { connect } from "react-redux";
import { toggleDailys } from "../../redux/actions/buddy";

function DailyItems({ item, toggleDailys, buddy }) {
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
    <form className="delete-todo daily-item">
      <div className="checkbox-container daily-item">
        {!buddy && (
        <label className="checkbox-label daily-item">
            <input 
              type={"checkbox"} 
              onChange={handleCheck} 
              disabled={buddy} 
              defaultChecked={item.status === "completed"}
            />
            <span className="checkbox-custom daily-item"></span>
          </label>
        )}

        {buddy && <i className="fas fa-map-pin" />}
        <div
          className={
            isDone === "completed"
              ? "input-title daily-item todo-done"
              : isDone === "late"
                ? "input-title daily-item red"
                : "input-title daily-item"
          }
        >
          {item.task}
        </div>
      </div>
    </form>
  );
};

export default connect(null, { toggleDailys })(DailyItems);
