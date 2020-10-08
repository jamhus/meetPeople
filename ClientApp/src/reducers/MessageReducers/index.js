import { MESSAGE_CONSTANTS, USERS_CONSTANTS } from "../../actions";

const defaultState = {
  currentMessageThread: "",
  messagesContainer: [],
  messageThread: [],
  paginationProps: {
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
};

const Messages = (state = defaultState, action) => {
  switch (action.type) {
    case MESSAGE_CONSTANTS.GET_MESSAGES:
      return {
        ...state,
        messagesContainer: [...action.messages.items],
        paginationProps: {
          ...action.messages.paginationProps,
        },
      };
    case MESSAGE_CONSTANTS.GET_MESSAGE_THREAD:
      return {
        ...state,
        messageThread: [...action.thread],
      };
    case MESSAGE_CONSTANTS.CLEAR_THREAD:
      return {
        ...state,
        messageThread: [],
      };
    case MESSAGE_CONSTANTS.CLEAR_MESSAGES:
      return {
        ...state,
        messagesContainer: [],
      };
    case MESSAGE_CONSTANTS.SEND_MESSAGE:
      return {
        ...state,
        messageThread: [action.message, ...state.messageThread],
      };

    case MESSAGE_CONSTANTS.RECIEVE_MESSAGE:
      if (state.currentMessageThread === action.message.senderId) {
        return {
          ...state,
          messageThread: [action.message, ...state.messageThread],
        };
      }
      return {
        ...state,
      };

    case MESSAGE_CONSTANTS.DELETE_MESSAGE:
      const messages = state.messagesContainer.filter(
        (x) => x.id !== action.messageId
      );
      return {
        ...state,
        messagesContainer: [...messages],
      };

    case USERS_CONSTANTS.FETCH_USER:
      return {
        ...state,
        currentMessageThread: action.user.id,
      };

    case USERS_CONSTANTS.CLEAR_USER:
      return {
        ...state,
        currentMessageThread: "",
      };

    default:
      return state;
  }
};

export default Messages;
