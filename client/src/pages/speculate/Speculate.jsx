import React from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import Rightbar from "../../components/rightbar/Rightbar";
import ScrollTop from "../../components/scrollTop/ScrollTop";

export default function Speculate() {
  return (
    <>
      <NavbarMain />
      <div className="container-success">
        <Feed page="speculate" />
        <Rightbar />
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}
