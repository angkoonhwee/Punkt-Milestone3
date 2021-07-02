import React, { useState, useContext, useEffect } from "react";
import "./setBet.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { url } from "../../utils/constants";

export default function SetBet({ user, goal }) {
  // user is the owner of the goal
  const [isBetFor, setIsBetFor] = useState(false);
  const [isBetAgainst, setIsBetAgainst] = useState(false);
  const [betAmountFor, setBetAmountFor] = useState("");
  const [betAmountAgainst, setBetAmountAgainst] = useState("");
  const [isBetForDisabled, setIsBetForDisabled] = useState(
    goal.status ? goal.status !== "In Progress" : false
  );
  const [isBetAgainstDisabled, setIsBetAgainstDisabled] = useState(
    goal.status ? goal.status !== "In Progress" : false
  );
  // const [isDisabled, setIsDisabled] = useState(false);
  const { user: currUser } = useContext(UserContext);

  useEffect(() => {
    const fetchBetFor = async () => {
      try {
        if (goal.status) {
          setIsBetAgainstDisabled(goal.status !== "In Progress");
        }
        if (goal._id) {
          const res = await axios.get(
            url + "/goal/" + goal._id + "/bet-for/" + currUser._id
          );

          if (res.data) {
            setBetAmountFor(res.data.amt);
            setIsBetAgainstDisabled(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBetFor();
  }, [goal, currUser._id]);

  useEffect(() => {
    const fetchBetAgainst = async () => {
      try {
        if (goal.status) {
          setIsBetForDisabled(goal.status !== "In Progress");
        }
        if (goal._id) {
          const res = await axios.get(
            url + "/goal/" + goal._id + "/bet-against/" + currUser._id
          );
          if (res.data) {
            setBetAmountAgainst(res.data.amt);
            setIsBetForDisabled(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBetAgainst();
  }, [goal, currUser._id]);

  function handleIsBetFor() {
    setIsBetFor(!isBetFor);
  }

  function handleIsBetAgainst() {
    setIsBetAgainst(!isBetAgainst);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "bet-amount-for") {
      setBetAmountFor(value);
    } else if (name === "bet-amount-against") {
      setBetAmountAgainst(value);
    }
  }

  async function submitBetFor(event) {
    event.preventDefault();
    try {
      const res = await axios.put(url + "/goal/" + goal._id + "/bet-for", {
        userId: currUser._id,
        amt: betAmountFor,
      });
      setIsBetAgainstDisabled(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function submitBetAgainst(event) {
    event.preventDefault();
    try {
      const res = await axios.put(url + "/goal/" + goal._id + "/bet-against", {
        userId: currUser._id,
        amt: betAmountAgainst,
      });
      setIsBetForDisabled(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="set-bet">
      <div className="set-bet-wrapper">
        <button
          className="bet-button bet-for"
          style={{
            cursor: isBetForDisabled ? "not-allowed" : "pointer",
            backgroundColor: isBetForDisabled
              ? "grey"
              : isBetFor
              ? "rgb(57, 153, 57)"
              : "rgb(80, 170, 80)",
          }}
          disabled={isBetForDisabled}
          onClick={handleIsBetFor}
        >
          I believe in you!
        </button>
        {isBetFor && (
          <div className="bet-amount">
            <form
              disabled={isBetAgainstDisabled || isBetForDisabled}
              onSubmit={
                isBetAgainstDisabled || isBetForDisabled ? null : submitBetFor
              }
            >
              <input
                className="bet-input"
                type="number"
                placeholder={
                  isBetForDisabled || isBetForDisabled ? betAmountFor : "Amount"
                }
                name="bet-amount-for"
                value={betAmountFor}
                onChange={handleChange}
                disabled={isBetAgainstDisabled || isBetForDisabled}
                style={{
                  cursor:
                    isBetAgainstDisabled || isBetForDisabled
                      ? "not-allowed"
                      : "pointer",
                  display: isBetForDisabled ? "none" : "inline-block",
                }}
              ></input>
              <button
                className="bet-btn"
                type="submit"
                disabled={isBetAgainstDisabled}
                style={{
                  cursor: isBetAgainstDisabled ? "not-allowed" : "pointer",
                  backgroundColor: isBetAgainstDisabled
                    ? "grey"
                    : "rgb(247, 176, 25)",

                  display:
                    isBetForDisabled || isBetAgainstDisabled
                      ? "none"
                      : "inline-block",
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="set-bet-wrapper">
        <button
          className="bet-button bet-against"
          style={{
            cursor: isBetAgainstDisabled ? "not-allowed" : "pointer",
            backgroundColor: isBetAgainstDisabled
              ? "grey"
              : isBetAgainst
              ? "rgb(201, 90, 90)"
              : "rgb(216, 111, 111)",
          }}
          disabled={isBetAgainstDisabled}
          onClick={handleIsBetAgainst}
        >
          This is impossible!
        </button>
        {isBetAgainst && (
          <div className="bet-amount">
            <form
              disabled={isBetForDisabled}
              onSubmit={isBetForDisabled ? null : submitBetAgainst}
            >
              <input
                className="bet-input"
                type="number"
                placeholder={isBetForDisabled ? betAmountAgainst : "Amount"}
                name="bet-amount-against"
                value={betAmountAgainst}
                onChange={handleChange}
                disabled={isBetForDisabled || isBetAgainstDisabled}
                style={{
                  cursor:
                    isBetForDisabled || isBetAgainstDisabled
                      ? "not-allowed"
                      : "pointer",
                  display: isBetAgainstDisabled ? "none" : "inline-block",
                }}
              ></input>
              <button
                type="submit"
                className="bet-btn"
                disabled={isBetAgainstDisabled}
                style={{
                  cursor: isBetAgainstDisabled ? "not-allowed" : "pointer",
                  backgroundColor:
                    isBetForDisabled || isBetAgainstDisabled
                      ? "grey"
                      : "rgb(247, 176, 25)",
                  display:
                    isBetForDisabled || isBetAgainstDisabled
                      ? "none"
                      : "inline-block",
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
