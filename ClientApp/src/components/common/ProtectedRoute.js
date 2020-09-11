import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.isLoggedIn) {
          return <Component {...props} />;
        } else
          return (
            <Redirect to={{ pathname: "/login", state: props.location }} />
          );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authentication.user.isLoggedIn,
});

export default connect(mapStateToProps, {})(ProtectedRoute);
