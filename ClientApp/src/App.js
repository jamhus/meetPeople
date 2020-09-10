import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Home } from "./components/Home";
import Login from "./components/LoginPage";
import { Layout } from "./components/Layout";
import ValuesPage from "./components/ValuesPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
  }, [readCookie]);

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/values" component={ValuesPage} />
      </Switch>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (username) => dispatch(setUser({ username })),
});

export default connect(null, mapDispatchToProps)(App);
