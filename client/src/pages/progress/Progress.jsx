import React, { useContext, useEffect, useState } from "react";
import BetStatus from "../../components/betStatus/BetStatus";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ProgressTimeline from "../../components/progressTimeline/ProgressTimeline";
import RecordStatus from "../../components/recordStatus/RecordStatus";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import SetBet from "../../components/setBet/SetBet";
import "./progress.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { url } from "../../utils/constants";

export default function Progress() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const { user: currUser } = useContext(UserContext);
  const username = useParams().username;
  const goalId = useParams().goalId;
  // console.log("goalid : " + goalId);
  const [goal, setGoal] = useState({});
  const [user, setUser] = useState({}); // owner of the goal

  useEffect(() => {
    const fetchUser = async () => {
      const res = username
        ? await axios.get(url + `/user?username=${username}`)
        : await axios.get(url + "/");
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchGoal = async () => {
      const res = goalId
        ? await axios.get(url + "/goal/" + goalId)
        : await axios.get(url + "/goal/user/" + currUser._id);

      setGoal(res.data);
    };
    fetchGoal();
  }, [currUser._id, goalId]);

  return (
    <div>
      <NavbarMain />
      <div className="container-progress">
        <BetStatus user={username ? user : currUser} goal={goal} />
        {!username || username === currUser.username ? (
          <RecordStatus goal={goal} />
        ) : (
          <SetBet user={user} goal={goal} />
        )}

        <ProgressTimeline user={username ? user : currUser} goal={goal} />
      </div>
      <ScrollTop />
      <Footer />
    </div>
  );
}
