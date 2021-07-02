import React, { useEffect, useState, useContext } from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Add, Remove, GroupAdd, EmojiPeople } from "@material-ui/icons";
import "./profile.css";
import { UserContext } from "../../context/UserContext";
import { url } from "../../utils/constants";

export default function Profile() {
  const { user: currUser, dispatch } = useContext(UserContext);
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [isFollowing, setFollowing] = useState(false);
  const [isBuddy, setBuddy] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = username
        ? await axios.get(url + `/user?username=${username}`)
        : await axios.get(url + "/");
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  async function handleFollowing() {
    setFollowing(!isFollowing);
  }

  async function handleBuddy() {
    setBuddy(!isBuddy);
  }

  return (
    <>
      <NavbarMain />
      <div className="container-profile">
        <div className="container-cover-picture">
          <img
            className="profile-page-cover"
            alt="user-cover-background"
            src="/assets/img/defaultBG.svg"
          ></img>
        </div>
        <div className="container-info-feed">
          <div className="container-user-info">
            <div style={{ position: "absolute", left: "50%" }}>
              <img
                className="profile-page-dp"
                alt="user-profile-pic"
                src="/assets/img/defaultDP.svg"
              />
            </div>
            {/* <div
              className="change-dp"
              style={{
                position: "absolute",
              }}
            >
              <CameraAlt
                style={{
                  position: "relative",
                  left: "17.5%",
                }}
              />
            </div> */}
            <h4>{user.username}</h4>
            <button
              className="follow-btn"
              onClick={handleBuddy}
              style={{
                backgroundColor: isBuddy ? "#7f8fad" : "#4d6591",
              }}
            >
              {isBuddy ? (
                <EmojiPeople style={{ marginRight: "3px" }} />
              ) : (
                <GroupAdd style={{ marginRight: "5px" }} />
              )}
              {isBuddy ? "My Buddy !" : "Request Buddy"}
            </button>
            <button
              className="follow-btn"
              onClick={handleFollowing}
              style={{
                backgroundColor: isFollowing ? "#82C0CC" : "#3391a3",
              }}
            >
              {isFollowing ? (
                <Remove style={{ marginRight: "3px" }} />
              ) : (
                <Add
                  style={{
                    marginRight: "3px",
                  }}
                />
              )}
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
            <ul className="user-info-list">
              <li>Rank: #{user.rank}</li>
              <li>Productivity Points: {user.productivityPoints}</li>
              <li>School</li>
              <li>Major</li>
            </ul>
          </div>

          <div className="container-user-feed">
            <h2>Recent Activities</h2>
            <div className="container-profile-feed">
              <Feed username={username} />
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}
