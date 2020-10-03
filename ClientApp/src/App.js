import Cookies from "js-cookie";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";

import { Layout } from "./components/Layout";
import EditPage from "./components/EditPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import UsersPage from "./components/UsersList";
import Toaster from "./components/common/Toaster";
import RegisterPage from "./components/RegisterPage";
import MessagesPage from "./components/MessagesPage";
import UserDetailed from "./components/UsersList/UserDetailed";
import { NotFoundPage } from "./components/common/NotFoundPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

import { getCurrentUser } from "./actions";
import "./custom.css";

const App = ({ getCurrentUser }) => {
  const readCookie = () => {
    const token = Cookies.get("token");
    if (token) {
      const claims = jwt_decode(token);
      getCurrentUser(claims.nameid);
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
          <ProtectedRoute exact path="/edit-profile" component={EditPage} />
          <ProtectedRoute
            exact
            path="/user/:id/:tab?"
            component={UserDetailed}
          />
          <ProtectedRoute exact path="/messages" component={MessagesPage} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Layout>
    </>
  );
};

App.prototype = {
  getCurrentUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (id) => dispatch(getCurrentUser(id)),
});

export default connect(null, mapDispatchToProps)(App);
