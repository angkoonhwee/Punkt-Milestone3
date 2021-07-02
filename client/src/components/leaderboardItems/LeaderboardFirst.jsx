import React from "react";
import "./leaderboardItems.css";

export default function LeaderboardFirst() {
  return (
    <div className="container-leaderboard-first">
      <div className="balloon-first">
        <img
          className="first-dp"
          alt="first-dp"
          src="/assets/img/among-nature.svg"
        />
        <p className="leaderboard-username">username</p>
        <h4>1231 points</h4>
        <div className="balloon-first-btm">
          <p>1</p>
        </div>
      </div>
      <div className="vert-line-first"></div>
    </div>
  );
}
