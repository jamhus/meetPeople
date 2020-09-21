import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers, sendLike } from "../../actions";

import { Row, Col, Spinner } from "reactstrap";
import { UserListCard } from "./UserListCard";
import { PaginationBar } from "../common/PaginationBar";
import { FilteringBar } from "../common/FilteringBar";

const UsersList = ({
  users,
  userId,
  loading,
  getUsers,
  history,
  paginationProps,
  sendLike,
}) => {
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(99);
  const [gender, setGender] = useState("both");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [orderBy, setOrderBy] = useState("created");
  useEffect(() => {
    getUsers(pageNumber, pageSize, gender, minAge, maxAge, orderBy);
  }, [getUsers, pageNumber, pageSize, gender, minAge, maxAge, orderBy]);

  const handleLike = (recipient) => {
    return sendLike(userId, recipient);
  };

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
            <UserListCard
              handleLike={(recipient) => handleLike(recipient)}
              user={user}
              history={history}
            />
          </Col>
        ))}{" "}
      </>
    );
  };

  return (
    <>
      <FilteringBar
        gender={gender}
        minAge={minAge}
        maxAge={maxAge}
        orderBy={orderBy}
        setMinAge={(min) => setMinAge(min)}
        setMaxAge={(max) => setMaxAge(max)}
        setGender={(gender) => setGender(gender)}
        setOrderBy={(orderBy) => setOrderBy(orderBy)}
      />
      <Row className="mt-5">{listOfUsers()}</Row>
      <PaginationBar
        pageSize={pageSize}
        setPage={setPageNumber}
        setPageSize={(x) => setPageSize(x)}
        {...paginationProps}
      />
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
  userId: PropTypes.number.isRequired,
  getUsers: PropTypes.func.isRequired,
  sendLike: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.any.isRequired,
  paginationProps: PropTypes.shape({
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.authentication.user.id,
  users: state.users.usersList,
  loading: state.loading.loading,
  paginationProps: state.users.paginationProps,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (pageNumber, pageSize, gender, minAge, maxAge, orderBy) =>
      dispatch(getUsers(pageNumber, pageSize, gender, minAge, maxAge, orderBy)),

    sendLike: (userId, recipient) => dispatch(sendLike(userId, recipient)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
