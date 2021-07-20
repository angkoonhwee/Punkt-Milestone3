import React from "react";
import { Link } from "react-router-dom";

export default function LeaderboardOthers({ user, index }) {
  return (
    <div className="container-leaderboard-other">
      <div className="leaderboard-other">
        <h5 className="leaderboard-other-username">{4 + index}</h5>
        <Link to={`/profile/${user.username}`}>
          <img
            className="other-dp"
            alt="other-dp"
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/img/defaultDP.svg"
            }
          />
        </Link>
        <h5 className="leaderboard-other-username">{user.username}</h5>
      </div>
      <div>
        <h5 className="other-points">{user.productivityPoints}</h5>
      </div>
    </div>
  );
}