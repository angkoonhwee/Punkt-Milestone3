import React from "react";
import "./modal.css";
import { motion } from "framer-motion";
import RecordStatus from "../recordStatus/RecordStatus";
import ReplyBet from "../replyBet/ReplyBet";
import ViewFailedMessages from "../viewFailedMessages/ViewFailedMessages";

export default function Modal({ setIsClicked, task, currGoal, user }) {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setIsClicked(false);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {task === "Create" ? (
        <div className="task-wrapper">
          <RecordStatus currGoal={currGoal} atonement={true} />
        </div>
      ) : task === "View" ? (
        <div className="task-wrapper reply">
          <ViewFailedMessages goal={currGoal} />
        </div>
      ) : (
        <div className="task-wrapper reply">
          <ReplyBet user={user} goal={currGoal} />
        </div>
      )}
    </motion.div>
  );
}