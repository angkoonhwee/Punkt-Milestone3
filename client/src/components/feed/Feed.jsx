import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./feed.css";
import ReactPaginate from "react-paginate";

function Feed({ posts }) {
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
    setPageCount(Math.ceil(posts.length / postsPerPage));
    setDisplayPosts(
      posts
        .slice(postsVisited, postsVisited + postsPerPage)
    );
  }, [posts, postsVisited]);
  

  
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
