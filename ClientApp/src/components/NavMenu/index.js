import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink as RouterNavLink } from "react-router-dom";
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

import { handleLogout } from "../../actions/AuthenticationActions";
import basePhoto from "../../assets/user.png";
import "./NavMenu.css";

const NavMenu = ({ isLoggedIn, handleLogout, photoUrl }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    Cookies.remove("token");
    handleLogout();
  };

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={RouterNavLink} to="/">
            Meet People
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              {isLoggedIn && (
                <NavItem>
                  <img
                    alt="avatar"
                    className="nav-avatar img img-thumbnail rounded-circle"
                    src={photoUrl || basePhoto}
                  />
                </NavItem>
              )}

              <NavItem>
                <NavLink tag={RouterNavLink} className="text-dark" to="/">
                  Home
                </NavLink>
              </NavItem>

              {isLoggedIn && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    className="text-dark"
                    to="/users"
                  >
                    Users
                  </NavLink>
                </NavItem>
              )}
              {isLoggedIn && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    className="text-dark"
                    to="/messages"
                  >
                    Messages
                  </NavLink>
                </NavItem>
              )}

              {!isLoggedIn && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    className="text-dark"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </NavItem>
              )}
              {isLoggedIn && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    className="text-dark"
                    to="/edit-profile"
                  >
                    Edit profile
                  </NavLink>
                </NavItem>
              )}

              {isLoggedIn && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    className="text-dark"
                    onClick={logout}
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

NavMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authentication }) => {
  const mainPhoto = authentication.user.photos.find((x) => x.isMain === true);

  return {
    photoUrl: mainPhoto ? mainPhoto.url : "",
    isLoggedIn: authentication.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(handleLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
