import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setUser } from "./../../actions";

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

const Login = ({ setUser, loading, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    setUser({ username, password });

    const path = history.location.state ? history.location.state.pathname : "/";
    history.push(path);
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
  setUser: PropTypes.func,
  loading: PropTypes.bool,
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
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
