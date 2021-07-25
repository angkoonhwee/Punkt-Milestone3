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

import { connect } from "react-redux";
import { fetchAllUser } from "../../redux/actions/user";

function Leaderboard({ fetchAllUser, userData }) {
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);
  const [rest, setRest] = useState([]);

  useEffect(() => {
    //console.log("fetching ran");
    fetchAllUser();
  }, [fetchAllUser]);

  useEffect(() => {
    //console.log("sorting ran");
    if (userData.length !== 0) {
      userData
        .sort((u1, u2) => u2.productivityPoints - u1.productivityPoints)
      setFirst(userData[0]);
      setSecond(userData[1]);
      setThird(userData[2]);
      
      setRest(userData.slice(3, 50));
    }
  }, []);


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
          {rest?.map((u, index) => (
            <LeaderboardOthers user={u} key={u.username} index={index} />
          ))}
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
    );
}

const mapStateToProps = state => {
  return {
    userData: state.user.searchedUser
  };
}

export default connect(mapStateToProps, { fetchAllUser })(Leaderboard);