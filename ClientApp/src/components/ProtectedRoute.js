import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.isLogedIn) {
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
  isLogedIn: state.authentication.user.isLogedIn,
});

export default connect(mapStateToProps, {})(ProtectedRoute);
