import React, { useContext, useState, useEffect } from "react";
import "./settings.css";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import Footer from "../../components/footer/Footer";
import BetsTable from "../../components/betsTable/BetsTable";
import GoalsTable from "../../components/goalsTable/GoalsTable";
import BuddyTable from "../../components/buddyTable/BuddyTable";
import { UserContext } from "../../context/UserContext";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import UserInfo from "../../components/userInfo/UserInfo";
import EditProfile from "../../components/editProfile/EditProfile";
import { motion } from "framer-motion";
import UploadFile from "../../components/uploadFile/UploadFile";

export default function Settings() {
  const { user, dispatch } = useContext(UserContext);
  const [isBetTableClicked, setBetTableClicked] = useState(true);
  const [isGoalTableClicked, setGoalTableClicked] = useState(true);
  const [isBuddyTableClicked, setBuddyTableClicked] = useState(true);
  const [isFinancesClicked, setFinancesClicked] = useState(true);
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
                    dispatch={dispatch}
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
              dispatch={dispatch}
              setIsEditing={setIsEditing}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {user.bio && <UserInfo field={"Bio"} data={user.bio} />}
              {user.school && <UserInfo field={"School"} data={user.school} />}
              {user.major && <UserInfo field={"Major"} data={user.major} />}
              {user.yearOfStudy && (
                <UserInfo field={"Year of Study"} data={user.yearOfStudy} />
              )}
              {user.currentModules && (
                <UserInfo
                  field={"Current Modules"}
                  data={user.currentModules}
                />
              )}
              {user.instagram && (
                <UserInfo field={"Instagram"} data={user.instagram} />
              )}
              {user.linkedIn && (
                <UserInfo field={"LinkedIn"} data={user.linkedIn} />
              )}
              {user.github && <UserInfo field={"Github"} data={user.github} />}
            </motion.div>
          )}
        </div>
        <div className="container-table">
          <div className="table-title">
            <h2>My Finances</h2>
            <ArrowDropDownCircleIcon
              fontSize="large"
              onClick={() => setFinancesClicked(!isFinancesClicked)}
              style={{
                opacity: 0.9,
                color: isFinancesClicked ? "#267b99" : "rgb(175, 175, 175)",
              }}
            />
          </div>
          <hr />

          {isFinancesClicked && (
            <div className="container-finances">
              <h5 className="finances-subtitle">
                <strong>Total Amount Won: </strong>${" "}
                {user.totalAmtWon.toFixed(2)}
              </h5>
              <h5 className="finances-subtitle">
                <strong>Total Amount Lost: </strong>${" "}
                {user.totalAmtLost.toFixed(2)}
              </h5>
              <h5 className="finances-subtitle">
                <strong>Nett Amount: </strong>${" "}
                {(user.totalAmtWon - user.totalAmtLost).toFixed(2)}
              </h5>
              <h5 className="finances-subtitle">
                <strong>Current Amount: </strong>$ {user.currAmt.toFixed(2)}
              </h5>
            </div>
          )}
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
          {isBetTableClicked && <BetsTable />}
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
          {isGoalTableClicked && <GoalsTable />}
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
          {isBuddyTableClicked && <BuddyTable />}
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}
