import React, { useState, useEffect, useContext } from "react";
// import { Posts } from "../../dummyDate";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { url } from "../../utils/constants";

function Feed({ username, page }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(url + "/post/profile/" + username) // profile page render user's own posts
        : page === "main"
        ? await axios.get(url + "/post/main/" + user._id) // main page render user and followings posts
        : page === "explore"
        ? await axios.get(url + "/post") //explore page render all posts
        : await axios.get(url + "/post/speculate/" + user._id); // speculate page that render posts for which user has bet for the goal
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [username, user, page]);
  // username, user._id, page,
  return (
    <div className="feed">
      <div className="feed-wrapper">
        {posts?.map((p) => (
          <Post key={p._id} post={p} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
}

export default Feed;
