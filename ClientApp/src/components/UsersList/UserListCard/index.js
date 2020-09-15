import React from "react";
import PropTypes from "prop-types";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

export const UserListCard = ({ user }) => {
  return (
    <Card className="mb-4">
      <CardImg src={user.photoUrl} />
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
