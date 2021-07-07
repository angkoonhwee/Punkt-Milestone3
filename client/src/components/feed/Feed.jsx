import React, { useState, useEffect, useContext } from "react";
// import { Posts } from "../../dummyDate";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { url } from "../../utils/constants";
import ReactPaginate from "react-paginate";

function Feed({ username, page }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  // PAGINATION
  const [pageNum, setPageNum] = useState(0);
  const postsPerPage = 5;
  const postsVisited = pageNum * postsPerPage;
  const [pageCount, setPageCount] = useState(
    Math.ceil(posts.length / postsPerPage)
  );
  const [displayPosts, setDisplayPosts] = useState(
    posts.slice(postsVisited, postsVisited + postsPerPage)
  );

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(url + "/post/profile/" + username) // profile page render user's own posts
          : page === "main"
          ? await axios.get(url + "/post/main/" + user._id) // main page render user and followings posts
          : page === "explore"
          ? await axios.get(url + "/post") //explore page render all posts
          : await axios.get(url + "/post/speculate/" + user._id); // speculate page that render posts for which user has bet for the goal

        const sortedPosts = res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        );
        setPosts(sortedPosts);
        setPageCount(Math.ceil(res.data.length / postsPerPage));
        setDisplayPosts(
          sortedPosts.slice(postsVisited, postsVisited + postsPerPage)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username, user, page, postsVisited]);
  // username, user._id, page,

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {/* modified posts to displayPosts */}
        {!displayPosts || displayPosts.length === 0 ? (
          <div className="no-post-feed">
            <img alt="no-post-img" src="/assets/img/social-update.svg" />
            No posts yet
          </div>
        ) : (
          displayPosts?.map((p) => <Post key={p._id} post={p} />)
        )}
        <div className="paginate-wrapper">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination-btn"}
            previousLinkClassName={"prev-btn"}
            nextLinkClassName={"next-btn"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Feed;
