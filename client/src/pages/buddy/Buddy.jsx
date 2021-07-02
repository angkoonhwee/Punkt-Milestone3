import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import BuddyChat from "../../components/buddyChat/BuddyChat";
import BuddyTodo from "../../components/buddyTodo/BuddyTodo";
import BuddyDailys from "../../components/buddyDailys/BuddyDailys";
import "./buddy.css";

export default function Buddy() {
  const [isChatClicked, setChatClicked] = useState(false);
  const [isDailyClicked, setDailyClicked] = useState(true);
  const [isTodoClicked, setTodoClicked] = useState(false);

  return (
    <div>
      <NavbarMain />
      <div className="container-buddy">
        <div className="buddy-left-bar">
          <img
            className="buddy-profile-pic"
            alt="buddy-profile-pic"
            src="/assets/img/defaultDP.svg"
          />
          <h4>Buddy Username</h4>
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
