import React from "react";
import { Link } from "react-router-dom";

export default function LeaderboardSec({ user }) {
  return (
    <div className="container-leaderboard-sec">
      <div className="balloon-sec">
        <Link to={`/profile/${user.username}`}>
          <img
            className="sec-dp"
            alt="sec-dp"
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/img/defaultDP.svg"
            }
          />
        </Link>
        <p className="leaderboard-username">{user.username}</p>
        <h4>{user.productivityPoints} points</h4>
        <div className="balloon-sec-btm">
          <p>2</p>
        </div>
      </div>
      <div className="vert-line-sec"></div>
    </div>
  );
}
