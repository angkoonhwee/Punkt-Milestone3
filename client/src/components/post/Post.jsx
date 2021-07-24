import React, { useState, useEffect } from "react";
import "./post.css";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Fab from "@material-ui/core/Fab";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { TextareaAutosize } from "@material-ui/core";
import ImgActive from "./ImgActive";
import ImgRest from "./ImgRest";
import Comment from "./Comment";
import Report from "../report/Report";
import DeleteIcon from "@material-ui/icons/Delete";
import FaceIcon from "@material-ui/icons/Face";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

//animation
import { motion } from "framer-motion";

//redux
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/user";
import {
  deletePost,
  likePost,
  fetchAllPosts,
  fetchGoalPosts,
  fetchMyPosts,
  fetchSpeculatingPosts
} from "../../redux/actions/posts";
import {
  fetchComments,
  createComment
} from "../../redux/actions/comments";

/* *********************************************************************** */

function Post({
  post,
  allPosts,
  currUser,
  deletePost,
  fetchComments,
  createComment,
  comments,
  likePost
}) {
  const [isLit, setIsLit] = useState(false);
  const [numLit, setNumLit] = useState(post.lits?.length);
  const [isCommenting, setIsCommenting] = useState(false);
  const [numComment, setNumComment] = useState(post.comments?.length);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [goal, setGoal] = useState({});
  const [isBetAgainst, setBetAgainst] = useState([]);


  //console.log(post);
  useEffect(() => {
    //console.log("user has been set!");
    //console.log(post);
    setUser(post.user);
  }, [post.user, fetchUser]);

  useEffect(() => {
    setIsLit(post.lits.includes(currUser._id));
  }, [currUser._id, post.lits]);

  //post's goal
  useEffect(() => {
    if (post.goal) {
      setGoal(post.goal)
    }
  }, [post.goal]);

  //post's bet
  useEffect(() => {
    if (goal._id && currUser._id) {
      setBetAgainst(goal.usersBetAgainst.includes(currUser._id));
      //console.log(isBetAgainst);
    }
  }, [goal._id, currUser._id]);

  useEffect(() => {
    if (post.comments.length > 0) {
      fetchComments(post._id);
    }
  }, [post, fetchComments]);

  useEffect(() => {
    if (comments.length > 0) {
      const temp = comments.filter(comm => comm.postId === post._id);
      //console.log(temp);
      if (temp.length !== 0) {
        setAllComments(temp[0].comments);
      }
    };
  }, [comments]);

  const currDays = goal?.madeAtonement
    ? goal?.postIds?.length - 1
    : goal?.postIds?.length;
  const totalDays = goal?.numDays;

  function handleLit() {
    likePost(post._id, { userId: currUser._id });
    setNumLit(isLit ? numLit - 1 : numLit + 1);
    setIsLit(!isLit);
  }

  function submitComment(event) {
    event.preventDefault();
    const body = {
      userId: currUser._id,
      postId: post._id,
      content: comment,
    }
    createComment(post._id, body);
    setNumComment(numComment + 1);
    setComment("");
  };

  function onDelete() {
    deletePost(post._id, { data: currUser });
  }

  return (
    <div
      className="post"
    // layout
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // transition={{ duration: 1.5 }}
    >
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/profile/${user.username}`}>
              <img
                // src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/img/defaultDP.svg"
                }
                alt="profilePic"
                className="profilePic post-profile"
              />
            </Link>
            <div className="profile-name-date">
              <p className="post-name">
                {/* {Users.filter((u) => u.id === post.userId)[0].username} */}
                {user.username}
              </p>
              <p className="post-date">{format(post.createdAt)}</p>
            </div>
          </div>

          <div className="post-top-right">
            {currUser._id === post.userId ? (
              <DeleteIcon
                onClick={() => goal.status === "In Progress" ? onDelete() : null}
                style={{
                  cursor:
                    goal.status === "In Progress"
                      ? "pointer"
                      : "not-allowed",
                  color:
                    goal.status === "In Progress"
                      ? "#16697a"
                      : "gray"
                }}
              />
            ) : (
              <Report post={post} />
            )}
          </div>
        </div>
        <div className="post-middle">
          <p>{post?.desc}</p>

          <div
            id="post-imgs"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {post.img?.map((p, index) => {
                return index === 0 ? (
                  <ImgActive key={index} image={p} />
                ) : (
                  <ImgRest key={index} image={p} />
                );
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#post-imgs"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#post-imgs"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <Link to={"/progress/" + goal?._id} style={{ textDecoration: "none" }}>
          <div className="post-goal-section">
            <div className="post-goal-content">
              <div className="goal-bet-amount">
                <p>
                  <strong>Atonement: </strong>
                  {goal?.atonement}
                </p>
              </div>
              <div className="goal-title">
                <p>
                  <strong>Goal: </strong>
                  {goal?.title}
                </p>
              </div>
            </div>
            <div className="goal-progress">
              <p>
                <strong>Progress: </strong>
                {currDays + " / " + totalDays}
              </p>
            </div>
          </div>
        </Link>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <div className="post-bottom-left-btn">
              <Fab
                id="fire-icon"
                onClick={handleLit}
                style={{
                  backgroundColor: isLit ? "rgb(255 101 132)" : "#95c9d4b0",
                }}
              >
                <WhatshotIcon />
              </Fab>
              <p className="post-lit-counter">{numLit} lits</p>
            </div>

            <div className="post-bottom-left-btn">
              <Fab
                id="comment-icon"
                onClick={() => setIsCommenting(!isCommenting)}
                style={{
                  backgroundColor: isCommenting ? "#daa078fa" : "#95c9d4b0",
                }}
              >
                <ModeCommentIcon />
              </Fab>
              <p className="post-lit-counter"> {numComment} comments</p>
            </div>

            <div className="post-bottom-left-btn">
              <Fab
                id="fire-icon"
                style={{
                  backgroundColor: isBetAgainst
                    ? "rgb(201, 90, 90)"
                    : "#95c9d4b0",
                }}
              >
                <FaceIcon />
              </Fab>
              <p className="post-lit-counter">
                {goal?.usersBetAgainst?.length} bets
              </p>
            </div>
          </div>
          <div className="post-comment">
            {isCommenting && (
              <div>
                {allComments?.map((c, index) => (
                  <Comment key={index} comm={c} />
                ))}

                <form className="comment-form" onSubmit={submitComment}>
                  <div className="comment-container">
                    <TextareaAutosize
                      name="postComment"
                      value={comment}
                      className="comment-area"
                      placeholder="Write your comments"
                      onChange={(event) => setComment(event.target.value)}
                      required
                    // ref={comm}
                    />
                    <button type="submit">Comment</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    comments: state.comments,
    allPosts: state.posts
  };
}

export default connect(
  mapStateToProps,
  {
    deletePost,
    fetchComments,
    createComment,
    likePost,
    fetchAllPosts,
    fetchMyPosts,
    fetchGoalPosts,
    fetchSpeculatingPosts,
  })(Post);
