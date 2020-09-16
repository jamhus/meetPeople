import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Nav,
  Card,
  Button,
  Spinner,
  NavItem,
  TabPane,
  NavLink,
  CardImg,
  CardBody,
  CardFooter,
  TabContent,
  ButtonGroup,
} from "reactstrap";

import { getUser, clearUser } from "../../../actions";
import "./UserDetailed.css";

const UserDetailed = ({ getUser, clearUser, user, loading, match }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getUser(match.params.id);

    return function cleanup() {
      clearUser();
    };
  }, [getUser, clearUser, match.params.id]);

  const infoLabel = (header, text) => (
    <div>
      <strong>{header}</strong>
      <p>{text}</p>
    </div>
  );

  const listOfUsers = () => {
    return loading ? (
      <Col xs="12" md={{ size: 6, offset: 6 }}>
        {" "}
        <Spinner
          style={{
            display: "flex",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
          }}
        />
      </Col>
    ) : (
      <>
        <Col sm={4}>
          <Card>
            <CardImg
              className="detailed-img card-img-top img-thumbnail"
              src={user.photoUrl}
            />
            <CardBody className="card-body-alt">
              {infoLabel("Location:", `${user.city} , ${user.country}`)}
              {infoLabel("Age:", `${user.age}`)}
              {infoLabel("Last active:", `${user.lastActive}`)}
              {infoLabel("Member since:", `${user.created}`)}
            </CardBody>
            <CardFooter>
              <ButtonGroup className="d-flex">
                <Button className="w-100 btn-primary">Like</Button>
                <Button className="w-100 btn-success">Message</Button>
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
                    {`About ${user.knownAs}`}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "2"}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Interests
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "3"}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Photos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "4"}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    Messages
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col className="tab-wrapper" sm="12">
                      <h4>Description</h4>
                      {user.introduction}

                      <h4 className="pt-3">Looking For</h4>
                      {user.lookingFor}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col className="tab-wrapper" sm="12">
                      {user.interests}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col className="tab-wrapper" sm="12">
                      <h4>photos will come soon</h4>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col className="tab-wrapper" sm="12">
                      <h4>messages will come soon</h4>
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
      <Row className="mt-5">{listOfUsers()}</Row>
    </>
  );
};

UserDetailed.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    age: PropTypes.number,
    city: PropTypes.string,
    gender: PropTypes.string,
    knownAs: PropTypes.string,
    created: PropTypes.string,
    country: PropTypes.string,
    username: PropTypes.string,
    photoUrl: PropTypes.string,
    interests: PropTypes.string,
    lastActive: PropTypes.string,
    lookingFor: PropTypes.string,
    introduction: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
        isMain: PropTypes.bool,
        description: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

const mapStateToProps = (state) => ({
  user: state.users.userDetailed,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  clearUser: () => dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailed);
