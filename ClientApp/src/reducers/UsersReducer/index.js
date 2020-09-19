import { USERS_CONSTANTS } from "../../actions";

const defaultState = {
  usersList: [],
  userDetailed: {},
  paginationProps: {
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
};
const Authentication = (state = defaultState, action) => {
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
    default:
      return state;
  }
};

export default Authentication;
