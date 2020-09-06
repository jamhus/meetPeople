import { combineReducers } from "redux";
import increment from "./IncrementReducer";
import values from "./ValuesReducer";
import loading from "./LoadingReducer";

export default combineReducers({
  increment,
  values,
  loading,
});
