import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleRegister } from "./../../actions";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Col,
  Row,
  Form,
  Label,
  Input,
  Button,
  Spinner,
  NavLink,
  FormGroup,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = ({ handleRegister, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async () => {
    const status = await handleRegister(username, password);

    if (status === 201) {
      setRegistered(true);
    }
    setUsername("");
    setPassword("");
  };

  const renderRegistered = () => {
    return (
      <Col md={12} className="mt-5 text-center">
        <div className="mb-4 lead d-flex justify-content-center text-success">
          <h3 className="mr-3">You have been registered!</h3>{" "}
          <FontAwesomeIcon size="2x" icon={faCheck} />
        </div>

        <NavLink tag={RouterLink} to="/Login" className="btn btn-link btn-lg">
          Login
        </NavLink>
      </Col>
    );
  };

  return (
    <Row className="justify-content-center">
      {registered ? (
        renderRegistered()
      ) : (
        <Col md={4} className="mt-5">
          <Form>
            <h1>Register!</h1>
            <FormGroup>
              <Label>Username: </Label>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password: </Label>
              <Input
                type="password"
                placeholder="password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button
                className="btn btn-primary btn-block"
                xs={12}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </FormGroup>
          </Form>
          {loading && (
            <Col xs="12" md={{ size: 3, offset: 5 }}>
              <Spinner size="lg" />
            </Col>
          )}
        </Col>
      )}
    </Row>
  );
};

RegisterPage.propTypes = {
  loading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  handleRegister: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }),
  }),
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  isLoggedIn: state.authentication.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  handleRegister: (username, password) =>
    dispatch(handleRegister(username, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
