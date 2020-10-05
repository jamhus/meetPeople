import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  faCheck,
  faPaperPlane,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendMessage } from "../../../actions";
import moment from "moment";

import "./Conversation.css";

import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Spinner,
  CardBody,
  InputGroup,
  CardFooter,
} from "reactstrap";
const Conversation = ({
  userId,
  recipientId,
  loading,
  thread,
  sendMessage,
}) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    const message = {
      recipientId,
      content,
    };
    return sendMessage(userId, message);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const renderConversation = () => {
    return loading ? (
      <Spinner
        style={{
          display: "flex",
          justifyContent: "center",
          width: "3rem",
          height: "3rem",
        }}
      />
    ) : (
      <Card>
        <CardBody>
          <ul className="chat">
            {thread.map((message) => (
              <li key={message.id}>
                {/* messages to them */}

                {message.senderId === userId && (
                  <div className="sent-message">
                    <span className="chat-img float-right ml-2">
                      <img
                        className="rounded-circle"
                        src={message.senderPhotoUrl}
                        alt={message.senderKnownAs}
                      />
                    </span>
                    <div className="chat-body">
                      <div className="header">
                        <strong className="primary-font float-right">
                          {message.senderKnownAs}
                        </strong>
                        <small className="text-muted float-left">
                          <FontAwesomeIcon icon={faPaperPlane} />{" "}
                          {moment(message.dateSent).fromNow()}
                        </small>
                      </div>
                      <p className="content">{message.content}</p>
                    </div>
                  </div>
                )}

                {/* messages to me */}

                {message.senderId === parseInt(recipientId) && (
                  <div className="sent-message">
                    <span className="chat-img float-left mr-2">
                      <img
                        className="rounded-circle"
                        src={message.senderPhotoUrl}
                        alt={message.senderKnownAs}
                      />
                    </span>
                    <div className="chat-body">
                      <div className="header">
                        <small className="text-muted float-right">
                          <FontAwesomeIcon icon={faEnvelope} />{" "}
                          {moment(message.dateSent).fromNow()}
                          {!message.isRead && (
                            <span className="mx-2 text-danger ml-1">
                              Unread
                            </span>
                          )}
                          {message.isRead && (
                            <span className="text-danger ml-1">
                              <FontAwesomeIcon icon={faCheck} />{" "}
                              {moment(message.dateRead).fromNow()}
                            </span>
                          )}
                        </small>
                        <strong className="primary-font">
                          {message.recipientKnownAs}
                        </strong>
                      </div>
                      <p className="content">{message.content}</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardBody>

        <CardFooter>
          <InputGroup>
            <Input
              onKeyDown={handleKeyDown}
              className="mr-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="send a private message"
            />
            <Button onClick={handleSendMessage} className="btn btn-primary">
              Send
            </Button>
          </InputGroup>
        </CardFooter>
      </Card>
    );
  };
  return (
    <Row>
      <Col sm={12}>{renderConversation()}</Col>
    </Row>
  );
};

Conversation.propTypes = {
  thread: PropTypes.arrayOf(
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
  userId: PropTypes.number.isRequired,
  recipientId: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  thread: state.messages.messageThread,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (userId, message) => dispatch(sendMessage(userId, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
