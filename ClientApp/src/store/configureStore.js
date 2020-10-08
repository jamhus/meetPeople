import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunkMiddelware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import signalRMiddleware from "../middlewares/signalRMiddleware";

import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

export default () => {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunkMiddelware, loggerMiddleware, signalRMiddleware)
    )
  );
};
