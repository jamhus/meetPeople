import { MESSAGE_CONSTANTS } from "../../actions";

const defaultState = {
  messagesContainer: [],
  messageThread: [],
  paginationProps: {
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
};

const toaster = (state = defaultState, action) => {
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
    default:
      return state;
  }
};

export default toaster;