//jshint esversion:8
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Progress from "./pages/progress/Progress";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ExplorePage from "./pages/explore/ExplorePage";
import Speculate from "./pages/speculate/Speculate";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Buddy from "./pages/buddy/Buddy";
import Contact from "./pages/contact/Contact";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import { url } from "./utils/constants";
import Loading from "./pages/loading/Loading";

function App() {
  const { user } = useContext(UserContext);

  // if (!user) {
  //   return <Redirect path="/" />;
  // }

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {user ? <Redirect to="/main" /> : <Home />}
        </Route>
        <Route path="/login" exact>
          {user ? <Redirect to="/main" /> : <Login />}
          {/* <Login /> */}
        </Route>
        <Route path="/signup" exact>
          {user ? <Redirect to="/main" /> : <Signup />}
          {/* <Signup /> */}
        </Route>
        <Route path="/main" exact>
          {!user ? <Redirect to="/" /> : <Main />}
        </Route>
        <Route path="/explore">
          {!user ? <Redirect to="/" /> : <ExplorePage />}
        </Route>
        <Route path="/speculate">
          {!user ? <Redirect to="/" /> : <Speculate />}
        </Route>
        <Route path="/leaderboard">
          {!user ? <Redirect to="/" /> : <Leaderboard />}
        </Route>
        <Route path="/profile/:username">
          {!user ? <Redirect to="/" /> : <Profile />}
        </Route>
        <Route path="/progress" exact>
          {!user ? <Redirect to="/" /> : <Progress />}
        </Route>
        <Route path="/progress/:goalId">
          {!user ? <Redirect to="/" /> : <Progress />}
        </Route>
        <Route path="/buddy" exact>
          {!user ? <Redirect to="/" /> : <Buddy />}
        </Route>
        <Route path="/settings" exact>
          {!user ? <Redirect to="/" /> : <Settings />}
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/loading" exact>
          <Loading />
        </Route>

        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset/:token">
          <ResetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
