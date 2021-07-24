import React, { useEffect } from "react";
import "./progressTimeline.css";
import Post from "../post/Post";
import Loading from "../../pages/loading/Loading";

//redux
import { connect } from "react-redux";
import { fetchGoalPosts } from "../../redux/actions/posts";
import { fetchGoalById } from "../../redux/actions/goals";


function ProgressTimeline({ posts, goalId, fetchGoalPosts }) {

  //to get posts for goal
  useEffect(() => {
    if (goalId) {
      fetchGoalPosts(goalId);
    }
  }, [fetchGoalPosts, goalId]);

  return (posts
    ? <div className="progress-timeline">
      <h2>Progress</h2>

      {posts.map((p, index) => (
        <div key={p._id} className="progress-post">
          <div className="status-day">
            {p.atonement
              ? "Atonement"
              : `Day ${posts.length - index}`
            }
          </div>
          <Post post={p} />
        </div>
      ))}</div>
    : <Loading />
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts.goals
  };
}

export default connect(mapStateToProps, { fetchGoalPosts, fetchGoalById })(ProgressTimeline)