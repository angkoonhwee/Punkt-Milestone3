import React, { useState, useEffect } from "react";
import "./setBet.css";

//redux
import { connect } from "react-redux";
import { fetchBetAgainst, createBetAgainst } from "../../redux/actions/goals";

function SetBet({ 
  user, 
  goal, 
  currUser,
  betAgainst,
  fetchBetAgainst,
  createBetAgainst
}) {
  // user is the owner of the goal
  const [isBetAgainst, setIsBetAgainst] = useState(false);

  const [isBetDisabled, setisBetDisabled] = useState(
    goal.status
      ? goal.status !== "In Progress" ||
          goal.usersBetAgainst.includes(user.userId)
      : false
  );

  useEffect(() => {
      if (goal.status) {
        setisBetDisabled(goal.status !== "In Progress");
      }
      if (goal._id) {
        fetchBetAgainst(goal._id, currUser._id);
      }
      //*****no purpose of sending back the list of users that bet against?
      if (betAgainst) setisBetDisabled(true);
  }, [goal, currUser, fetchBetAgainst, betAgainst]);

  function submitBetAgainst(event) {
    event.preventDefault();
    createBetAgainst(goal._id, { userId: currUser._id });
    setisBetDisabled(true);
  }

  return (
    <div className="set-bet">
      <div className="set-bet-wrapper">
        <button
          className="bet-button bet-against"
          disabled={isBetDisabled}
          style={{
            cursor: isBetDisabled ? "not-allowed" : "pointer",
            backgroundColor: isBetDisabled
              ? "grey"
              : isBetAgainst
              ? "rgb(201, 90, 90)"
              : "rgb(216, 111, 111)",
          }}
          onClick={() => setIsBetAgainst(!isBetAgainst)}
        >
          This is impossible!
        </button>
        {isBetAgainst && (
          <div className="bet-amount">
            <form
              disabled={isBetDisabled}
              onSubmit={isBetDisabled ? null : submitBetAgainst}
            >
              <button
                type="submit"
                className="bet-btn"
                disabled={isBetDisabled}
                style={{
                  marginTop: "10px",
                  cursor: isBetDisabled ? "not-allowed" : "pointer",
                  backgroundColor: isBetDisabled ? "grey" : "rgb(247, 176, 25)",
                  display: isBetDisabled ? "none" : "inline-block",
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    betAgainst: state.goals.betAgainst
  };
}

export default connect(mapStateToProps, { fetchBetAgainst, createBetAgainst })(SetBet);