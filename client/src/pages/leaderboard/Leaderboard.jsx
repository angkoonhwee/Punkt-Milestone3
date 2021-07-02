import React from "react";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import "./leaderboard.css";
import LeaderboardFirst from "../../components/leaderboardItems/LeaderboardFirst";
import LeaderboardSec from "../../components/leaderboardItems/LeaderboardSec";
import LeaderboardThird from "../../components/leaderboardItems/LeaderboardThird";
import LeaderboardOthers from "../../components/leaderboardItems/LeaderboardOthers";

export default function Leaderboard() {
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
          <LeaderboardSec />
          <LeaderboardFirst />

          <LeaderboardThird />
        </div>
        <div className="container-leaderboard-others">
          <LeaderboardOthers />
          <LeaderboardOthers />
          <LeaderboardOthers />
          <LeaderboardOthers />
          <LeaderboardOthers />
          <LeaderboardOthers />
          <LeaderboardOthers />
          <LeaderboardOthers />
          <LeaderboardOthers />
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}
