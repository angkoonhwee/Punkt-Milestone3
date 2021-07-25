import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Add, Remove, GroupAdd, EmojiPeople } from "@material-ui/icons";
import "./profile.css";
import { url } from "../../utils/constants";
import UploadFile from "../../components/uploadFile/UploadFile";
import Loading from "../loading/Loading";

//redux
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/user";
import { fetchUserPosts } from "../../redux/actions/posts";
import { fetchBuddy } from "../../redux/actions/buddy";
import { loadMe } from "../../redux/actions/auth";
import { makeRequest, fetchRequest, deleteRequest } from "../../redux/actions/request";
import { isUndefined } from "lodash";

function Profile({
  currUser,
  coverPicture,
  posts,
  fetchUserPosts,
  fetchUser,
  fetchedUser,
  loadMe,
  buddyId,
  fetchBuddy,
  fetchRequest,
  makeRequest,
  deleteRequest,
  request
}) {

  //default is currUser's profile
  const [user, setUser] = useState(currUser);
  const username = useParams().username;
  const [isFollowing, setFollowing] = useState(
    currUser?.followings.includes(user?.id)
  );
  const [isBuddy, setBuddy] = useState(false);
  const [requested, setRequested] = useState(false);
  const [file, setFile] = useState(null);

  //check if searched up profile belongs to currUser
  //if yes then do nothing else fetchuser
  useEffect(() => {
    if (username !== currUser.username) {
      //console.log("not me, fetching user");
      fetchUser(username);
    }
  }, [username, currUser, fetchUser]);

  useEffect(() => {
    if (username === currUser.username) {
      setUser(currUser);
    } else if (fetchedUser && username !== currUser.username) {
      setUser(fetchedUser);
      if (!isUndefined(buddyId) && fetchedUser._id === buddyId) {
        setBuddy(true);
      }
    } 
  }, [fetchedUser, user, username]);

  useEffect(() => {
    fetchUserPosts(username);
  }, [fetchUserPosts, username]);

  useEffect(() => {
    if (isUndefined(buddyId) && currUser.currentBuddy) {
      fetchBuddy(currUser.currentBuddy);
    }
  }, [fetchBuddy, currUser.currentBuddy]);

  useEffect(() => {
    if (currUser.request !== null) {
      fetchRequest(currUser.request);
    }
  }, [currUser.request, fetchRequest]);

  useEffect(() => {
    if (request !== null && request.status === "Pending" && request.receiver._id === user._id) {
      //console.log("I have requested!");
      setRequested(true);
    }
    if (request === null) {
      setRequested(false);
    }
  }, [requested, request, setRequested])
  // console.log("my most recent request");
  // console.log(request);
  // console.log("requested?");
  // console.log(requested);

  async function handleFollowing() {
    try {
      if (user._id && currUser._id) {
        if (isFollowing) {
          const res = await axios.put(url + `/user/${user._id}/unfollow`, {
            userId: currUser._id,
          });

          loadMe();
        } else {
          const res = await axios.put(url + `/user/${user._id}/follow`, {
            userId: currUser._id,
          });
          loadMe();
        }
      }

      setFollowing(!isFollowing);
    } catch (err) {
      console.log(err);
    }
  }

  function handleRequest(e) {
    e.preventDefault();
    if (requested) {
      deleteRequest(request._id);
    } else {
      makeRequest(user._id)
    }
    console.log("after handling request!");
    console.log(!requested);
    setRequested(!requested);
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
                  coverPicture
                    ? coverPicture
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

            <h4>{username}</h4>
            {username !== currUser.username && (
              <div className="buttons-wrapper">
                {isBuddy
                  ? <button
                    className="follow-btn"
                    disabled
                    style={{ backgroundColor: "#7f8fad", cursor: "not-allowed" }}
                  >
                    <EmojiPeople style={{ marginRight: "3px" }} />
                    My Buddy !
                  </button>
                  //show button if currentUser has not requested someone else, has no buddy and this user has no buddy
                  : requested
                    ? <button
                      className="follow-btn"
                      onClick={handleRequest}
                      style={{
                        backgroundColor: "#7f8fad",
                      }}
                    >
                      <GroupAdd style={{ marginRight: "5px" }} />
                      Requested
                    </button>
                    : (
                      currUser.request !== null
                      && request !== null && request.status === "Rejected"
                      && currUser.currentBuddy === ""
                      && user.currentBuddy === ""
                    )
                    || (currUser.request === null && !currUser.currentBuddy && user.currentBuddy === "")
                      ? <button
                        className="follow-btn"
                        onClick={handleRequest}
                        style={{
                          backgroundColor: requested ? "#7f8fad" : "#4d6591",
                        }}
                      >
                        <GroupAdd style={{ marginRight: "5px" }} />
                        {requested ? "Requested" : "Request Buddy"}
                      </button>
                      : null
                }
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
              {user.social?.instagram && (
                <a href={user.social?.instagram} style={{ fontSize: "30px" }}>
                  <i
                    className="fab fa-instagram"
                    style={{ color: "#C13584", marginRight: "15px" }}
                  />
                </a>
              )}

              {user.social?.linkedIn && (
                <a href={user.social?.linkedIn} style={{ fontSize: "30px" }}>
                  <i
                    className="fab fa-linkedin"
                    style={{ color: "#2867B2", marginRight: "15px" }}
                  />
                </a>
              )}

              {user.social?.github && (
                <a href={user.social?.github} style={{ fontSize: "30px" }}>
                  <i className="fab fa-github" style={{ color: "#333" }}></i>
                </a>
              )}
            </div>

            <ul className="user-info-list">
              <li>Rank: #{user.rank}</li>
              <li>Productivity Points: {user.productivityPoints}</li>
              {user?.bio && <li>{user?.bio}</li>}
              {user.education?.school && <li>{user.education?.school}</li>}
              {user.education?.major && <li>{user.education?.major}</li>}
              {user.education?.yearOfStudy && (
                <li>Year {user.education?.yearOfStudy}</li>
              )}
              {user.education?.currentModules &&
                user.education?.currentModules.map((m) => (
                  <li key={m}>{m.toUpperCase()}</li>
                ))}
            </ul>
          </div>

          <div className="container-user-feed">
            <h2>Recent Activities</h2>
            <div className="container-profile-feed">
              {posts ? <Feed posts={posts} /> : <Loading />}
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    coverPicture: state.auth.user.coverPicture,
    posts: state.posts.user,
    fetchedUser: state.user.user,
    buddyId: state.buddy.object.buddy,
    //this is the request made by currUser, if no request made should be {}
    request: state.request.request
  }
}

export default connect(mapStateToProps, {
  fetchUserPosts,
  fetchUser,
  loadMe,
  fetchBuddy,
  makeRequest,
  deleteRequest,
  fetchRequest
})(Profile);