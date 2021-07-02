import React, { useState } from "react";
import "./dailyItems.css";
import { useDispatch } from "react-redux";
import { toggleComplete } from "../../redux/dailysSlice";

export default function DailyItems({ item }) {
  // { id, title, completed }
  // const dispatch = useDispatch();

  // const handleItemClick = () => {
  //   dispatch(toggleComplete({ id: id, completed: !completed }));
  // };

  const [isDone, setDone] = useState(false);

  function handleCheck() {
    setDone(!isDone);
  }
  return (
    <form className="delete-todo daily-item">
      <div className="checkbox-container daily-item">
        <label className="checkbox-label daily-item">
          <input type="checkbox" onChange={handleCheck} />
          <span className="checkbox-custom daily-item"></span>
        </label>
        <div
          className={
            isDone
              ? "input-title daily-item todo-done"
              : "input-title daily-item"
          }
        >
          {item.item}
        </div>
      </div>
    </form>
  );
}
