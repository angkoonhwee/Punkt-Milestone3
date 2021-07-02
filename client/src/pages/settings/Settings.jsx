import React, { useContext, useState } from "react";
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

export default function Settings() {
  const { user } = useContext(UserContext);
  const PublicImg = process.env.REACT_APP_PUBLIC_URL;
  const [isBetTableClicked, setBetTableClicked] = useState(true);
  const [isGoalTableClicked, setGoalTableClicked] = useState(true);
  const [isBuddyTableClicked, setBuddyTableClicked] = useState(true);
  const [isFinancesClicked, setFinancesClicked] = useState(true);

  return (
    <>
      <NavbarMain />
      <div className="container-settings">
        <div className="basic-setting">
          <div className="profile-pic-setting">
            <div className="change-dp-setting-wrapper">
              <img
                alt="change-profile-pic"
                src={
                  user.profilePicture !== ""
                    ? PublicImg + user.profilePicture
                    : "/assets/img/defaultDP.svg"
                }
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
            </div>
          </div>
          <div className="info-setting">
            <div className="user-info">
              <h4 style={{ fontWeight: "700", marginRight: "10px" }}>
                Username:{" "}
              </h4>
              <h4> {user.username}</h4>
            </div>
            <div className="user-info">
              <h4 style={{ fontWeight: "700", marginRight: "10px" }}>Rank: </h4>
              <h4> #{user.rank}</h4>
            </div>
          </div>
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
