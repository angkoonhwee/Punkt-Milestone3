import React, { useState, useEffect } from "react";
import "./viewFailedMessages.css";
import axios from "axios";
import { url } from "../../utils/constants";
import FailedMessages from "../failedMessages/FailedMessage";

export default function ViewFailedMessages({ goal }) {
  const [failedMessages, setFailedMessages] = useState([]);

  useEffect(() => {
    const fetchFailedMessages = async () => {
      const res = await axios.get(url + `/goal/failed-messages/${goal._id}`);

      setFailedMessages(res.data);
    };
    fetchFailedMessages();
  }, [goal._id]);

  return (
    <div className="reply-bet-wrapper">
      {failedMessages.length === 0 ? (
        <div className="no-failed-messages">no replies</div>
      ) : (
        failedMessages.map((msg) => (
          <FailedMessages
            user={{
              _id: msg.userId,
              username: msg.username,
              profilePicture: msg.profilePicture,
            }}
            message={msg}
            key={msg._id}
          />
        ))
      )}
    </div>
  );
}
