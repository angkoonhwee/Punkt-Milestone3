import React from "react";
import "./buddyChatInput.css";
import { TextareaAutosize } from "@material-ui/core";

export default function BuddyChatInput({ setMessage, sendMessage, message }) {
  return (
    <form className="chat-input-form">
      <TextareaAutosize
        className="chat-input"
        type="text"
        placeholder="Type a message..."
        value={message}
        // onChange={({ target: { value } }) => setMessage(value)}
        // onKeyPress={(event) =>
        //   event.key === "Enter" ? sendMessage(event) : null
        // }
      />
      {/* <div className="chat-intput-container"> */}
      <button
        className="chat-send-btn"
        type="submit"
        // onClick={(e) => sendMessage(e)}
      >
        Send
      </button>
      {/* </div> */}
    </form>
  );
}
