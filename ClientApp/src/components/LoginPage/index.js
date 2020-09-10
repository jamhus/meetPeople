import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleLogin } from "./../../actions";

import {
  Col,
  Row,
  Form,
  Label,
  Input,
  Button,
  Spinner,
  FormGroup,
} from "reactstrap";

const Login = ({ handleLogin, loading, history, isLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const path = history.location.state
        ? history.location.state.pathname
        : "/";
      history.push(path);
    }
  }, [isLoggedIn, history]);
  const handleSubmit = () => {
    handleLogin(username, password);
  };
  return (
    <Row>
      <Col sm={12} md={{ size: 4, offset: 4 }}>
        <Form>
          <h1>Login!</h1>
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
          <Button onClick={handleSubmit}>Login</Button>
        </Form>
        {loading && (
          <Col xs="12" md={{ size: 3, offset: 5 }}>
            <Spinner size="lg" />
          </Col>
        )}
      </Col>
    </Row>
  );
};

Login.propTypes = {
  Login: PropTypes.func,
  loading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
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
  handleLogin: (username, password) =>
    dispatch(handleLogin(username, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
