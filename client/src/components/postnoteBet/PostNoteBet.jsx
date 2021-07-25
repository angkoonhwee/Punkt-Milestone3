import React, { useState, useEffect } from "react";
import "./postNoteBet.css";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { TextareaAutosize } from "@material-ui/core";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchGoalById, submitGoals } from "../../redux/actions/goals";
import { loadMe } from "../../redux/actions/auth";

function PostNoteBet({
  user,
  currGoal,
  postIds,
  fetchGoalById,
  submitGoals,
  loadMe
}) {
  //this goal is purely for form management
  const [goal, setGoal] = useState({
    title: "",
    atonement: "",
    days: "",
  });
  const [currDays, setCurrDays] = useState(0);

  const [hasGoal, setHasGoal] = useState(false);

  useEffect(() => {
    if (!hasGoal) {
      if (user.goalId !== "") {
        fetchGoalById(user.goalId);
      }
    }
  }, [
    user,
    loadMe,
    fetchGoalById,
  ]);

  useEffect(() => {
    if (currGoal && currGoal.status === "In Progress") {
      setHasGoal(true);
    } else if (currGoal && currGoal.status === "Failed") {
      loadMe();
    }
  }, [currGoal, hasGoal]);

  useEffect(() => {
    //to update user.goalId when new goal is created
    loadMe();
  }, [loadMe]);

  useEffect(() => {
    const temp =
      currGoal?.madeAtonement
        ? postIds?.length - 1
        : postIds?.length;
    setCurrDays(temp);
  }, [postIds, currDays])


  const totalDays = currGoal?.numDays;
  const currProgress = Math.round((currDays / totalDays) * 100);

  function handleChange(event) {
    const { name, value } = event.target;

    setGoal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function submitGoal(event) {
    event.preventDefault();
    const newGoal =
      goal.atonement === ""
        ? {
          userId: user._id,
          title: goal.title,
          atonement: "Fulfil a request from the comment in the first post with most likes",
          numDays: goal.days,
        }
        : {
          userId: user._id,
          title: goal.title,
          atonement: goal.atonement,
          numDays: goal.days,
        };
    submitGoals(newGoal);
  }

  return (
    <div className="post-note-bet">
      <h3>Long Term <br/>Bet Goal</h3>

      {hasGoal ? (
        <div>
          <p>
            <strong>Goal: </strong>
            {currGoal?.title}
          </p>
          <p>
            <strong>Atonement: </strong>
            {currGoal?.atonement}
          </p>
          <div className="progressbarWrapper">
            <div className="progressbar-text-wrapper">
              <p id="numDays">
                <strong>Progress: </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: currProgress + "%" }}
                >
                  {currProgress + "%"}
                </div>
              </div>
              <p className="buddy-days">
                {currDays + " / " + totalDays + " days"}
              </p>
            </div>
            <Link to="/progress">
              <Fab aria-label="edit" className="record-cirlce">
                <EditIcon />
              </Fab>
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-bet-text">
          <form onSubmit={submitGoal}>
            <div className="bet-component">
              <strong>Goal: </strong>
              <TextareaAutosize
                name="title"
                value={goal.title}
                className="set-goal"
                placeholder="State your goal"
                onChange={handleChange}
                required
              />
            </div>
            <div className="bet-component">
              <strong>Atonement: </strong>
              <TextareaAutosize
                name="atonement"
                value={goal.atonement}
                className="set-goal"
                placeholder="State your atonement"
                onChange={handleChange}
              />
            </div>
            <div className="bet-component">
              <strong>No. of Days: </strong>
              <input
                className="set-goal"
                type="number"
                placeholder="No. of Days"
                name="days"
                value={goal.days}
                onChange={handleChange}
                required
                min="3"
              ></input>
            </div>
            <div className="bet-btn-wrapper">
              <button className="record-bet" type="submit">
                <i className="fas fa-pen"></i>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    currGoal: state.goals.goals,
    postIds: state.goals.goals.postIds
  }
}

export default connect(
  mapStateToProps, {
  fetchGoalById,
  submitGoals,
  loadMe
})(PostNoteBet);