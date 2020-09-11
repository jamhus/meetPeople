import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Row, Col, NavLink } from "reactstrap";

export const NotFoundPage = () => (
  <Row className="justify-content-center">
    <Col md={12} className="text-center">
      <span className="display-1 d-block">404</span>
      <div className="mb-4 lead">
        The page you are looking for was not found.
      </div>
      <NavLink tag={RouterLink} to="/" className="btn btn-link">
        Back to Home
      </NavLink>
    </Col>
  </Row>
);
