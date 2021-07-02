import React from "react";
import "./buddyDaily.css";
import { useSelector, useDispatch } from "react-redux";
//import { getDailysAsync } from '../../../redux/dailysSlice'
import TodoItem from "../postnoteTodo/TodoItem";
import { Users, Todos } from "../../dummyDate";
import DailyItems from "./DailyItems";

//get list of todos from the day before

export default function BuddyDailys() {
  // const dispatch = useDispatch();
  // const dailys = useSelector((state) => state.dailys);
  //console.log(dailys);

  // useEffect(() => {
  //     dispatch(getDailysAsync());
  // }, [dispatch])
  const currDays = 21;
  const totalDays = 30;
  const currProgress = Math.round((currDays / totalDays) * 100);

  return (
    <div className="container-buddy-daily">
      <div className="buddy-daily">
        <h2>My Todo</h2>
        <hr />
        {Todos.map((t) => (
          <DailyItems key={t.id} item={t} />
        ))}

        {/* <form className="item">
          <input
            type="text"
            name="newItem"
            placeholder="New ToDo Item"
            autocomplete="off"
          />
          <button type="submit" name="list">
            +
          </button>
        </form> */}
      </div>
      <div className="buddy-daily">
        <h2>Buddy Todo</h2>
        <hr />
        {Todos.map((t) => (
          <DailyItems key={t.id} item={t} />
        ))}
      </div>
    </div>
  );
}
