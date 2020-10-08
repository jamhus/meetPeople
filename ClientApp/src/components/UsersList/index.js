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
  onlineUsers,
}) => {
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(99);
  const [likers, setLikers] = useState(false);
  const [likees, setLikees] = useState(false);
  const [gender, setGender] = useState("both");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [orderBy, setOrderBy] = useState("created");
  useEffect(() => {
    getUsers(
      pageNumber,
      pageSize,
      gender,
      minAge,
      maxAge,
      orderBy,
      likers,
      likees
    );
  }, [
    getUsers,
    pageNumber,
    pageSize,
    gender,
    minAge,
    maxAge,
    orderBy,
    likers,
    likees,
  ]);

  const handleLike = (recipient) => {
    return sendLike(userId, recipient);
  };

  const SENDERS = {
    LIKEES: "LIKEES",
    LIKERS: "LIKERS",
    ALL: "ALL",
  };

  const handleToggleLikes = (sender) => {
    switch (sender) {
      case SENDERS.LIKERS:
        setLikees(false);
        setLikers(true);
        break;
      case SENDERS.LIKEES:
        setLikers(false);
        setLikees(true);
        break;
      default:
        setLikees(false);
        setLikers(false);
    }
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
        {users.map((user) => {
          const online = onlineUsers.find((x) => x.userId === user.id);
          return (
            <Col key={user.id} sm={6} md={3} lg={2}>
              <UserListCard
                handleLike={(recipient) => handleLike(recipient)}
                user={user}
                history={history}
                userOnline={online ? true : false}
              />
            </Col>
          );
        })}{" "}
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
        senders={SENDERS}
        likees={likees}
        likers={likers}
        setMinAge={(min) => setMinAge(min)}
        setMaxAge={(max) => setMaxAge(max)}
        setGender={(gender) => setGender(gender)}
        setOrderBy={(orderBy) => setOrderBy(orderBy)}
        handleToggleLikes={(sender) => handleToggleLikes(sender)}
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
  onlineUsers: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      connectionId: PropTypes.string,
    })
  ),
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

const mapStateToProps = (state) => {
  return {
    userId: state.authentication.user.id,
    users: state.users.usersList,
    loading: state.loading.loading,
    paginationProps: state.users.paginationProps,
    onlineUsers: state.users.onlineUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (
      pageNumber,
      pageSize,
      gender,
      minAge,
      maxAge,
      orderBy,
      likers,
      likees
    ) =>
      dispatch(
        getUsers(
          pageNumber,
          pageSize,
          gender,
          minAge,
          maxAge,
          orderBy,
          likers,
          likees
        )
      ),

    sendLike: (userId, recipient) => dispatch(sendLike(userId, recipient)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
