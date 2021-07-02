import React from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import Rightbar from "../../components/rightbar/Rightbar";
import ScrollTop from "../../components/scrollTop/ScrollTop";

export default function ExplorePage() {
  return (
    <>
      <NavbarMain />
      <div className="container-success">
        <Feed page="explore" />
        <Rightbar />
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}
