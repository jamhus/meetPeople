import { toggleLoading } from "../LoadingActions";
import {
  openToaster,
  closeToaster,
  TOASTER_TYPE_CONSTANTS,
} from "../ToasterActions";
import Cookies from "js-cookie";

export const fetchUsers = (usersResult) => ({
  type: USERS_CONSTANTS.FETCH_USERS,
  usersResult,
});

export const fetchUser = (user) => ({
  type: USERS_CONSTANTS.FETCH_USER,
  user,
});

export const fetchProfile = (user) => ({
  type: USERS_CONSTANTS.FETCH_PROFILE,
  user,
});

export const clearUser = () => ({
  type: USERS_CONSTANTS.CLEAR_USER,
});

export const addPhoto = (photo) => ({
  type: USERS_CONSTANTS.ADD_USER_PHOTO,
  photo,
});
export const fetchDeletePhoto = (id) => ({
  type: USERS_CONSTANTS.DELETE_PHOTO,
  id,
});

export const setMainPhoto = (id) => ({
  type: USERS_CONSTANTS.SET_MAIN_PHOTO,
  id,
});

export const USERS_CONSTANTS = {
  FETCH_USER: "FETCH_USER",
  CLEAR_USER: "CLEAR_USER",
  FETCH_USERS: "FETCH_USERS",
  DELETE_PHOTO: "DELETE_PHOTO",
  FETCH_PROFILE: "FETCH_PROFILE",
  ADD_USER_PHOTO: "ADD_USER_PHOTO",
  SET_MAIN_PHOTO: "SET_MAIN_PHOTO",
};

export const getUsers = (pageNumber, pageSize, gender) => async (dispatch) => {
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
    dispatch(toggleLoading(true));

    const data = await fetch(
      `/api/users?pageNumber=${pageNumber}&pageSize=${pageSize}&gender=${gender}`,
      requestOptions
    ).then((res) => {
      paginationProps = JSON.parse(res.headers.get("Pagination"));
      return res.json();
    });
    const usersResult = {
      items: [...data],
      paginationProps,
    };

    dispatch(fetchUsers(usersResult));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};

export const getUser = (id) => async (dispatch) => {
  var myHeaders = new Headers();
  const token = JSON.parse(Cookies.get("token"))["token"];
  myHeaders.append("Authorization", `Bearer ${token}`);
  let user;
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    dispatch(toggleLoading(true));

    const data = await fetch(`/api/users/${id}`, requestOptions).then((res) =>
      res.json()
    );
    dispatch(fetchUser(data));
    user = data;
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
  return user;
};

export const updateUser = (id, userObj) => async (dispatch) => {
  dispatch(fetchProfile(userObj));

  var myHeaders = new Headers();
  const token = JSON.parse(Cookies.get("token"))["token"];
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify(userObj);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body,
    redirect: "follow",
  };

  try {
    dispatch(toggleLoading(true));

    await fetch(`/api/users/${id}`, requestOptions);
    dispatch(getUsers());
    dispatch(
      openToaster(
        "Updated successfully!",
        "User has been updated",
        TOASTER_TYPE_CONSTANTS.SUCCESS
      )
    );
    setTimeout(() => {
      dispatch(closeToaster());
    }, 5000);
  } catch (error) {
    dispatch(
      openToaster(
        "Update failed!",
        "Errors while updating user",
        TOASTER_TYPE_CONSTANTS.DANGER
      )
    );
    setTimeout(() => {
      dispatch(closeToaster());
    }, 5000);
  }
  dispatch(toggleLoading(false));
};

export const uploadPhoto = (id, file) => async (dispatch) => {
  var myHeaders = new Headers();
  const token = JSON.parse(Cookies.get("token"))["token"];
  myHeaders.append("Authorization", `Bearer ${token}`);
  var formdata = new FormData();
  formdata.append("File", file, "file");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    dispatch(toggleLoading(true));
    await fetch(`/api/Users/${id}/photos`, requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch(addPhoto(result)))
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};

export const deletePhoto = (userId, id) => async (dispatch) => {
  dispatch(fetchDeletePhoto(id));

  var myHeaders = new Headers();
  const token = JSON.parse(Cookies.get("token"))["token"];
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    dispatch(toggleLoading(true));
    await fetch(`/api/Users/${userId}/photos/${id}`, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};

export const setMain = (userId, id) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(setMainPhoto(id));

  var myHeaders = new Headers();
  const token = JSON.parse(Cookies.get("token"))["token"];
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    await fetch(`/api/Users/${userId}/photos/${id}/setMain`, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};
