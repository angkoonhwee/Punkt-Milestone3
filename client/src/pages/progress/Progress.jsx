import React, { useEffect, useState } from "react";
import BetStatus from "../../components/betStatus/BetStatus";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ProgressTimeline from "../../components/progressTimeline/ProgressTimeline";
import RecordStatus from "../../components/recordStatus/RecordStatus";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import SetBet from "../../components/setBet/SetBet";
import "./progress.css";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import Loading from "../loading/Loading";

//redux
import { connect } from "react-redux";
import {
  fetchGoalById,
  fetchGoal,
  updateStatus
} from "../../redux/actions/goals";
import { fetchUserById } from "../../redux/actions/user";


function Progress({
  currUser,
  storeUser,
  fetchUserById,
  updateStatus,
  goal,
  fetchGoal,
  fetchGoalById
}) {
  //Progress have 2 different routes to be accessed by
  //1. /progress
  //2. /progress/:goalId
  const goalId = useParams().goalId;

  const [user, setUser] = useState({}); // owner of the goal

  useEffect(() => {
    if (goalId) {
      fetchGoalById(goalId);
    } else {
      fetchGoal(currUser._id);
    }
  }, [
    currUser._id,
    fetchGoal,
    fetchGoalById,
  ]);

  useEffect(() => {
    if (!isEmpty(goal)) {
      if (goal.userId === currUser._id) {
        console.log("GOAL BELONGS TO ME");
        setUser(currUser);
      } else {
        console.log("GOAL BELONGS TO SOMEONE ELSE");
        fetchUserById(goal.userId);
      }
    }
  }, [currUser, fetchUserById, user, goal]);

  useEffect(() => {
    if (isEmpty(user)) {
      setUser(storeUser);
    }
  }, [storeUser, user])

  useEffect(() => {
    if (!isEmpty(goal) && goal.status === "Success") {
      if (goal.postIds.length === goal.numDays) {
        updateStatus(goal._id);
      }
    }
  }, [updateStatus, goal.postIds])

  if (!isEmpty(goal) && !isEmpty(user)) {
    return (
      <div>
        <NavbarMain />
        <div className="container-progress">
          <BetStatus
            user={user}
          />
          {goal.userId === currUser._id ? (
            <RecordStatus />
          ) : (
            <SetBet user={user} goal={goal} />
          )}

          <ProgressTimeline goalId={
            goalId
              ? goalId
              : goal._id} />
        </div>
        <ScrollTop />
        <Footer />
      </div>
    );
  } else {
    return (
      <Loading />
    )
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    goal: state.goals.goals,
    storeUser: state.user.user
  };
};

export default connect(
  mapStateToProps,
  {
    fetchGoal,
    fetchGoalById,
    fetchUserById,
    updateStatus
  })(Progress);