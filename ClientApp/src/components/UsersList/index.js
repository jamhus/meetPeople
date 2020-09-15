import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions";

import { Row, Col, Spinner, ListGroup, ListGroupItem } from "reactstrap";

const UsersList = ({ users, loading, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
      <Col>
        <ListGroup>
          {" "}
          {users.map((user) => (
            <ListGroupItem key={user.id}>{user.username}</ListGroupItem>
          ))}{" "}
        </ListGroup>
      </Col>
    );
  };

  return (
    <>
      <Row style={{ padding: ".5rem" }}>{listOfUsers()}</Row>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    })
  ).isRequired,
  getUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.usersList,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
