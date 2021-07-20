import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoutes from "./PrivateRoutes";
import { connect } from "react-redux";

import Login from '../../pages/login/Login';
import Signup from '../../pages/signup/Signup';
import Main from '../../pages/main/Main';
import ExplorePage from '../../pages/explore/ExplorePage';
import Speculate from '../../pages/speculate/Speculate';
import Leaderboard from '../../pages/leaderboard/Leaderboard';
import Profile from '../../pages/profile/Profile';
import Progress from '../../pages/progress/Progress';
import Buddy from '../../pages/buddy/Buddy';
import Settings from '../../pages/settings/Settings';
import Contact from '../../pages/contact/Contact';
import ForgotPassword from '../../pages/forgotPassword/ForgotPassword';
import ResetPassword from "../../pages/resetPassword/ResetPassword";

const Routes = props => {
    //console.log(props);
    return (
        <div>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoutes path="/main" exact component={Main} />
                <PrivateRoutes path="/explore" component={ExplorePage} />
                <PrivateRoutes path="/speculate" component={Speculate} />
                <PrivateRoutes path="/leaderboard" component={Leaderboard} />
                <PrivateRoutes path="/profile/:username" component={Profile} />
                <PrivateRoutes path="/progress" exact component={Progress} />
                <PrivateRoutes path="/progress/:goalId" component={Progress} />
                <PrivateRoutes path="/buddy" exact component={Buddy} />
                <PrivateRoutes path="/settings" exact component={Settings} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset/:token" component={ResetPassword} />
            </Switch>
        </div>
    )
}

const mapStateToProps = state => {
    return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(Routes);