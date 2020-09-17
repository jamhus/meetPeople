import React from "react";
import PropTypes from "prop-types";
import { faTrash, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Row, Col, CardImg, Button, ButtonGroup } from "reactstrap";

export const PhotoEditor = ({ photos }) => {
  console.log(photos);
  const renderPhotos = () =>
    photos.map((p) => (
      <Col key={p.id} sm={2}>
        <CardImg className="img-thumbnail p-1" src={p.url} />
        <ButtonGroup className="d-flex mt-1">
          <Button className="w-100 btn-primary btn-sm">
            <FontAwesomeIcon icon={faUserAlt} />
          </Button>
          <Button className="w-100 btn-danger btn-sm">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ButtonGroup>
      </Col>
    ));

  return <Row>{renderPhotos()}</Row>;
};

PhotoEditor.propTypes = {};
