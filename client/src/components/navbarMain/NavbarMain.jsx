import React, { useState } from "react";
import "./navbarMain.css";
import SettingsIcon from "@material-ui/icons/Settings";
import ExploreIcon from "@material-ui/icons/Explore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import Notifications from "../notifications/Notifications";

//redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

function NavbarMain({ user, logout }) {
  const [hoverIcon, setHoverIcon] = useState("");

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a 
          className="navbar-brand" 
          id="punkt" 
          href="/"
          onMouseEnter={() => setHoverIcon("Main")}
          onMouseLeave={() => setHoverIcon("")}
          style={{ position: "relative" }}
        >
          Punkt.
          {hoverIcon === "Main" && (
            <div className="navbar-hover-icon main">{hoverIcon}</div>
          )}
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
              <Link
                style={{ textDecoration: "none", position: "relative" }}
                to="/explore"
                onMouseEnter={() => setHoverIcon("Explore")}
                onMouseLeave={() => setHoverIcon("")}
              >
                <div className="nav-link navbar-link-item">
                  <ExploreIcon className="searchIcon navbar-icon" />
                  <p className="nav-name">Explore</p>
                </div>
                {hoverIcon === "Explore" && (
                  <div className="navbar-hover-icon explore">{hoverIcon}</div>
                )}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                style={{ textDecoration: "none", position: "relative" }}
                to="/speculate"
                onMouseEnter={() => setHoverIcon("Speculate")}
                onMouseLeave={() => setHoverIcon("")}
              >
                <div className="nav-link navbar-link-item">
                  <MonetizationOnIcon className="searchIcon navbar-icon" />
                  <p className="nav-name">Speculate</p>
                </div>
                {hoverIcon === "Speculate" && (
                  <div className="navbar-hover-icon speculate">{hoverIcon}</div>
                )}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                style={{ textDecoration: "none", position: "relative" }}
                to="/leaderboard"
                onMouseEnter={() => setHoverIcon("Leaderboard")}
                onMouseLeave={() => setHoverIcon("")}
              >
                <div className="nav-link navbar-link-item">
                  <i className="fas fa-trophy searchIcon navbar-icon" />
                  <p className="nav-name">Leaderboard</p>
                </div>
                {hoverIcon === "Leaderboard" && (
                  <div className="navbar-hover-icon leaderboard">
                    {hoverIcon}
                  </div>
                )}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                style={{ textDecoration: "none", position: "relative" }}
                to="/buddy"
                onMouseEnter={() => setHoverIcon("Buddy")}
                onMouseLeave={() => setHoverIcon("")}
              >
                <div className="nav-link navbar-link-item">
                  <i className="fas fa-user-friends searchIcon navbar-icon" />
                  <p className="nav-name">Buddy</p>
                </div>
                {hoverIcon === "Buddy" && (
                  <div className="navbar-hover-icon buddy">{hoverIcon}</div>
                )}
              </Link>
            </li>

            <li className="nav-item">
              <Notifications
                hoverIcon={hoverIcon}
                setHoverIcon={setHoverIcon}
              />
            </li>

            <li className="nav-item">
              <Link
                style={{ textDecoration: "none", position: "relative" }}
                to="/settings"
                onMouseEnter={() => setHoverIcon("Settings")}
                onMouseLeave={() => setHoverIcon("")}
              >
                <div className="nav-link navbar-link-item">
                  <SettingsIcon className="searchIcon navbar-icon" />
                  <p className="nav-name">Settings</p>
                </div>
                {hoverIcon === "Settings" && (
                  <div className="navbar-hover-icon settings">{hoverIcon}</div>
                )}
              </Link>
            </li>

            <li className="nav-item">
            <div
                className="nav-link navbar-link-item"
                onClick={handleLogout}
                onMouseEnter={() => setHoverIcon("Logout")}
                onMouseLeave={() => setHoverIcon("")}
                style={{ position: "relative" }}
              >
                <ExitToAppIcon className="searchIcon navbar-icon" />
                <p className="nav-name">Logout</p>
                {hoverIcon === "Logout" && (
                  <div className="navbar-hover-icon logout">{hoverIcon}</div>
                )}
              </div>
            </li>

            <li className="nav-item">
              <Link
                style={{ textDecoration: "none", position: "relative" }}
                to={`/profile/${user.username}`}
                onMouseEnter={() => setHoverIcon("Profile")}
                onMouseLeave={() => setHoverIcon("")}
              >
                <div className="nav-link navbar-link-item" id="profileDiv">
                  <img
                    className="profilePic"
                    src={
                      user.profilePicture !== ""
                        ? user.profilePicture
                        : "/assets/img/defaultDP.svg"
                    }
                    alt="Profile-Pic"
                  />
                  <p className="nav-name">
                    <strong>{user.username}</strong>
                  </p>
                </div>
                {hoverIcon === "Profile" && (
                  <div className="navbar-hover-icon profile">{hoverIcon}</div>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = state => {
  return { user: state.auth.user };
}

export default connect(mapStateToProps, { logout })(NavbarMain);
