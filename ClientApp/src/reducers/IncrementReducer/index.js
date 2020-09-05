import { INCREMENT_CONSTANTS } from "../../actions";

const defaultState = {
  count: 0,
};
const Increment = (state = defaultState, action) => {
  switch (action.type) {
    case INCREMENT_CONSTANTS.INCREMENT:
      return {
        ...state,
        count: state.count + action.inc,
      };
    default:
      return state;
  }
};

export default Increment;
