import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { incrementWith, getValues } from "../actions";

import {
  Button,
  Spinner,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";

const Home = ({ count, values, onClick, getValues, loading }) => {
  useEffect(() => {
    getValues();
  }, [getValues]);

  const listOfValues = () => {
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
      <Col>
        <ListGroup>
          {" "}
          {values.map((value) => (
            <ListGroupItem key={value.id}>{value.name}</ListGroupItem>
          ))}{" "}
        </ListGroup>
      </Col>
    );
  };

  return (
    <>
      <Row style={{ padding: ".5rem" }}>
        <Col>
          <ListGroup>
            <ListGroupItem>
              <Button onClick={(e) => onClick(5)}>Add 5</Button>
            </ListGroupItem>
            <ListGroupItem>{count}</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <Row style={{ padding: ".5rem" }}>{listOfValues()}</Row>
    </>
  );
};

Home.propTypes = {
  count: PropTypes.number,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
  getValues: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  count: state.increment.count,
  values: state.values.values,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (inc) => dispatch(incrementWith(inc)),
  getValues: () => dispatch(getValues()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
