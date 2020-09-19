import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions";

import { Row, Col, Spinner } from "reactstrap";
import { UserListCard } from "./UserListCard";
import { PaginationBar } from "../common/PaginationBar";

const UsersList = ({ users, loading, getUsers, history, paginationProps }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    getUsers(pageNumber, pageSize);
  }, [getUsers, pageNumber, pageSize]);

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
  getUsers: PropTypes.func.isRequired,
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
  users: state.users.usersList,
  loading: state.loading.loading,
  paginationProps: state.users.paginationProps,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (pageNumber, pageSize) => dispatch(getUsers(pageNumber, pageSize)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
