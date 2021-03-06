import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faEnvelope,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  ButtonGroup,
} from "reactstrap";

import "./UserListCard.css";
import basePhoto from "../../../assets/user.png";

export const UserListCard = ({ user, history, handleLike, userOnline }) => {
  const goToDetailed = () => history.push(`/user/${user.id}`);

  return (
    <Card className="mb-4">
      {userOnline && (
        <span className="user-list-online text-success">
          <FontAwesomeIcon icon={faCircle} />{" "}
        </span>
      )}
      <div className="card-img-wrapper">
        <CardImg className="list-card" src={user.photoUrl || basePhoto} />
        <div className="member-icons animate text-center">
          <ButtonGroup className="d-flex">
            <Button className="btn w-100 btn-primary" onClick={goToDetailed}>
              {" "}
              <FontAwesomeIcon icon={faUser} />
            </Button>

            <Button
              className="btn w-100 btn-primary"
              onClick={() => handleLike({ id: user.id, name: user.knownAs })}
            >
              {" "}
              <FontAwesomeIcon icon={faHeart} />
            </Button>

            <Button className="btn w-100 btn-primary">
              {" "}
              <FontAwesomeIcon
                onClick={() => history.push(`/user/${user.id}/4`)}
                icon={faEnvelope}
              />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <CardBody className="text-center p-1">
        <CardTitle className="mb-1">
          <FontAwesomeIcon icon={faUser} className="pr-1" />
          {`${user.knownAs} , ${user.age}`}
        </CardTitle>
        <CardText className="text-muted">{user.city}</CardText>
      </CardBody>
    </Card>
  );
};

UserListCard.propTypes = {
  user: PropTypes.shape({
    age: PropTypes.number,
    city: PropTypes.string,
    knownAs: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
  history: PropTypes.any.isRequired,
  userOnline: PropTypes.bool.isRequired,
};
