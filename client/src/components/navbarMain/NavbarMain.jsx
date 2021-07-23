import React from "react";
import "./navbarMain.css";
import MessageIcon from "@material-ui/icons/Message";
import SettingsIcon from "@material-ui/icons/Settings";
import ExploreIcon from "@material-ui/icons/Explore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PublicIcon from "@material-ui/icons/Public";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { logoutCall } from "../../apiCalls";
import Notifications from "../notifications/Notifications";

//redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

function NavbarMain({ user, logout }) {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" id="punkt" href="/">
          Punkt.
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Searchbar />
            </li>

            <li className="nav-item">
              <Link style={{ textDecoration: "none" }} to="/explore">
                <div className="nav-link navbar-link-item" title="Explore">
                  <ExploreIcon className="searchIcon navbar-icon" />
                  {/* <span className="navbar-icon-badge"></span> */}
                  <p className="nav-name">Explore</p>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link style={{ textDecoration: "none" }} to="/speculate">
                <div className="nav-link navbar-link-item" title="Speculating">
                  <MonetizationOnIcon className="searchIcon navbar-icon" />
                  {/* <span className="navbar-icon-badge"></span> */}
                  <p className="nav-name">Speculating</p>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link style={{ textDecoration: "none" }} to="/leaderboard">
                <div className="nav-link navbar-link-item" title="Leaderboard">
                  <PublicIcon className="searchIcon navbar-icon" />
                  {/* <span className="navbar-icon-badge"></span> */}
                  <p className="nav-name">Leaderboard</p>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link style={{ textDecoration: "none" }} to="/buddy">
                <div className="nav-link navbar-link-item" title="Messages">
                  <MessageIcon className="searchIcon navbar-icon" />
                  {/* <span className="navbar-icon-badge"></span> */}
                  <p className="nav-name">Messages</p>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Notifications />
            </li>

            <li className="nav-item">
              <Link style={{ textDecoration: "none" }} to="/settings">
                <div className="nav-link navbar-link-item" title="Settings">
                  <SettingsIcon className="searchIcon navbar-icon" />
                  <p className="nav-name">Settings</p>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <div
                className="nav-link navbar-link-item"
                title="Logout"
                onClick={handleLogout}
              >
                <ExitToAppIcon className="searchIcon navbar-icon" />
                <p className="nav-name">Logout</p>
              </div>
            </li>

            <li className="nav-item">
              <Link
                style={{ textDecoration: "none" }}
                to={`/profile/${user.username}`}
              >
                <div className="nav-link navbar-link-item" id="profileDiv">
                  {/* <p>🦄</p> */}
                  <img
                    className="profilePic"
                    src={
                      user.profilePicture !== ""
                        ? user.profilePicture
                        : "/assets/img/defaultDP.svg"
                    }
                    alt="Profile-Pic"
                  />
                  {/* {console.log(PublicImg + user.profilePicture)} */}
                  <p className="nav-name">
                    <strong>{user.username}</strong>
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* <img src="/assets/img/buddy.svg" /> */}
    </div>
  );
}

const mapStateToProps = state => {
  return { user: state.auth.user };
}

export default connect(mapStateToProps, { logout })(NavbarMain);
