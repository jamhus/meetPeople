import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, CardImg, Button, ButtonGroup } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserAlt } from "@fortawesome/free-solid-svg-icons";

import { setMain, deletePhoto } from "../../../actions";

const PhotoEditor = ({ userId, photos, deletePhoto, setMain }) => {
  const renderPhotos = () =>
    photos.map((p) => (
      <Col key={p.id} sm={2}>
        <CardImg className="img-thumbnail p-1" src={p.url} />
        <ButtonGroup className="d-flex mt-1">
          <Button
            disabled={p.isMain}
            onClick={() => setMain(userId, p.id)}
            className="w-100 btn-primary btn-sm"
          >
            <FontAwesomeIcon icon={faUserAlt} />
          </Button>
          <Button
            disabled={p.isMain}
            onClick={() => deletePhoto(userId, p.id)}
            className="w-100 btn-danger btn-sm"
          >
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
  deletePhoto: (userId, id) => dispatch(deletePhoto(userId, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoEditor);

PhotoEditor.propTypes = {
  userId: PropTypes.number.isRequired,
  setMain: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
      isMain: PropTypes.bool,
    })
  ).isRequired,
};
