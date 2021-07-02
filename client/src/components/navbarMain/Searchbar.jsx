import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { url } from "../../utils/constants";
import axios from "axios";

export default function Searchbar() {
  const [userData, setUserData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [usernameEntered, setUsernameEntered] = useState("");

  useEffect(() => {
    if (!userData) {
      const fetchUsersData = async () => {
        const res = await axios.get(url + "/user/all");
        setUserData(res.data);
        // console.log(res.data);
      };
      fetchUsersData();
    }
  }, [userData]);

  return (
    <div className="searchbar-wrapper">
      <div className="nav-link searchBar" title="Search">
        <SearchIcon className="searchIcon" />
        <input placeholder="Search for friends" className="searchInput"></input>
      </div>
      <div className="data-result"></div>
    </div>
  );
}
