import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import "./leaderboard.css";
import LeaderboardFirst from "../../components/leaderboardItems/LeaderboardFirst";
import LeaderboardSec from "../../components/leaderboardItems/LeaderboardSec";
import LeaderboardThird from "../../components/leaderboardItems/LeaderboardThird";
import LeaderboardOthers from "../../components/leaderboardItems/LeaderboardOthers";
import axios from "axios";
import { url } from "../../utils/constants";

export default function Leaderboard() {
  const [userData, setUserData] = useState(null);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);

  useEffect(() => {
    if (!userData) {
      const fetchUsersData = async () => {
        const res = await axios.get(url + "/user/all");
        const sorted = res.data.sort(
          (u1, u2) => u2.productivityPoints - u1.productivityPoints
        );

        setUserData(sorted.slice(3, 50));
        setFirst(sorted[0]);
        setSecond(sorted[1]);
        setThird(sorted[2]);
      };
      fetchUsersData();
    }
  }, [userData]);

  return (
    <>
      <NavbarMain />
      <div className="container-leaderboard">
        <div className="container-leaderboard-title">
          <h1 className="leaderboard-title">
            <strong>Leaderboard</strong>
          </h1>
          <hr />
        </div>
        <div className="container-leaderboard-top">
          {second && <LeaderboardSec user={second} />}

          {first && <LeaderboardFirst user={first} />}

          {third && <LeaderboardThird user={third} />}
        </div>
        <div className="container-leaderboard-others">
          {userData?.map((u, index) => (
            <LeaderboardOthers user={u} key={u.username} index={index} />
          ))}
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}
