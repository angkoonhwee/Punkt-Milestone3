import React, { useState, useEffect } from "react";
import "./post.css";
import axios from "axios";
import { format } from "timeago.js";
import { url } from "../../utils/constants";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { motion } from "framer-motion";

//redux
import { connect } from "react-redux";

function Comment({ comm, currUser }) {
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(comm.likes.length);

  //console.log(comm);
  useEffect(() => {
    //console.log("COMMENT USEEFFECT");
    setUser(comm.user);
    //console.log(user);
  }, [comm.user]);

  useEffect(() => {
    setIsLiked(comm.likes.includes(currUser._id));
  }, [currUser, comm.likes]);

  function handleLike() {
    try {
      axios.put(url + "/comment/" + comm._id + "/like", {
        userId: currUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setNumLikes(isLiked ? numLikes - 1 : numLikes + 1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="comment-wrapper">
      <div className="post-user-comments">
        <img
          className="profilePic"
          src={
            user.profilePicture
              ? user.profilePicture
              : "/assets/img/defaultDP.svg"
          }
          alt="profile-pic"
        />

        <div className="comment-content">
          <p>
            <strong>{user.username}</strong>
            <span className="post-date">{format(comm.createdAt)}</span>
          </p>

          <p>{comm.content}</p>
        </div>
      </div>
      <div className="comment-like">
        <FavoriteIcon
          onClick={handleLike}
          style={{ color: isLiked ? "#ff9d99" : "#c1c1c1" }}
        />
        <p className="comment-like-count post-date">{numLikes}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currUser: state.auth.user
  };
};

export default connect(mapStateToProps)(Comment);