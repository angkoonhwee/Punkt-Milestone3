import React, { useEffect, useState } from "react";
import "./buddyDaily.css";
import TodoItem from "../postnoteTodo/TodoItem";
import { Users, Todos } from "../../dummyDate";
import DailyItems from "./DailyItems";

//redux
import { connect } from "react-redux";
import { fetchDailys } from "../../redux/actions/buddy";
import { isEmpty } from "lodash";

function BuddyDailys({ dailys, fetchDailys }) {
  const currDays = 21;
  const totalDays = 30;
  //const currProgress = Math.round((currDays / totalDays) * 100);
  const [user, setUser] = useState([]);
  const [buddy, setBuddy] = useState([]);


  useEffect(() => {
    fetchDailys();
  }, [fetchDailys]);

  useEffect(() => {
    if (!isEmpty(dailys)) {
      setUser(dailys.user);
      setBuddy(dailys.buddy);
    };
  }, [user, buddy, dailys])

  return (
    <div className="container-buddy-daily">
      <div className="buddy-daily">
        <h2>My Todo</h2>
        <hr />
        {user.map((t) => (
          <DailyItems key={t._id} item={t} />
        ))}
      </div>
      <div className="buddy-daily">
        <h2>Buddy Todo</h2>
        <hr />
        {buddy.map((t) => (
          <DailyItems key={t._id} item={t} buddy={true}/>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    dailys: state.buddy.dailys
  }
}

export default connect(mapStateToProps, { fetchDailys })(BuddyDailys);
