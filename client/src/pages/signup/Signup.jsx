import React from "react";
import "./signup.css";
import Footer from "../../components/footer/Footer";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import LoginSignupForms from "../../components/loginSignupForms/LoginSignupForms";
import LoginSignupPanels from "../../components/loginSignupForms/LoginSignupPanels";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

function Signup({ isAuthenticated }) {
  if(isAuthenticated) {
    return <Redirect to="/main" /> 
  }
  return (
    <>
      <NavbarHome />
      <div className="container-main signup-mode">
        <LoginSignupForms />
        <LoginSignupPanels />
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(Signup);
