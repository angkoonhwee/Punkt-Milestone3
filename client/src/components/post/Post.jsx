import React, { useState, useEffect, useContext } from "react";
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
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { url } from "../../utils/constants";

/* *********************************************************************** */

export default function Post({ post }) {
  const [isLit, setIsLit] = useState(false);
  const [numLit, setNumLit] = useState(post.lits?.length);
  const [isCommenting, setIsCommenting] = useState(false);
  const [numComment, setNumComment] = useState(post.comments?.length);
  const [comment, setComment] = useState("");
  const [isBetAgainst, setBetAgainst] = useState(false);
  const [user, setUser] = useState({});
  const { user: currUser } = useContext(UserContext);
  const [allComments, setAllComments] = useState([]);
  const [goal, setGoal] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(url + `/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLit(post.lits.includes(currUser._id));
  }, [currUser, post.lits]);
  // currUser._id

  useEffect(() => {
    const fetchGoal = async () => {
      if (post.goalId) {
        // console.log("goalid: " + user.goalId);
        const res = await axios.get(url + "/goal/" + post.goalId);
        setGoal(res.data);
      }
    };
    fetchGoal();
  }, [post.goalId]);

  useEffect(() => {
    const fetchBetAgainst = async () => {
      try {
        if (goal._id && currUser._id) {
          const res = await axios.get(
            url + "/goal/" + goal._id + "/bet-against/" + currUser._id
          );

          setBetAgainst(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBetAgainst();
  }, [goal, currUser._id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (post.comments.length > 0) {
          const res = await axios.get(url + "/comment/post/" + post._id);

          setAllComments(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [post.comments, post._id]);

  const currDays = goal?.postIds?.length;
  const totalDays = goal?.numDays;

  function handleLit() {
    try {
      axios.put(url + "/post/" + post._id + "/like", { userId: currUser._id });
    } catch (err) {
      console.log(err);
    }
    setNumLit(isLit ? numLit - 1 : numLit + 1);
    setIsLit(!isLit);
  }

  async function submitComment(event) {
    event.preventDefault();
    try {
      await axios.post(url + "/comment", {
        userId: currUser._id,
        postId: post._id,
        content: comment,
      });
      const res = await axios.get(url + "/comment/post/" + post._id);

      setAllComments(res.data);
      setNumComment(numComment + 1);
    } catch (err) {
      console.log(err);
    }

    setComment("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setComment(value);
  }

  async function deletePost(postId) {
    try {
      await axios.delete(url + "/post/" + postId, { data: currUser });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  // function handleKeyPress(event) {
  //   console.log("onsubmit" + onsubmit);
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     // submitComment(onsubmit);
  //   }
  // }

  return (
    <div className="post">
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
                onClick={() => deletePost(post._id)}
                style={{ cursor: "pointer", color: "#16697a" }}
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
}
