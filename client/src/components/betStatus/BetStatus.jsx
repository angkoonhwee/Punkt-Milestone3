import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import "./betStatus.css";

//redux for goals
import { connect } from "react-redux";

function BetStatus({ user, goal, postIds }) {
  const [currDays, setCurrDays] = useState(goal.postIds.length);
  console.log(goal);

  useEffect(() => {
    const temp = goal.madeAtonement
    ? postIds.length - 1
    : postIds.length;
    console.log(temp);
    setCurrDays(temp);
   }, [postIds, currDays]);
  // const currDays = goal.madeAtonement
  // ? goal.postIds?.length - 1
  // : goal.postIds?.length

  const totalDays = goal.numDays;

  return (
    <div className="bet-status">
      <div className="status-top">
        <div className="status-name">
          <a href={`/profile/${user.username}`}>
            <img
              className="profilePic post-profile"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "/assets/img/defaultDP.svg"
              }
              alt="profilePic"
            />
          </a>
          <p className="post-name">{user.username}</p>
        </div>
        <h2>「 {goal.title} 」</h2>
      </div>
      <div className="status-middle">
        <div className="middle-component">
          <h4>
            <strong>Atonement:</strong>
          </h4>
          <h4>{goal.atonement}</h4>
        </div>

        <div className="middle-component">
          <h4>
            <strong>Progress:</strong>
          </h4>
          <h4>{currDays + " / " + totalDays}</h4>
        </div>

        <div className="middle-component">
          <h4>
            <strong>Status:</strong>
          </h4>
          <h4>{goal.status}</h4>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  //console.log(state.goals.goals);
  return {
    goal: state.goals.goals,
    postIds: state.goals.goals.postIds
  }
}

export default connect(mapStateToProps)(BetStatus);