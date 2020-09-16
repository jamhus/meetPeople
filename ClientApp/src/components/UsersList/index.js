import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions";

import { Row, Col, Spinner } from "reactstrap";
import { UserListCard } from "./UserListCard";

const UsersList = ({ users, loading, getUsers, history }) => {
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
      <>
        {" "}
        {users.map((user) => (
          <Col key={user.id} sm={6} md={3} lg={2}>
            <UserListCard user={user} history={history} />
          </Col>
        ))}{" "}
      </>
    );
  };

  return (
    <>
      <Row className="mt-5">{listOfUsers()}</Row>
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
  history: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.usersList,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
