import Cookies from "js-cookie";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";

import { Layout } from "./components/Layout";
import LoginPage from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import ValuesPage from "./components/ValuesPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { NotFoundPage } from "./components/NotFoundPage";

import "./custom.css";
import { setUser } from "./actions";

const App = ({ setUser }) => {
  const readCookie = () => {
    const token = Cookies.get("token");
    if (token) {
      const claims = jwt_decode(token);
      setUser(claims.nique_name);
    }
  };

  useEffect(() => {
    readCookie();
  });

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/values" component={ValuesPage} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Layout>
  );
};

App.prototype = {
  setUser: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (username) => dispatch(setUser({ username })),
});

export default connect(null, mapDispatchToProps)(App);
