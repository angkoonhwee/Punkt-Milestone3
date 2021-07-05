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
import { Instagram, LinkedIn, GitHub } from "@material-ui/icons";
import { Link } from "react-router-dom";
import UploadFile from "../../components/uploadFile/UploadFile";

export default function Profile() {
  const { user: currUser, dispatch } = useContext(UserContext);
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [isFollowing, setFollowing] = useState(false);
  const [isBuddy, setBuddy] = useState(false);
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);

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
          {/* If user visiting this profile page is user himself, allow user to change cover picture */}
          {currUser.username === username ? (
            <label className="change-dp-label">
              <input
                type="file"
                accept=".png,.jpeg,.jpg"
                className="change-dp-input"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img
                className="profile-page-cover"
                alt="user-cover-background"
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "/assets/img/defaultBG.svg"
                }
              ></img>
            </label>
          ) : (
            <img
              className="profile-page-cover"
              alt="user-cover-background"
              src={
                user.coverPicture !== ""
                  ? user.coverPicture
                  : "/assets/img/defaultBG.svg"
              }
            ></img>
          )}
          {file && (
            <UploadFile
              file={file}
              setFile={setFile}
              user={user}
              dispatch={dispatch}
              pic={"coverPicture"}
            />
          )}
        </div>
        <div className="container-info-feed">
          <div className="container-user-info">
            <div style={{ position: "absolute", left: "50%" }}>
              <img
                className="profile-page-dp"
                alt="user-profile-pic"
                src={
                  user.profilePicture !== ""
                    ? user.profilePicture
                    : "/assets/img/defaultDP.svg"
                }
              />
            </div>

            <h4>{user.username}</h4>
            {user.username !== username && (
              <div>
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
              </div>
            )}
            <div className="social-media-icons">
              {user.instagram && (
                <a href={user.instagram}>
                  <i
                    className="fab fa-instagram"
                    style={{ color: "#C13584", marginRight: "15px" }}
                  />
                </a>
              )}

              {user.linkedIn && (
                <a href={user.linkedIn}>
                  <i
                    className="fab fa-linkedin"
                    style={{ color: "#2867B2", marginRight: "15px" }}
                  />
                </a>
              )}

              {user.github && (
                <a href={user.github}>
                  <i className="fab fa-github" style={{ color: "#333" }}></i>
                </a>
              )}
            </div>

            <ul className="user-info-list">
              <li>Rank: #{user.rank}</li>
              <li>Productivity Points: {user.productivityPoints}</li>
              {user.school && <li>{user.school}</li>}
              {user.major && <li>{user.major}</li>}
              {user.yearOfStudy && <li>Year {user.yearOfStudy}</li>}
              {user.currentModules &&
                user.currentModules.map((m) => (
                  <li key={m}>{m.toUpperCase()}</li>
                ))}
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
