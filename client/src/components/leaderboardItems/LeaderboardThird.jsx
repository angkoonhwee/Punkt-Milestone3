import React from "react";
import { Link } from "react-router-dom";

export default function LeaderboardThird({ user }) {
  return (
    <div className="container-leaderboard-third">
      <div className="balloon-third">
        <Link to={`/profile/${user.username}`}>
          <img
            className="third-dp"
            alt="third-dp"
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/img/defaultDP.svg"
            }
          />
        </Link>
        <p className="leaderboard-username">{user.username}</p>
        <h4>{user.productivityPoints} points</h4>
        <div className="balloon-third-btm">
          <p>3</p>
        </div>
      </div>
      <div className="vert-line-third"></div>
    </div>
  );
}
