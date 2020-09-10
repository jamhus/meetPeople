import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavItem,
  NavLink,
  Collapse,
  Container,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import Cookies from "js-cookie";

import { setLogout } from "../actions/AuthenticationActions";

import "./NavMenu.css";

const NavMenu = ({ isLoggedIn, setLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setLogout();
  };

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            demochat
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  Home
                </NavLink>
              </NavItem>

              {isLoggedIn && (
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/values">
                    Values
                  </NavLink>
                </NavItem>
              )}

              {!isLoggedIn && (
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">
                    Login
                  </NavLink>
                </NavItem>
              )}

              {isLoggedIn && (
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    onClick={handleLogout}
                    to="/"
                  >
                    Logout
                  </NavLink>
                </NavItem>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authentication.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setLogout: () => dispatch(setLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
