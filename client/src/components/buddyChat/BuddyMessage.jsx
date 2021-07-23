import React from "react";
import "./buddyMessage.css";
import ReactEmoji from "react-emoji";
import { format } from "timeago.js";

import { connect } from "react-redux";

function BuddyMessage({ 
  message: { 
    text,
    sender,
    createdAt
  }, userId,
  userProfilePic,
  buddyProfilePic 
}) {
  let isSentByCurrentUser = false;

  if (sender === userId) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="message-container own">
      <div className="container-message-w-date own">
        <div className="message-box own ">
          <p className="message-text own ">{ReactEmoji.emojify(text)}</p>
        </div>
        <p className="buddy-message-date">{format(createdAt)}</p>
      </div>
      <div className="container-buddy-chat-user own">
        <img
          className="buddy-message-profile-pic"
          src={userProfilePic === "" ? "/assets/img/defaultDP.svg" : userProfilePic}
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
          src={buddyProfilePic === "" ? "/assets/img/defaultDP.svg" : buddyProfilePic}
          alt="sender-dp"
        ></img>
        {/* <p className="sent-username">{user}</p> */}
      </div>
      <div className="container-message-w-date">
        <div className="message-box">
          <p className="message-text">{ReactEmoji.emojify(text)}</p>
        </div>

        <p className="buddy-message-date">{format(createdAt)}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userProfilePic: state.auth.user.profilePicture,
    buddyProfilePic: state.buddy.buddy.profilePicture
  }
}

export default connect(mapStateToProps)(BuddyMessage);
