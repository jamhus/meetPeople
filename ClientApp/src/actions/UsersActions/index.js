import { toggleLoading } from "../LoadingActions";
import Cookies from "js-cookie";

export const fetchUsers = (users) => ({
  type: USERS_CONSTANTS.FETCH_USERS,
  users,
});

export const fetchUser = (user) => ({
  type: USERS_CONSTANTS.FETCH_USER,
  user,
});

export const clearUser = () => ({
  type: USERS_CONSTANTS.CLEAR_USER,
});

export const USERS_CONSTANTS = {
  FETCH_USER: "FETCH_USER",
  FETCH_USERS: "FETCH_USERS",
  CLEAR_USER: "CLEAR_USER",
};

export const getUsers = () => async (dispatch) => {
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
    const data = await fetch("/api/users", requestOptions).then((res) =>
      res.json()
    );
    dispatch(fetchUsers(data));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};

export const getUser = (id) => async (dispatch) => {
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
    const data = await fetch(`/api/users/${id}`, requestOptions).then((res) =>
      res.json()
    );
    dispatch(fetchUser(data));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};
