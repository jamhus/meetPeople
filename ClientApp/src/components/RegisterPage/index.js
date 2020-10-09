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
import DatePicker from "reactstrap-date-picker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = ({ handleRegister, loading }) => {
  const [city, setCity] = useState("");
  const [male, setMale] = useState(false);
  const [country, setCountry] = useState("");
  const [female, setFemale] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async () => {
    const gender = male ? "male" : "female";
    const status = await handleRegister(
      username,
      password,
      city,
      country,
      dateOfBirth,
      gender
    );

    if (status === 201) {
      setRegistered(true);
    }
    setCity("");
    setFemale("");
    setCountry("");
    setMale(false);
    setUsername("");
    setPassword("");
    setDateOfBirth("");
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
              <Label>Date of birth: </Label>
              <DatePicker
                id="birthday"
                value={dateOfBirth}
                onChange={(v, f) => setDateOfBirth(v)}
              />
            </FormGroup>

            <FormGroup>
              <Label>City: </Label>
              <Input
                placeholder="city"
                value={city}
                autoComplete="off"
                onChange={(e) => setCity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Country: </Label>
              <Input
                placeholder="country"
                value={country}
                autoComplete="off"
                onChange={(e) => setCountry(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Gender: </Label>

              <div className="d-inline ml-2">
                <Label className="mr-4">Male: </Label>

                <Input
                  type="radio"
                  checked={male}
                  onChange={(e) => {
                    setMale(true);
                    setFemale(false);
                  }}
                />
              </div>
              <div className="d-inline ml-2">
                <Label className="mr-4">Female: </Label>

                <Input
                  type="radio"
                  checked={female}
                  onChange={(e) => {
                    setMale(false);
                    setFemale(true);
                  }}
                />
              </div>
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
  loading: PropTypes.bool.isRequired,
  handleRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  isLoggedIn: state.authentication.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  handleRegister: (username, password, city, country, dateOfBirth, gender) =>
    dispatch(
      handleRegister(username, password, city, country, dateOfBirth, gender)
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
