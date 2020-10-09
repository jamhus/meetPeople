import { TOASTER_CONSTANTS } from "../../actions";

const defaultState = {
  type: "",
  isOpen: false,
  bodyMessage: "",
  headerMessage: "",
};

const toaster = (state = defaultState, action) => {
  switch (action.type) {
    case TOASTER_CONSTANTS.OPEN:
      return {
        ...state,
        isOpen: true,
        ...action.payload,
      };
    case TOASTER_CONSTANTS.CLOSE:
      return {
        ...state,
        isOpen: false,
        bodyMessage: "",
        headerMessage: "",
      };
    default:
      return state;
  }
};

export default toaster;
