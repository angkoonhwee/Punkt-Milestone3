import React, { useState, useRef, useEffect } from "react";
import "./buddyChat.css";
import BuddyMessage from "./BuddyMessage";
import { TextareaAutosize } from "@material-ui/core";
import { io } from "socket.io-client";

//redux
import { connect } from "react-redux";
import { fetchChat, messageSent } from "../../redux/actions/buddy";
import { isUndefined } from "lodash";

function BuddyChat({ messages, fetchChat, chatId, userId, buddyId, messageSent }) {
  const socket = useRef();
  const [message, setMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    console.log("should connect to socket!");
    socket.current = io("ws://localhost:8000");
    socket.current.emit("Join Room", chatId);
    //must put on first render so socket would 
    //start listening for this event on first render
    socket.current.on("Receive Message", message => {
      console.log(message);
      //a action for after message posted to update redux store
      messageSent(message.message);
    });
  }, [])

  useEffect(() => {
    if (!isUndefined(chatId)) {
      fetchChat(chatId);
    }
  }, [fetchChat, chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();

    const body = {
      sender: userId,
      receiver: buddyId,
      text: message
    };

    socket.current.emit("Send Message", chatId, body);
    setMessage("");
  }

  return (
    <div className="container-buddy-chat">
      <div className="container-buddy-messages">
        {messages.map((m) => (
          <div ref={scrollRef} key={m._id}>
            <BuddyMessage message={m} userId={userId} />
          </div>
        ))}
      </div>
      <div className="container-buddy-bottom">
        <form className="chat-input-form">
          <TextareaAutosize
            className="chat-input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
          <button
            className="chat-send-btn"
            type="submit"
            onClick={(e) => sendMessage(e)}
          >
            Send
          </button>
      </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    messages: state.buddy.chat,
    chatId: state.buddy.object.chatId,
    userId: state.auth.user._id,
    buddyId: state.buddy.object.buddy
  }
}

export default connect(mapStateToProps, { fetchChat, messageSent })(BuddyChat);
