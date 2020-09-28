import Cookies from "js-cookie";
import { toggleLoading } from "../LoadingActions";

export const MESSAGE_CONSTANTS = {
  GET_MESSAGE_THREAD: "GET_MESSAGE_THREAD",
  GET_MESSAGES: "GET_MESSAGES",
  CLEAR_THREAD: "CLEAR_THREAD",
  CLEAR_MESSAGES: "CLEAR_MESSAGES",
};

export const fetctGetMessageThread = (thread) => ({
  type: MESSAGE_CONSTANTS.GET_MESSAGE_THREAD,
  thread,
});

export const fetctGetMessages = (messages) => ({
  type: MESSAGE_CONSTANTS.GET_MESSAGES,
  messages,
});

export const clearMessages = () => ({
  type: MESSAGE_CONSTANTS.CLEAR_MESSAGES,
});

export const clearThread = () => ({
  type: MESSAGE_CONSTANTS.CLEAR_THREAD,
});

export const getMessageThread = (userId, recipientId) => async (dispatch) => {
  dispatch(toggleLoading(true));

  var myHeaders = new Headers();

  const token = JSON.parse(Cookies.get("token"))["token"];

  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const data = await fetch(
      `/api/users/${userId}/messages/threads/${recipientId}`,
      requestOptions
    ).then((res) => res.json());

    dispatch(fetctGetMessageThread(data));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};

export const getMessages = (userId, container, pageNumber, pageSize) => async (
  dispatch
) => {
  dispatch(toggleLoading(true));

  var myHeaders = new Headers();

  const token = JSON.parse(Cookies.get("token"))["token"];

  myHeaders.append("Authorization", `Bearer ${token}`);
  let paginationProps = {};

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const data = await fetch(
      `/api/users/${userId}/messages?MessageContainer=${container}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      requestOptions
    ).then((res) => {
      paginationProps = JSON.parse(res.headers.get("Pagination"));
      return res.json();
    });

    const usersResult = {
      items: [...data],
      paginationProps,
    };
    dispatch(fetctGetMessages(usersResult));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};
