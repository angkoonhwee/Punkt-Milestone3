import React, { useState, useEffect } from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import Rightbar from "../../components/rightbar/Rightbar";
import "./main.css";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import axios from "axios";
import { useParams } from "react-router-dom";
import { url } from "../../utils/constants";

function Main() {
  return (
    <>
      <NavbarMain />
      <div className="container-success">
        <Feed page="main" />
        <Rightbar />
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}

export default Main;
