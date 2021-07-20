import React, { useState } from "react";
import "./settings.css";

import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import Footer from "../../components/footer/Footer";
import BetsTable from "../../components/betsTable/BetsTable";
import GoalsTable from "../../components/goalsTable/GoalsTable";
import BuddyTable from "../../components/buddyTable/BuddyTable";

import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import EditProfile from "../../components/editProfile/EditProfile";
import UploadFile from "../../components/uploadFile/UploadFile";
import SettingsInfo from "../../components/settingsInfo/SettingsInfo";

//redux
import { connect } from "react-redux";

function Settings({ user }) {
  const [isBetTableClicked, setBetTableClicked] = useState(false);
  const [isGoalTableClicked, setGoalTableClicked] = useState(false);
  const [isBuddyTableClicked, setBuddyTableClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);

  return (
    <>
      <NavbarMain />
      <div className="container-settings">
        <div className="basic-setting-wrapper">
          <div className="basic-setting">
            <div className="profile-pic-setting">
              <div className="change-dp-setting-wrapper">
                <img
                  alt="change-profile-pic"
                  src={
                    user.profilePicture !== ""
                      ? user.profilePicture
                      : "/assets/img/defaultDP.svg"
                  }
                />
                <label className="change-dp-label">
                  <input
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    className="change-dp-input"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div className="change-dp">
                    <CameraAltIcon
                      style={{
                        position: "absolute",
                        left: "17%",
                        top: "17%",
                      }}
                    />
                  </div>
                </label>
                {file && (
                  <UploadFile
                    file={file}
                    setFile={setFile}
                    user={user}
                    pic={"profilePicture"}
                  />
                )}
              </div>
            </div>
            <div className="info-setting">
              <h4 className="user-info-username">
                <strong>{user.username}</strong>
              </h4>
              {!isEditing && (
                <button
                  className="edit-profile"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          {isEditing ? (
            <EditProfile
              user={user}
              setIsEditing={setIsEditing}
            />
          ) : (
            <SettingsInfo user={user} />
          )}
        </div>
        <div className="container-table">
          <div className="table-title">
            <h2>My Goals</h2>
            <ArrowDropDownCircleIcon
              fontSize="large"
              onClick={() => setGoalTableClicked(!isGoalTableClicked)}
              style={{
                opacity: 0.9,
                color: isGoalTableClicked ? "#267b99" : "rgb(175, 175, 175)",
              }}
            />
          </div>
          <hr />
          {isGoalTableClicked && <GoalsTable user={user} />}
        </div>

        <div className="container-table">
          <div className="table-title">
            <h2>My Bets</h2>
            <ArrowDropDownCircleIcon
              fontSize="large"
              onClick={() => setBetTableClicked(!isBetTableClicked)}
              style={{
                opacity: 0.9,
                color: isBetTableClicked ? "#267b99" : "rgb(175, 175, 175)",
              }}
            />
          </div>
          <hr />
          {isBetTableClicked && <BetsTable user={user} />}
        </div>

        <div className="container-table">
          <div className="table-title">
            <h2>My Buddy History</h2>
            <ArrowDropDownCircleIcon
              fontSize="large"
              onClick={() => setBuddyTableClicked(!isBuddyTableClicked)}
              style={{
                opacity: 0.9,
                color: isBuddyTableClicked ? "#267b99" : "rgb(175, 175, 175)",
              }}
            />
          </div>
          <hr />
          {isBuddyTableClicked && <BuddyTable user={user} />}
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Settings);