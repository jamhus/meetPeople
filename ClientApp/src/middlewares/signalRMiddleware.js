import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

import {
  AUTHENICATION_CONSTANTS,
  MESSAGE_CONSTANTS,
  TOASTER_TYPE_CONSTANTS,
  openToaster,
  closeToaster,
} from "../actions";

export const SIGNALR_CONSTANTS = {
  SEND_USER_LIST: "SEND_USER_LIST",
  USER_LOG_OUT: "USER_LOG_OUT",
};

const startSignalRConnection = (connection, userId) =>
  connection
    .start()
    .then(() => {
      userId && connection.invoke("SayImLogedIn", userId);
    })
    .catch((err) => console.error("SignalR Connection Error: ", err));

const signalRMiddleware = ({ dispatch }) => (next) => async (action) => {
  // register signalR after the user logged in
  const url = `/chat`;

  const protocol = new JsonHubProtocol();

  // let transport to fall back to to LongPolling if it needs to
  const transport =
    HttpTransportType.WebSockets | HttpTransportType.LongPolling;

  const options = {
    transport,

    logger: LogLevel.Warning,
  };

  // create the connection instance
  const connection = new HubConnectionBuilder()
    .withUrl(url, options)
    .withHubProtocol(protocol)
    .build();

  // event handlers, you can use these to dispatch actions to update your Redux store
  connection.on("SendUserList", (onlineUsers) => {
    dispatch({
      type: SIGNALR_CONSTANTS.SEND_USER_LIST,
      onlineUsers,
    });
  });

  connection.on("SendMessageToUser", (message) => {
    dispatch({
      type: MESSAGE_CONSTANTS.RECIEVE_MESSAGE,
      message,
    });
  });

  connection.on("UserOffline", (connectionId) => {
    dispatch({
      type: SIGNALR_CONSTANTS.USER_LOG_OUT,
      connectionId,
    });
    connection.invoke("SayImLogedOut", connectionId);
  });

  connection.on("UserLiked", (user) => {
    dispatch(
      openToaster("Like!", `${user} liked you!`, TOASTER_TYPE_CONSTANTS.SUCCESS)
    );
    setTimeout(() => {
      dispatch(closeToaster());
    }, 5000);
  });

  // start after login
  if (action.type === AUTHENICATION_CONSTANTS.SET_USER) {
    const userId = action.user.id;
    startSignalRConnection(connection, userId);

    if (action.type === AUTHENICATION_CONSTANTS.LOGOUT) {
      console.log(connection);
    }
  }

  return next(action);
};

export default signalRMiddleware;
