import React, { useState, useContext, useEffect } from "react";
import "./setBet.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { url } from "../../utils/constants";

export default function SetBet({ user, goal }) {
  // user is the owner of the goal
  const [isBetAgainst, setIsBetAgainst] = useState(false);

  const [isBetDisabled, setisBetDisabled] = useState(
    goal.status
      ? goal.status !== "In Progress" ||
          goal.usersBetAgainst.includes(user.userId)
      : false
  );

  const { user: currUser } = useContext(UserContext);

  useEffect(() => {
    const fetchBetAgainst = async () => {
      try {
        if (goal.status) {
          setisBetDisabled(goal.status !== "In Progress");
        }
        if (goal._id) {
          const res = await axios.get(
            url + "/goal/" + goal._id + "/bet-against/" + currUser._id
          );
          if (res.data) {
            setisBetDisabled(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBetAgainst();
  }, [goal, currUser._id]);

  async function submitBetAgainst(event) {
    event.preventDefault();
    try {
      const res = await axios.put(url + "/goal/" + goal._id + "/bet-against", {
        userId: currUser._id,
      });
      setisBetDisabled(true);
    } catch (err) {
      console.log(err);
    }
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
