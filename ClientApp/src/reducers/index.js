import { combineReducers } from "redux";
import increment from "./IncrementReducer";
import values from "./ValuesReducer";

export default combineReducers({
  increment,
  values,
});
