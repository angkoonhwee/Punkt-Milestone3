import React from "react";
import "./failedMessage.css";
import { motion } from "framer-motion";
import { format } from "timeago.js";

export default function FailedMessage({ message, user }) {
  return (
    <motion.div
      className="post-user-comments"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img
        className="profilePic"
        src={
          user.profilePicture
            ? user.profilePicture
            : "/assets/img/defaultDP.svg"
        }
        alt="profile-pic"
        style={{ margin: "5px 10px" }}
      />

      <div className="comment-content">
        <p>
          <strong>{user.username}</strong>
          <span className="post-date">{format(message.createdAt)}</span>
        </p>

        <p>{message.message}</p>
      </div>
    </motion.div>
  );
}
