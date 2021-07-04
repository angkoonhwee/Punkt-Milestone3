import React from "react";
import "./leaderboardItems.css";
import { Link } from "react-router-dom";

export default function LeaderboardFirst({ user }) {
  return (
    <div className="container-leaderboard-first">
      <div className="balloon-first">
        <Link to={`/profile/${user.username}`}>
          <img
            className="first-dp"
            alt="first-dp"
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/img/defaultDP.svg"
            }
          />
        </Link>
        <p className="leaderboard-username">{user.username}</p>
        <h4>{user.productivityPoints} points</h4>
        <div className="balloon-first-btm">
          <p>1</p>
        </div>
      </div>
      <div className="vert-line-first"></div>
    </div>
  );
}
