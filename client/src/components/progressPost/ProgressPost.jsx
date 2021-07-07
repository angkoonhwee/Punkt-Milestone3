import React from "react";
import "./progressPost.css";
import Post from "../post/Post";

export default function ProgressPost({ pPost, onDelete, index, goal }) {
  return (
    <div className="progress-post">
      {goal.madeAtonement && index === goal.postIds.length ? (
        <div className="status-day">Atonement</div>
      ) : (
        <div className="status-day">{`Day ${index}`}</div>
      )}

      <Post post={pPost} onDelete={onDelete} />
    </div>
  );
}
