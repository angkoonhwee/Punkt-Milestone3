import React, { useEffect } from "react";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import "./betStatus.css";
import { url } from "../../utils/constants";

export default function BetStatus({ user, goal, dispatch, currUser }) {
  const currDays = goal.madeAtonement
    ? goal.postIds?.length - 1
    : goal.postIds?.length;
  const totalDays = goal.numDays;

  useEffect(() => {
    const updateStatus = async () => {
      if (
        goal.status === "Failed" &&
        goal.userId === currUser._id &&
        currUser.goalId !== ""
      ) {
        // GET UPDATED CURR USER
        const res = await axios.get(url + `/user?userId=${currUser._id}`);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      }
    };
    updateStatus();
  }, [goal, dispatch, currUser]);

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
}
