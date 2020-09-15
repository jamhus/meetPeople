import { combineReducers } from "redux";
import users from "./UsersReducer";
import toaster from "./ToasterReducer";
import loading from "./LoadingReducer";
import authentication from "./AuthenticationReducer";

export default combineReducers({
  users,
  toaster,
  loading,
  authentication,
});
