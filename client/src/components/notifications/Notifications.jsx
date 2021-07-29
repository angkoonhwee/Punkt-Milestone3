import React, { useState, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./notifications.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

import { connect } from "react-redux";
import {
  fetchCommentNotif,
  fetchReqNotif,
  acceptRequest,
  rejectRequest
} from "../../redux/actions/notifications";
import { fetchRequest } from "../../redux/actions/request";
import { isEmpty, isUndefined } from "lodash";

function Notifications({
  user,
  requested,
  comments,
  requests,
  fetchCommentNotif,
  fetchReqNotif,
  fetchRequest,
  acceptRequest,
  rejectRequest,
  hoverIcon,
  setHoverIcon,
}) {
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    if (comments === null) {
      fetchCommentNotif(user._id);
    }
  }, [fetchCommentNotif, user._id]);

  useEffect(() => {
    if (requests === null) {
      fetchReqNotif(user._id);
    }
  }, [fetchReqNotif, user._id]);

  useEffect(() => {
    if (user.request !== null) {
      fetchRequest(user.request);
    }
  }, [user.request]);

  function onAccept(requestId) {
    acceptRequest(requestId)
  }

  function onReject(requestId) {
    rejectRequest(requestId)
  }
  // console.log("user.request: " + user.request);
  // console.log(user.request !== null);
  // console.log("requested: " + requested);
  // console.log(!requested);
  
  const checkNotifications = () => {
    console.log()
    if (requests && requests.length === 0 
      && comments && comments.length === 0
      && ((user.request && user.request === "Pending") 
      || user.request === null
      )) {
        return ( 
        <p className="no-user-text" style={{ zIndex: "999" }}>
          {console.log("notificaitons")}
          No Notifications
        </p>)
      }
  }

  return (
    <div style={{ position: "relative"}} >
      <div
        className="nav-link navbar-link-item"
        onClick={() => setClicked(!isClicked)}
        onMouseEnter={() => setHoverIcon("Notifications")}
        onMouseLeave={() => setHoverIcon("")}
      >
        <NotificationsIcon
          className="searchIcon navbar-icon"
        />
        <span className="navbar-icon-badge" style={{
          display: requests !== null && requests.length > 0
            ? "block"
            : "none"
        }} />
        <p className="nav-name">Notifications</p>
        {isClicked && (
          <div className="notifications-wrapper">
            {requests === null
              ? (
                <p className="no-user-text" style={{ zIndex: "9999" }}>
                  Loading...
                </p>
              ) : requests.map(r => {
                return (
                  <div className="data-item notif" key={r.requestId} >
                    <p className="notif-username">{r.username}</p> wants to be your buddy!
                    <br />
                    <button className="buddy-request accept" onClick={() => onAccept(r.requestId)}>Accept</button>
                    <button className="buddy-request reject" onClick={() => onReject(r.requestId)}>Reject</button>
                  </div>
                )
              })
            }
            
            {user.request !== null
              && requested
              && requested.status === "Rejected"
              ? <div className="data-item notif">
                <p className="notif-username">{requested.receiver.username + " "}</p>
                <p className="notif-username" style={{ color: "hsl(0, 52%, 61%)" }}>
                  has rejected your Buddy Request!
                </p>
              </div>
              : (user.request !== null && requested && requested.status === "Accepted")
                ? <div className="data-item notif">
                  <p className="notif-username">{requested.receiver.username + " "}</p>
                  <p className="notif-username" style={{ color: "#53B8BB" }}>
                    has accepted your Buddy Request!
                  </p>
                </div>
                : null
            }
            {comments === null
              ? <p>Loading...</p>
              : comments.length > 0 &&
              comments.map((n) => {
                return (
                  <Link
                    to={`/progress/${n.goalId}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    key={n._id}
                  >
                    <div className="data-item notif">
                      <p className="notif-username">{n.username}</p> commented on
                      your post titled{" "}
                      <p className="notif-username">「 {n.desc} 」</p>.
                      <p className="post-date notif">{format(n.createdAt)}</p>
                    </div>
                  </Link>
                );
              })}
              {checkNotifications()}
          </div>
        )}
      </div>
      {hoverIcon === "Notifications" && (
        <div className="navbar-hover-icon notifications">{hoverIcon}</div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    comments: state.notifications.comments,
    requests: state.notifications.requests,
    requested: state.request.request,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {
  fetchCommentNotif,
  fetchReqNotif,
  fetchRequest,
  acceptRequest,
  rejectRequest
})(Notifications);
