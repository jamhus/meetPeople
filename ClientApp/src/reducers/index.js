import { combineReducers } from "redux";
import values from "./ValuesReducer";
import toaster from "./ToasterReducer";
import loading from "./LoadingReducer";
import increment from "./IncrementReducer";
import authentication from "./AuthenticationReducer";

export default combineReducers({
  values,
  toaster,
  loading,
  increment,
  authentication,
});
