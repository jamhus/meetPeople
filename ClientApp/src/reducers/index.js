import { combineReducers } from "redux";

import users from "./UsersReducer";
import toaster from "./ToasterReducer";
import loading from "./LoadingReducer";
import messages from "./MessageReducers";
import authentication from "./AuthenticationReducer";

export default combineReducers({
  users,
  toaster,
  loading,
  messages,
  authentication,
});
