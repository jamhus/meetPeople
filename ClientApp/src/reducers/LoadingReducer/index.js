import { TOGGLE_LOADING_CONSTANTS } from "../../actions";

const defaultState = {
  loading: false,
};
const Loading = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING_CONSTANTS.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default Loading;
