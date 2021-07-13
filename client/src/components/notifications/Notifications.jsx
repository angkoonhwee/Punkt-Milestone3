import React, { useState, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./notifications.css";
import axios from "axios";
import { url } from "../../utils/constants";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

export default function Notifications({ user }) {
  const [isClicked, setClicked] = useState(false);
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(url + "/comment/user/" + user._id);

        setNotif(
          res.data
            .sort((c1, c2) => new Date(c2.createdAt) - new Date(c1.createdAt))
            .slice(0, 15)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [user]);

  return (
    <div
      className="nav-link navbar-link-item"
      onClick={() => setClicked(!isClicked)}
    >
      <NotificationsIcon
        className="searchIcon navbar-icon"
        title="Notifications"
      />
      <p className="nav-name">Notifications</p>
      {isClicked && (
        <div className="notifications-wrapper">
          {notif.length > 0 &&
            notif.map((n) => {
              return (
                <Link
                  to={`/progress/${n.goalId}`}
                  style={{ textDecoration: "none" }}
                  target="_blank"
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
}
