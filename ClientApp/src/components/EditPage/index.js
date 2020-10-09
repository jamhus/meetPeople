import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Nav,
  Card,
  Form,
  Button,
  NavItem,
  TabPane,
  NavLink,
  CardImg,
  CardBody,
  FormGroup,
  CardFooter,
  TabContent,
  ButtonGroup,
} from "reactstrap";
import { DropZone } from "../common/DropZone";
import basePhoto from "../../assets/user.png";
import PhotoEditor from "../common/PhotoEditor";

import { getUser, updateUser, clearUser, uploadPhoto } from "../../actions";

import "./EditPage.css";

const EditProfilePage = ({
  loading,
  getUser,
  user,
  clearUser,
  updateUser,
  uploadPhoto,
}) => {
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [created, setCreated] = useState("");
  const [country, setCountry] = useState("");
  const [interests, setInterests] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [lastActive, setLastActive] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleSave = () => {
    const serObj = { city, interests, country, lookingFor, introduction };
    let edited = 0;
    for (var key in serObj) {
      if (user[key] !== serObj[key]) {
        edited++;
      }
    }
    return edited > 0 && updateUser(user.id, serObj);
  };

  useEffect(() => {
    setAge(user.age);
    setCity(user.city);
    setCreated(user.created);
    setCountry(user.country);
    setInterests(user.interests);
    setLastActive(user.lastActive);
    setLookingFor(user.lookingFor);
    setIntroduction(user.introduction);
    return function cleanup() {
      clearUser();
    };
  }, [
    getUser,
    clearUser,
    user.age,
    user.city,
    user.country,
    user.created,
    user.interests,
    user.introduction,
    user.lastActive,
    user.lookingFor,
  ]);

  const infoLabel = (header, text) => (
    <div>
      <strong>{header}</strong>
      <p>{text}</p>
    </div>
  );

  const removeFile = (file) => {
    const files = selectedFiles.filter((x) => x.name !== file.name);
    if (files.length > 0) {
      return setSelectedFiles(files);
    } else {
      return setSelectedFiles(null);
    }
  };

  const upload = async (file) => {
    await uploadPhoto(user.id, file);
    removeFile(file);
  };

  const renderUserProfile = () => {
    const photoUrl = user.photos.find((x) => x.isMain === true)
      ? user.photos.find((x) => x.isMain === true).url
      : "";
    return (
      <>
        <Col sm={4}>
          <Card>
            <CardImg
              className="detailed-img card-img-top img-thumbnail"
              src={photoUrl || basePhoto}
            />
            <CardBody className="card-body-alt">
              {infoLabel("Location:", `${city} , ${country}`)}
              {infoLabel("Age:", `${age}`)}
              {infoLabel("Last active:", `${moment(lastActive).fromNow()}`)}
              {infoLabel(
                "Member since:",
                `${moment(created).format("MMM DD-YYYY")}`
              )}
            </CardBody>
            <CardFooter>
              <ButtonGroup className="d-flex">
                <Button
                  disabled={loading}
                  className="btn-block btn-success"
                  onClick={handleSave}
                >
                  {loading ? "Loading..." : "Save profile"}
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Col>
        <Col sm={8}>
          <div className="tab-panel">
            <div className="member-tabset">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activeTab === "1"}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Edit profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "2"}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Edit photos
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col className="tab-wrapper" sm="12">
                      <Form>
                        <FormGroup>
                          <h4>Description</h4>
                          <textarea
                            name="introduction"
                            className="form-control"
                            rows="6"
                            value={introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                          ></textarea>
                        </FormGroup>
                        <FormGroup>
                          <h4>Interests</h4>
                          <textarea
                            name="interests"
                            className="form-control"
                            rows="6"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                          ></textarea>
                        </FormGroup>
                        <FormGroup>
                          <h4>Looking for</h4>
                          <textarea
                            name="lookingFor"
                            className="form-control"
                            rows="6"
                            value={lookingFor}
                            onChange={(e) => setLookingFor(e.target.value)}
                          ></textarea>
                        </FormGroup>
                        <FormGroup>
                          <h4>location details</h4>
                          <div className="form-inline">
                            <div className="d-flex w-50">
                              <label className="pr-1" htmlFor="city">
                                City
                              </label>
                              <input
                                className="form-control w-100"
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                            <div className="d-flex w-50">
                              <label className="px-1" htmlFor="country">
                                Country
                              </label>
                              <input
                                className="form-control w-100"
                                type="text"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                              />
                            </div>
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col className="tab-wrapper" sm="12">
                      <PhotoEditor />
                      <DropZone
                        removeFile={removeFile}
                        upload={upload}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Col>
      </>
    );
  };

  return (
    <>
      <Row className="mt-5">{renderUserProfile()}</Row>
    </>
  );
};

EditProfilePage.propTypes = {
  user: PropTypes.shape({}),
  uploadPhoto: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  user: state.authentication.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  clearUser: () => dispatch(clearUser()),
  uploadPhoto: (id, file) => dispatch(uploadPhoto(id, file)),
  updateUser: (id, user) => dispatch(updateUser(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
