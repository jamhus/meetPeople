import Cookies from "js-cookie";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";

import { Layout } from "./components/Layout";
import LoginPage from "./components/LoginPage";
import UsersPage from "./components/UsersList";
import { HomePage } from "./components/HomePage";
import Toaster from "./components/common/Toaster";
import RegisterPage from "./components/RegisterPage";
import { NotFoundPage } from "./components/common/NotFoundPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
    <>
      <Toaster />
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/users" component={UsersPage} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Layout>
    </>
  );
};

App.prototype = {
  setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (username) => dispatch(setUser({ username })),
});

export default connect(null, mapDispatchToProps)(App);
