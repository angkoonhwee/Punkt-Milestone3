import React from "react";

export default function LeaderboardOthers() {
  return (
    <div className="container-leaderboard-other">
      <div className="leaderboard-other">
        <h5 className="leaderboard-other-username">4</h5>
        <img
          className="other-dp"
          alt="other-dp"
          src="/assets/img/well-done.svg"
        />
        <h5 className="leaderboard-other-username">Username</h5>
      </div>
      <div>
        <h5 className="other-points">905</h5>
      </div>
    </div>
  );
}
