import React, { useEffect } from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import Rightbar from "../../components/rightbar/Rightbar";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import Loading from "../loading/Loading";

//redux
import { connect } from "react-redux";
import { fetchAllPosts } from "../../redux/actions/posts";

function ExplorePage({ posts, fetchAllPosts }) {

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  return (
    <>
      <NavbarMain />
      <div className="container-success">
        {posts ? <Feed posts={posts} /> : <Loading />}
        {posts && <Rightbar />}
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}

const mapStateToProps = state => {
  return { posts: state.posts.explore };
}

export default connect(mapStateToProps, { fetchAllPosts })(ExplorePage);
