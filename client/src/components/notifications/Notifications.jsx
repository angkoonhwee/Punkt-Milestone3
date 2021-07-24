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
  rejectRequest
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

  console.log(user.request);
  useEffect(() => {
    if (user.request !== null) {
      console.log(user.request);
      fetchRequest(user.request);
    }
  }, [user.request]);

  function onAccept(requestId) {
    console.log("accept");
    acceptRequest(requestId)
  }

  function onReject(requestId) {
    console.log(requestId);
    rejectRequest(requestId)
  }

  return (
    <div
      className="nav-link navbar-link-item"
      onClick={() => setClicked(!isClicked)}
    >
      <NotificationsIcon
        className="searchIcon navbar-icon"
        title="Notifications"
        style={{ 
          color: 
          requests !== null && requests.length > 0
          ? "#ff477e"
          : "#16697a"
        }}
      />
      <p className="nav-name">Notifications</p>
      {isClicked && (
        <div className="notifications-wrapper">
          {requests === null
            ? <p>Loading...</p>
            : requests.map(r => {
              return (
                <div className="data-item notif" key={r.requestId} >
                  <p className="notif-username">{r.username}</p> wants to be your buddy!
                  <button
                    className="bet-button"
                    onClick={() => onAccept(r.requestId)}
                    style={{ backgroundColor: "green" }}
                  >
                    Accept
                  </button>
                  <button
                    className="bet-button bet-against"
                    onClick={() => onReject(r.requestId)}
                  >
                    Reject
                  </button>
                </div>
              )
            })
          }
          {user.request !== null 
          && !isEmpty(requested)
          && requested.status === "Rejected"
            ? <div className="data-item notif">
                    <p className="notif-username" style={{ color: "hsl(0, 52%, 61%)" }}>{requested.receiver.username + " "}
                       has rejected your Buddy Request!
                    </p>
              </div>
            : (user.request !== null && user.request.status === "Accepted" && !isEmpty(requested))
            ? <div className="data-item notif">
                  <p className="notif-username" style={{ color: "#53B8BB" }}>{requested.receiver.username + " "}
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
        </div>
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
