import React, { useEffect } from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import Rightbar from "../../components/rightbar/Rightbar";
import "./main.css";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import Loading from "../loading/Loading";

//redux
import { connect } from "react-redux";
import { fetchMyPosts } from "../../redux/actions/posts";

function Main({ posts, fetchMyPosts }) {
  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);
  //fetchMyPosts();

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
  return {
    posts: state.posts.main
  }
}

export default connect(mapStateToProps, { fetchMyPosts })(Main);
