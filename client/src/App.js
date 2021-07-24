//jshint esversion:8
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect } from "react";

import Routes from "./components/routing/Routes";
import Home from "./pages/home/Home";
import { loadMe } from "./redux/actions/auth";
import { connect } from "react-redux";

function App({ loadMe, user }) {

  //user will always be present in localStorage after authentication
  //if user is stored in localStorage
  //localStorage will also be updated.
  useEffect(() => {
    if (user !== null) {
      loadMe();
    }
  }, [loadMe]);
  //console.log(user);

  return (
    <Router>
      <Switch>
        {/*<Route path="/" exact component={Home} />*/}
        <Route path="/" exact>
          {user ? <Redirect to="/main" /> : <Home />}
        </Route>
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { loadMe })(App);
