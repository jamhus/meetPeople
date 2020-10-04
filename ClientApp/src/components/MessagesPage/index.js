import React, { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { PaginationBar } from "../common/PaginationBar";
import { Row, Col, Table, Button, ButtonGroup, Spinner } from "reactstrap";

import { getMessages, clearMessages, deleteMessage } from "../../actions";

import "./MessagesPage.css";

const Messages = ({
  userId,
  getMessages,
  clearMessages,
  messages,
  loading,
  history,
  paginationProps,
  deleteMessage,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [container, setContainer] = useState("Inbox");

  useEffect(() => {
    getMessages(userId, container, pageNumber, pageSize);

    return function cleanup() {
      clearMessages();
    };
  }, [userId, pageNumber, pageSize, container, getMessages, clearMessages]);

  const handleDeleteMessage = (messageId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="prompt-ui">
            <h3 className="prompt-header text-danger">Are you sure?</h3>
            <p className="prompt-content text-danger">
              You want to delete this message?
            </p>
            <ButtonGroup className="d-flex">
              <Button className="w-100 btn-primary" onClick={onClose}>
                No
              </Button>
              <Button
                className="w-100 btn-danger"
                onClick={() => {
                  deleteMessage(userId, messageId);
                  onClose();
                }}
              >
                Yes
              </Button>
            </ButtonGroup>
          </div>
        );
      },
    });
  };

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

  const navigateToUser = (id) => history.push(`/user/${id}/4`);

  const renderUserColumn = (name, picUrl) => (
    <div className="user-column">
      <img
        src={picUrl}
        alt={name}
        className="img mr-2 img-thumbnail rounded-circle user-thumbnail"
      />
      <span>{name}</span>
    </div>
  );

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
      <Table striped className="messages-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>
              {container === "Inbox" || container === "Unread" ? "From" : "To"}
            </th>
            <th>{container === "Inbox" ? "Recieved" : "Sent"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, i) => (
            <tr key={message.id}>
              <th
                className="message-content"
                onClick={() =>
                  navigateToUser(
                    container === "Inbox" || container === "Unread"
                      ? message.senderId
                      : message.recipientId
                  )
                }
                scope="row"
              >
                {message.content}
              </th>
              <td>
                {container === "Inbox" || container === "Unread"
                  ? renderUserColumn(
                      message.senderKnownAs,
                      message.senderPhotoUrl
                    )
                  : renderUserColumn(
                      message.recipientKnownAs,
                      message.recipientPhotoUrl
                    )}
              </td>
              <td>{moment(message.dateSent).fromNow()}</td>
              <td>
                <Button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="btn btn-delete btn-sm btn-danger"
                >
                  Delete
                </Button>
              </td>
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
  deleteMessage: PropTypes.func.isRequired,

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
  deleteMessage: (userId, messageId) =>
    dispatch(deleteMessage(userId, messageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
