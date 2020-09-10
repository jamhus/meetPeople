import { combineReducers } from "redux";
import values from "./ValuesReducer";
import loading from "./LoadingReducer";
import increment from "./IncrementReducer";
import authentication from "./AuthenticationReducer";

export default combineReducers({
  increment,
  values,
  loading,
  authentication,
});
