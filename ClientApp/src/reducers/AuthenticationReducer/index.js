import { AUTHENICATION_CONSTANTS } from "../../actions";

const defaultState = {
  user: {
    id: "",
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
          isLoggedIn: true,
          ...action.user,
        },
      };
    case AUTHENICATION_CONSTANTS.LOGOUT:
      return {
        ...state,
        user: {
          id: "",
          username: "",
          isLoggedIn: false,
        },
      };
    default:
      return state;
  }
};

export default Authentication;
