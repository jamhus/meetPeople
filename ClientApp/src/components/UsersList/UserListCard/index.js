import React from "react";
import PropTypes from "prop-types";

import { faUser, faHeart, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";

import "./UserListCard.css";

export const UserListCard = ({ user }) => {
  return (
    <Card className="mb-4">
      <div className="card-img-wrapper">
        <CardImg src={user.photoUrl} />
        <ul className="list-inline member-icons animate text-center">
          <li className="list-inline-item">
            <Button className="btn btn-primary">
              {" "}
              <FontAwesomeIcon icon={faUser} />
            </Button>
            <Button className="btn mx-2 btn-primary">
              {" "}
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button className="btn btn-primary">
              {" "}
              <FontAwesomeIcon icon={faEnvelope} />
            </Button>
          </li>
        </ul>
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
};
