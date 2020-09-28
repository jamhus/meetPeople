import React, { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PaginationBar } from "../common/PaginationBar";
import { Row, Col, Table, Button, ButtonGroup, Spinner } from "reactstrap";

import { getMessages, clearMessages } from "../../actions";

const Messages = ({
  userId,
  getMessages,
  clearMessages,
  messages,
  loading,
  history,
  paginationProps,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [container, setContainer] = useState("Inbox");

  useEffect(() => {
    getMessages(userId, container, pageNumber, pageSize);

    return function cleanup() {
      clearMessages();
    };
  }, [userId, pageNumber, pageSize, container]);

  const renderMessagesFilters = () => {
    return (
      <ButtonGroup className="d-flex">
        <Button
          disabled={container === "Unread"}
          onClick={() => setContainer("Unread")}
          className="btn-sm w-100 btn-primary"
        >
          Unread
        </Button>
        <Button
          disabled={container === "Inbox"}
          onClick={() => setContainer("Inbox")}
          className="btn-sm w-100 btn-primary"
        >
          Inbox
        </Button>
        <Button
          disabled={container === "Outbox"}
          onClick={() => setContainer("Outbox")}
          className="btn-sm w-100 btn-primary"
        >
          Outbox
        </Button>
      </ButtonGroup>
    );
  };

  const renderTable = () => {
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
      <Table striped>
        <thead>
          <tr>
            <th>Message</th>
            <th>
              {container === "Inbox" || container === "Unread" ? "From" : "To"}
            </th>
            <th>{container === "Inbox" ? "Recieved" : "Sent"}</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, i) => (
            <tr key={message.id}>
              <th scope="row">{message.content}</th>
              <td>
                {container === "Inbox" || container === "Unread"
                  ? message.senderKnownAs
                  : message.recipientKnownAs}
              </td>
              <td>{moment(message.dateSent).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <Row>
        <Col sm={12} md={4}>
          {renderMessagesFilters()}
        </Col>
      </Row>
      <Row className="mt-5">{renderTable()}</Row>
      <PaginationBar
        pageSize={pageSize}
        setPage={setPageNumber}
        setPageSize={(x) => setPageSize(x)}
        {...paginationProps}
      />
    </>
  );
};

Messages.propTypes = {
  userId: PropTypes.number.isRequired,

  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      senderId: PropTypes.number,
      senderKnownAs: PropTypes.string,
      senderPhotoUrl: PropTypes.string,
      recipientId: PropTypes.number,
      recipientPhotoUrl: PropTypes.string,
      recipientKnownAs: PropTypes.string,
      content: PropTypes.string,
      isRead: PropTypes.bool,
      dateRead: PropTypes.oneOf([PropTypes.string, null]),
      dateSent: PropTypes.string,
    })
  ).isRequired,

  loading: PropTypes.bool.isRequired,
  history: PropTypes.any.isRequired,
  getMessages: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,

  paginationProps: PropTypes.shape({
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  userId: state.authentication.user.id,
  messages: state.messages.messagesContainer,
  paginationProps: state.messages.paginationProps,
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: (userId, container, pageNumber, pageSize) =>
    dispatch(getMessages(userId, container, pageNumber, pageSize)),
  clearMessages: () => dispatch(clearMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
