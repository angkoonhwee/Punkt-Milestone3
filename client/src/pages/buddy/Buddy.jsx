import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import BuddyChat from "../../components/buddyChat/BuddyChat";
import BuddyTodo from "../../components/buddyTodo/BuddyTodo";
import BuddyDailys from "../../components/buddyDailys/BuddyDailys";
import Loading from "../../pages/loading/Loading";
import "./buddy.css";

import { isEmpty } from "lodash";

//redux
import { connect } from "react-redux";
import { fetchBuddy, fetchBuddyUser } from "../../redux/actions/buddy";

function Buddy({buddyId, buddyObject, buddy, fetchBuddy, fetchBuddyUser}) {
  const [isChatClicked, setChatClicked] = useState(false);
  const [isDailyClicked, setDailyClicked] = useState(true);
  const [isTodoClicked, setTodoClicked] = useState(false);

  useEffect(() => {
    if (buddyId !== "") {
      fetchBuddy(buddyId);
    }
  }, [fetchBuddy, buddyId]);

  //console.log(buddyObject);
  useEffect(() => {
    if (!isEmpty(buddyObject)) {
      fetchBuddyUser(buddyObject.buddy);
    }
  }, [buddyObject, fetchBuddyUser]);

  if (buddyId === "") {
    return (
      <div>
        <NavbarMain />
        <div className="container-loading">
          <div className="loading-wrapper">
            <h1 className="loading-text">Please find a Buddy first.</h1>
          </div>
      </div>
    </div>  
    )
  } else if (buddyObject === null || isEmpty(buddy)) {
    return <Loading />
  } else {
    return (
      <div>
        <NavbarMain />
        <div className="container-buddy">
          <div className="buddy-left-bar">
            <img
              className="buddy-profile-pic"
              alt="buddy-profile-pic"
              src={
                    buddy.profilePicture
                      ? buddy.profilePicture
                      : "/assets/img/defaultDP.svg"
                  }
            />
            <h4>{buddy.username}</h4>
            <div className="container-buddy-btn">
              <button
                className={
                  isDailyClicked
                    ? "buddy-left-bar-btn active"
                    : "buddy-left-bar-btn"
                }
                onClick={() => {
                  setDailyClicked(true);
                  setTodoClicked(false);
                  setChatClicked(false);
                }}
              >
                <i className="far fa-list-alt" />
                Daily Todo
              </button>
              <button
                className={
                  isTodoClicked
                    ? "buddy-left-bar-btn active"
                    : "buddy-left-bar-btn"
                }
                onClick={() => {
                  setDailyClicked(false);
                  setTodoClicked(true);
                  setChatClicked(false);
                }}
              >
                <i className="far fa-calendar-plus" />
                Set Todo
              </button>
              <button
                className={
                  isChatClicked
                    ? "buddy-left-bar-btn active"
                    : "buddy-left-bar-btn"
                }
                onClick={() => {
                  setDailyClicked(false);
                  setTodoClicked(false);
                  setChatClicked(true);
                }}
              >
                <i className="fas fa-comments" />
                Live Chat
              </button>
            </div>
            <h4>{buddyObject.daysLeft + " Days Left"}</h4>
          </div>
          <div className="buddy-content">
            {isDailyClicked ? (
              <BuddyDailys />
            ) : isTodoClicked ? (
              <BuddyTodo />
            ) : (
              <BuddyChat />
            )}
          </div>
        </div>
        <ScrollTop />
        <Footer />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    buddyObject: state.buddy.object,
    buddyId: state.auth.user.currentBuddy,
    buddy: state.buddy.buddy
  };
};

export default connect(mapStateToProps, { fetchBuddy, fetchBuddyUser })(Buddy);
