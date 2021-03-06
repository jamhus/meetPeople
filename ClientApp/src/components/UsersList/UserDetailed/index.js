import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faThumbsUp,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import { PictureGallery } from "../../common/PictureGallery";

import {
  getUser,
  clearUser,
  sendLike,
  getMessageThread,
  clearThread,
} from "../../../actions";

import "./UserDetailed.css";
import Conversation from "../../common/Conversation";
import basePhoto from "../../../assets/user.png";

const UserDetailed = ({
  getUser,
  sendLike,
  clearUser,
  user,
  userId,
  loading,
  match,
  getMessageThread,
  clearThread,
  userOnline,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleLike = () => {
    const recipient = {
      id: user.id,
      name: user.knownAs,
    };
    return sendLike(userId, recipient);
  };

  useEffect(() => {
    getUser(match.params.id);
    getMessageThread(userId, match.params.id);

    if (match.params.tab) {
      setActiveTab(match.params.tab);
    }
    return function cleanup() {
      clearUser();
      clearThread();
    };
  }, [
    getUser,
    getMessageThread,
    clearThread,
    userId,
    clearUser,
    match.params.id,
    match.params.tab,
  ]);

  const infoLabel = (header, text) => (
    <div>
      <strong>{header}</strong>
      <p>{text}</p>
    </div>
  );

  const renderUserProfile = () => {
    const photos = user && user.photos ? user.photos : [];
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
            {userOnline && (
              <span className="user-detailed-online text-success">
                <FontAwesomeIcon icon={faCircle} />{" "}
              </span>
            )}
            <CardImg
              className="detailed-img card-img-top img-thumbnail"
              src={user.photoUrl || basePhoto}
            />
            <CardBody className="card-body-alt">
              {infoLabel("Location:", `${user.city} , ${user.country}`)}
              {infoLabel("Age:", `${user.age}`)}
              {infoLabel(
                "Last active:",
                `${moment(user.lastActive).fromNow()}`
              )}
              {infoLabel(
                "Member since:",
                `${moment(user.created).format("MMM DD-YYYY")}`
              )}
            </CardBody>
            <CardFooter>
              <ButtonGroup className="d-flex">
                <Button onClick={handleLike} className="w-100 btn-danger">
                  <FontAwesomeIcon icon={faThumbsUp} />{" "}
                </Button>
                <Button
                  onClick={(e) => toggle("4")}
                  className="w-100 btn-success"
                >
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
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
                      <PictureGallery photos={photos} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col className="tab-wrapper" sm="12">
                      <Conversation
                        userId={userId}
                        recipientId={match.params.id}
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

UserDetailed.propTypes = {
  userId: PropTypes.number.isRequired,
  sendLike: PropTypes.func.isRequired,
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
  clearThread: PropTypes.func.isRequired,
  getMessageThread: PropTypes.func.isRequired,
  userOnline: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

const mapStateToProps = (state) => {
  const online = state.users.onlineUsers.find(
    (x) => x.userId === state.users.userDetailed.id
  );
  return {
    user: state.users.userDetailed,
    loading: state.loading.loading,
    userId: state.authentication.user.id,
    userOnline: online ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  clearUser: () => dispatch(clearUser()),
  clearThread: () => dispatch(clearThread()),
  sendLike: (userId, recipient) => dispatch(sendLike(userId, recipient)),
  getMessageThread: (userId, recipientId) =>
    dispatch(getMessageThread(userId, recipientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailed);
