import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { format } from "timeago.js";
import { url } from "../../utils/constants";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { motion } from "framer-motion";

export default function Comment({ comm }) {
  const [user, setUser] = useState({});
  const { user: currUser } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(comm.likes.length);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(url + `/user?userId=${comm.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [comm.userId]);

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
      <motion.div
        className="post-user-comments"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
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
      </motion.div>
      <div className="comment-like">
        <FavoriteIcon
          onClick={handleLike}
          style={{ color: isLiked ? "#ff9d99" : "#c1c1c1" }}
        />
        <p className="comment-like-count post-date">{numLikes}</p>
      </div>
    </div>
  );
}
