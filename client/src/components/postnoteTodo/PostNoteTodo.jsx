import React, { useEffect, useState } from "react";
import "./postNoteTodo.css";
import TodoItem from "./TodoItem";
import { Link } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { fetchBuddy } from "../../redux/actions/buddy";
import { isUndefined } from "lodash";

function PostNoteTodo({ dailys, fetchBuddy, buddyId }) {
  const [completed, setCompleted] = useState(0);
  const [currProgress, setProgress] = useState(0);
  const total = dailys.length;

  useEffect(() => {
    const temp = dailys.filter(d => d.status[0] === "completed").length;
    console.log(temp);
    setCompleted(temp);
    setProgress(Math.round((completed/total) * 100));
  }, [currProgress, completed, dailys]);

  useEffect(() => {
    if (buddyId !== "") {
      fetchBuddy(buddyId);
    }
  }, [fetchBuddy, buddyId]);


  if (buddyId === "") {
    return (
      <div className="post-note-todo">
        <h3>Find a buddy to unlock this feature</h3>
      </div>
    )
  } else if (isUndefined(dailys)) {
    return (
      <div className="post-note-todo">
        <h3>Loading...</h3>
      </div>
    )
  }
  return (
    <div className="post-note-todo">
      <h3>Todos with Buddy</h3>
      <p className="todayDate">
        <strong>Date:</strong> {new Date().toDateString()}
      </p>

      <div className="progressbarWrapper">
        <div className="progress buddy">
          <div
            className="progress-bar buddy"
            role="progressbar"
            style={{ width: currProgress + "%" }}
          >
            {currProgress + "%"}
          </div>
        </div>
      </div>
      <p className="buddy-days">{completed + " / " + total + " days"}</p>
      {dailys.map((t) => (
        <TodoItem key={t._id} item={t} />
      ))}

      <div className="chat-btn-container">
        <Link style={{ textDecoration: "none" }} to="/buddy">
          <button id="note-chat">
            <i className="far fa-laugh-squint"></i>
            Chat with buddy
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    dailys: state.buddy.dailys.user,
    buddyId: state.auth.user.currentBuddy
  };
};

export default connect(mapStateToProps, { fetchBuddy })(PostNoteTodo);
