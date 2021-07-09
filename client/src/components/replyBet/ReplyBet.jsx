import React, { useState, useEffect } from "react";
import "./replyBet.css";
import { TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import { url } from "../../utils/constants";
import FailedMessages from "../failedMessages/FailedMessage";

export default function ReplyBet({ goal, user }) {
  const [reply, setReply] = useState("");
  const [failedMessages, setFailedMessages] = useState([]);

  useEffect(() => {
    const fetchFailedMessages = async () => {
      try {
        if (goal.failedMessages?.length > 0) {
          const res = await axios.get(
            url + "/goal/failed-messages/" + goal._id + "/" + user._id
          );

          setFailedMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFailedMessages();
  }, [goal, user._id]);

  async function submitReply(event) {
    event.preventDefault();
    try {
      const res = await axios.put(url + "/goal/failed-messages/" + goal._id, {
        userId: user._id,
        message: reply,
      });

      setFailedMessages(res.data);
    } catch (err) {
      console.log(err);
    }

    setReply("");
  }

  return (
    <div className="reply-bet-wrapper">
      {failedMessages.map((msg) => (
        <FailedMessages user={user} message={msg} key={msg._id} />
      ))}

      <form className="chat-input-form reply" onSubmit={submitReply}>
        <TextareaAutosize
          className="reply-input"
          type="text"
          placeholder="Type a message..."
          required
          name="reply"
          value={reply}
          onChange={(event) => setReply(event.target.value)}
        />

        <button className="chat-send-btn" type="submit">
          Reply
        </button>
      </form>
    </div>
  );
}
