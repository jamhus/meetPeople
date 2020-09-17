import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Row, Col, NavLink } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";

const HomePage = ({ user }) => {
  return (
    <Row className="justify-content-center">
      <Col md={12} className="mt-5 text-center">
        <div className="mb-4 lead">Welcome to Meet People!</div>
        {!user.isLoggedIn && (
          <NavLink tag={RouterLink} to="/register" className="btn btn-link">
            Register
          </NavLink>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  user: state.authentication.user,
});

HomePage.prototype = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

export default connect(mapStateToProps, null)(HomePage);
