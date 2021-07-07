import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import "./betStatus.css";
import { url } from "../../utils/constants";

export default function BetStatus({ user, goal, dispatch, currUser }) {
  const [latestPost, setLatestPost] = useState({});
  const [SecLatestPost, setSecLatestPost] = useState({});

  const currDays = goal.madeAtonement
    ? goal.postIds?.length - 1
    : goal.postIds?.length;
  const totalDays = goal.numDays;

  useEffect(() => {
    const fetchLatestPost = async () => {
      if (goal.postIds && goal.postIds.length > 0) {
        const res = await axios.get(
          url + `/post/${goal.postIds[goal.postIds.length - 1]}`
        );

        setLatestPost(res.data);
      }
    };
    fetchLatestPost();
  }, [goal.postIds]);

  useEffect(() => {
    const fetchSecLatestPost = async () => {
      if (goal.postIds && goal.postIds.length > 1) {
        const res = await axios.get(
          url + `/post/${goal.postIds[goal.postIds.length - 2]}`
        );
        setSecLatestPost(res.data);
      }
    };
    fetchSecLatestPost();
  }, [goal.postIds]);

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      a.getFullYear(),
      a.getMonth(),
      a.getDate(),
      a.getHours(),
      a.getMinutes()
    );

    const utc2 = Date.UTC(
      b.getFullYear(),
      b.getMonth(),
      b.getDate(),
      b.getHours(),
      b.getMinutes()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  function checkProgress() {
    const startDate = SecLatestPost.createdAt
      ? new Date(SecLatestPost.createdAt)
      : new Date(goal.createdAt);
    const currDate = latestPost.createdAt
      ? new Date(latestPost.createdAt)
      : new Date();

    if (dateDiffInDays(startDate, currDate) > 1) {
      console.log("failed");
      return "Failed";
    }
  }

  const prog = checkProgress();

  useEffect(() => {
    const updateStatus = async () => {
      if (goal.status === "In Progress" && prog === "Failed") {
        const res = await axios.put(url + "/goal/" + goal._id + "/status", {
          userId: user._id,
          status: "Failed",
        });

        console.log(res.data);
        if (res.data._id === currUser._id) {
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        }
      }
    };
    updateStatus();
  }, [prog, user._id, goal, dispatch, currUser]);

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
