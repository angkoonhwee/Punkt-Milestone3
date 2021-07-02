import React from "react";
import "./buddyMessage.css";
import ReactEmoji from "react-emoji";

export default function BuddyMessage({ message: { text, user }, name }) {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="message-container own">
      <div className="container-message-w-date own">
        <div className="message-box own ">
          <p className="message-text own ">{ReactEmoji.emojify(text)}</p>
        </div>
        <p className="buddy-message-date">10 mins ago</p>
      </div>
      <div className="container-buddy-chat-user own">
        <img
          className="buddy-message-profile-pic"
          src="/assets/img/defaultDP.svg"
          alt="sender-dp"
        ></img>
        {/* <p className="sent-username own">{trimmedName}</p> */}
      </div>
    </div>
  ) : (
    <div className="message-container ">
      <div className="container-buddy-chat-user">
        <img
          className="buddy-message-profile-pic"
          src="/assets/img/among-nature.svg"
          alt="sender-dp"
        ></img>
        {/* <p className="sent-username">{user}</p> */}
      </div>
      <div className="container-message-w-date">
        <div className="message-box">
          <p className="message-text">{ReactEmoji.emojify(text)}</p>
        </div>

        <p className="buddy-message-date">10 mins ago</p>
      </div>
    </div>
  );
}
