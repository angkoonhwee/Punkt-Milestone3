import React, { useEffect, useState } from "react";
import "./buddyDaily.css";
import DailyItems from "./DailyItems";

//redux
import { connect } from "react-redux";
import { fetchDailys } from "../../redux/actions/buddy";
import { isEmpty, isUndefined } from "lodash";

function BuddyDailys({ userDailys, buddyDailys, fetchDailys }) {
  const currDays = 21;
  const totalDays = 30;
  //const currProgress = Math.round((currDays / totalDays) * 100);
  const [user, setUser] = useState([]);
  const [buddy, setBuddy] = useState([]);


  useEffect(() => {
    fetchDailys();
  }, [fetchDailys]);

  useEffect(() => {
    if (!isUndefined(userDailys) && !isUndefined(buddyDailys)) {
      setUser(userDailys);
      setBuddy(buddyDailys);
    };
  }, [user, buddy, userDailys, buddyDailys]);

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
    userDailys: state.buddy.dailys.user,
    buddyDailys: state.buddy.dailys.buddy
  }
}

export default connect(mapStateToProps, { fetchDailys })(BuddyDailys);
