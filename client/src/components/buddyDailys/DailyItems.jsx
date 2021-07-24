import React, { useState } from "react";
import "./dailyItems.css";

import { connect } from "react-redux";
import { toggleDailys } from "../../redux/actions/buddy";

function DailyItems({ item, toggleDailys, buddy }) {
  const [isDone, setDone] = useState(item.status[0] === "completed");
  const [isLate, setLate] = useState(item.status[1] === "late")

  function handleCheck() {
    toggleDailys(item);
    setDone(!isDone);
  }

  function checkDailyStatus() {
    if (isLate) {
      if (isDone) {
        return "input-title daily-item red todo-done";
      } else {
        return "input-title daily-item red";
      }
    } else {
      if (isDone) {
        return "input-title daily-item todo-done";
      } else {
        return "input-title daily-item"
      }
    }
  }

  return (
    <form className="delete-todo daily-item">
      <div className="checkbox-container daily-item">
        {!buddy && (
          <label className={isLate ? "checkbox-label daily-item red" : "checkbox-label daily-item"}>
            <input
              type={"checkbox"}
              onChange={handleCheck}
              disabled={buddy}
              defaultChecked={isDone}
            />
            <span className={isLate ? "checkbox-custom daily-item red" : "checkbox-custom daily-item"}></span>
          </label>
        )}

        {buddy && <i className={isLate ? "fas fa-map-pin red" : "fas fa-map-pin"} />}
        <div
          className={checkDailyStatus()}
        >
          {item.task}
        </div>
      </div>
    </form>
  );
};


export default connect(null, { toggleDailys })(DailyItems);
