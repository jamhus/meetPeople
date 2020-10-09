import { USERS_CONSTANTS } from "../../actions";
import { SIGNALR_CONSTANTS } from "../../middlewares/signalRMiddleware";

const defaultState = {
  usersList: [],
  onlineUsers: [],
  userDetailed: {},
  paginationProps: {
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
};
const Users = (state = defaultState, action) => {
  switch (action.type) {
    case USERS_CONSTANTS.FETCH_USERS:
      return {
        ...state,
        usersList: [...action.usersResult.items],
        paginationProps: { ...action.usersResult.paginationProps },
      };
    case USERS_CONSTANTS.FETCH_USER:
      return {
        ...state,
        userDetailed: { ...action.user },
      };
    case USERS_CONSTANTS.CLEAR_USER:
      return {
        ...state,
        userDetailed: {},
      };
    case SIGNALR_CONSTANTS.SEND_USER_LIST:
      return {
        ...state,
        onlineUsers: [...action.onlineUsers],
      };

    case SIGNALR_CONSTANTS.USER_LOG_OUT:
      const list = state.onlineUsers.filter(
        (x) => x.connectionId !== action.connectionId
      );
      return {
        ...state,
        onlineUsers: [...list],
      };
    default:
      return state;
  }
};

export default Users;
