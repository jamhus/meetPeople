import { VALUES_CONSTANTS } from "../../actions";

const defaultState = {
  values: [],
};
const Values = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case VALUES_CONSTANTS.FETCH_VALUES:
      return {
        ...state,
        values: [...action.values],
      };
    default:
      return state;
  }
};

export default Values;
