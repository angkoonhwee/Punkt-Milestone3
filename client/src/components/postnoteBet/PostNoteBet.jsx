import React, { useContext, useState, useEffect } from "react";
import "./postNoteBet.css";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { TextareaAutosize } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../../utils/constants";

export default function PostNoteBet() {
  const { user, dispatch } = useContext(UserContext);

  const [currGoal, setCurrGoal] = useState({});
  const [goal, setGoal] = useState({
    title: "",
    atonement: "",
    days: "",
  });

  const [hasGoal, setHasGoal] = useState(false);

  useEffect(() => {
    if (!hasGoal) {
      const fetchGoal = async () => {
        if (user.goalId !== "") {
          const res = await axios.get(url + "/goal/" + user.goalId);
          if (res.data && res.data.status === "In Progress") {
            // console.log(res.data);
            setCurrGoal(res.data);
            setHasGoal(true);
          } else if (res.data && res.data.status === "Failed") {
            const response = await axios.get(url + `/user?userId=${user._id}`);
            dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
          }
        }
      };
      fetchGoal();
    }
  }, [user, dispatch, hasGoal, currGoal]);
  //user._id, hasGoal, user.goalId

  const currDays = currGoal?.madeAtonement
    ? currGoal?.postIds?.length - 1
    : currGoal?.postIds?.length;

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

  async function submitGoal(event) {
    event.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const newGoal =
      goal.atonement === ""
        ? {
            userId: user._id,
            title: goal.title,
            atonement: "Fulfil a request from the comment with most likes",
            numDays: goal.days,
          }
        : {
            userId: user._id,
            title: goal.title,
            atonement: goal.atonement,
            numDays: goal.days,
          };

    try {
      const newGoalObj = await axios.post(url + "/goal", newGoal);

      const updatedUser = {
        userId: user._id,
        goalId: newGoalObj._id,
      };

      const res = await axios.put(url + "/user/" + user._id, updatedUser);

      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  }

  return (
    <div className="post-note-bet">
      <h3>My Betting Goal</h3>

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
}
