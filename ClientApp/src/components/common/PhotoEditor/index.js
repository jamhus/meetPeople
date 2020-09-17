import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, CardImg, Button, ButtonGroup } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserAlt } from "@fortawesome/free-solid-svg-icons";

import { setMain } from "../../../actions";

const PhotoEditor = ({ userId, photos, setMain }) => {
  const renderPhotos = () =>
    photos.map((p) => (
      <Col key={p.id} sm={2}>
        <CardImg className="img-thumbnail p-1" src={p.url} />
        <ButtonGroup className="d-flex mt-1">
          <Button
            onClick={() => setMain(userId, p.id)}
            className="w-100 btn-primary btn-sm"
          >
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

const mapStateToProps = (state) => ({
  userId: state.authentication.user.id,
  photos: state.authentication.user.photos,
});

const mapDispatchToProps = (dispatch) => ({
  setMain: (userId, id) => dispatch(setMain(userId, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoEditor);

PhotoEditor.propTypes = {};
