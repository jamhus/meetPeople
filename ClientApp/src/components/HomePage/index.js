import React from "react";
import { Row, Col, NavLink } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";

export const HomePage = () => {
  return (
    <Row className="justify-content-center">
      <Col md={12} className="mt-5 text-center">
        <div className="mb-4 lead">Welcome to Meet People!</div>
        <NavLink tag={RouterLink} to="/register" className="btn btn-link">
          Register
        </NavLink>
      </Col>
    </Row>
  );
};
