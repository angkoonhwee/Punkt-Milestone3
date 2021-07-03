import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { url } from "../../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Searchbar() {
  const [userData, setUserData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [usernameEntered, setUsernameEntered] = useState("");

  useEffect(() => {
    if (!userData) {
      const fetchUsersData = async () => {
        const res = await axios.get(url + "/user/all");
        setUserData(res.data);
      };
      fetchUsersData();
    }
  }, [userData]);

  function handleFilter(event) {
    const searchUsername = event.target.value.toLowerCase();
    setUsernameEntered(searchUsername);
    const filteredUsers = userData.filter((u) => {
      return u.username.toLowerCase().includes(searchUsername);
    });

    if (event.target.value === "") {
      setFilteredData([]);
    } else {
      setFilteredData(filteredUsers);
    }
  }

  function handleClear() {
    setUsernameEntered("");
    setFilteredData([]);
  }

  return (
    <div className="searchbar-wrapper">
      <div className="nav-link searchBar" title="Search">
        {usernameEntered === "" ? (
          <SearchIcon className="searchIcon" />
        ) : (
          <CloseIcon className="searchIcon" onClick={handleClear} />
        )}
        <input
          placeholder="Search for friends"
          value={usernameEntered}
          className="searchInput"
          onChange={handleFilter}
        ></input>
      </div>
      {filteredData.length === 0 && usernameEntered !== "" ? (
        <div className="data-result">
          <p className="no-user-text">No user with that username exists</p>
        </div>
      ) : (
        <div className="data-result">
          {filteredData.slice(0, 15).map((u, index) => {
            return (
              <Link
                to={"/profile/" + u.username}
                style={{ textDecoration: "none" }}
                target="_blank"
                key={index}
              >
                <div className="data-item">
                  <img
                    alt="profile-pic"
                    src={
                      u.profilePicture !== ""
                        ? url + "/images/" + u.profilePicture
                        : "/assets/img/defaultDP.svg"
                    }
                    className="profilePic"
                  />
                  <p>{u.username}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
