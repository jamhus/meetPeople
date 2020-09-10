import { AUTHENICATION_CONSTANTS } from "../../actions";

const defaultState = {
  user: {
    username: "",
    isLoggedIn: false,
  },
};
const Authentication = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENICATION_CONSTANTS.SET_USER:
      return {
        ...state,
        user: {
          username: action.user.username,
          isLoggedIn: true,
        },
      };
    case AUTHENICATION_CONSTANTS.LOGOUT:
      return {
        ...state,
        user: {
          username: "",
          isLoggedIn: false,
        },
      };
    default:
      return state;
  }
};

export default Authentication;
