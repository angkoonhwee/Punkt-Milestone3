import React, { useState, useRef, useEffect } from "react";
import "./buddyChat.css";
import BuddyMessage from "./BuddyMessage";
import BuddyChatInput from "./BuddyChatInput";

export default function BuddyChat() {
  const [name, setName] = useState("john");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "test", user: "jane" },
    { text: "test from jane", user: "jane" },
    { text: "test from john", user: "john" },
    {
      text: "This div contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.",
      user: "john",
    },
    {
      text: "This div contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.",
      user: "john",
    },
    {
      text: "This div contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.",
      user: "john",
    },
    {
      text: "This div contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.",
      user: "john",
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      user: "jane",
    },
  ]);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container-buddy-chat">
      <div className="container-buddy-messages">
        {messages.map((m, index) => (
          <div ref={scrollRef} key={index}>
            <BuddyMessage message={m} name={name} />
          </div>
        ))}
      </div>
      <div className="container-buddy-bottom">
        <BuddyChatInput />
      </div>
    </div>
  );
}
