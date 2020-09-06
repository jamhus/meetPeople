import { connect } from "react-redux";
import React, { useEffect } from "react";
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
  }, []);

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
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to your new single-page application, built with:</p>
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
    </div>
  );
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
