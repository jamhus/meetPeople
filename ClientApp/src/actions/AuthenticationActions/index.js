import {
  openToaster,
  closeToaster,
  TOASTER_TYPE_CONSTANTS,
} from "../ToasterActions";
import Cookies from "js-cookie";
import { toggleLoading } from "../LoadingActions";
import jwt_decode from "jwt-decode";

export const getCurrentUser = (id) => async (dispatch) => {
  dispatch(toggleLoading(true));

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
    const data = await fetch(`/api/users/${id}`, requestOptions).then((res) =>
      res.json()
    );
    dispatch(setUser({ ...data }));
    user = data;
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
  return user;
};

export const handleLogout = () => async (dispatch, getState) => {
  dispatch(toggleLoading(true));

  const store = getState();
  const currentUserId = store.authentication.user.id;
  const connectionId = store.users.onlineUsers.find(
    (x) => x.userId === currentUserId
  ).connectionId;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    await fetch(`/api/authentication/logout/${connectionId}`, requestOptions);
  } catch (error) {
    console.log(error);
  }
  dispatch(setLogout());
  dispatch(toggleLoading(false));
};

export const handleLogin = (username, password) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true));

    await fetch("/api/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => ({ obj: res.json(), status: res.status }))
      .then((data) => {
        if (data.status === 200) {
          data.obj.then((userToken) => {
            const claims = jwt_decode(userToken["token"]);
            Cookies.set("token", userToken, { expires: claims.exp });
            if (claims.unique_name) {
              dispatch(getCurrentUser(claims.nameid));
            }
            dispatch(toggleLoading(false));
            dispatch(
              openToaster(
                "Login successed!",
                `Welcome ${username}`,
                TOASTER_TYPE_CONSTANTS.SUCCESS
              )
            );
            setTimeout(() => {
              dispatch(closeToaster());
            }, 5000);
          });
        } else {
          dispatch(
            openToaster(
              "Error while login",
              "Username or password are not correct",
              TOASTER_TYPE_CONSTANTS.DANGER
            )
          );
          setTimeout(() => {
            dispatch(closeToaster());
          }, 5000);
        }
      });
  } catch (error) {
    console.error({ error });
  }
  dispatch(toggleLoading(false));
};

export const handleRegister = (
  username,
  password,
  city,
  country,
  dateOfBirth,
  gender
) => async (dispatch) => {
  dispatch(toggleLoading(true));

  let status;
  let errorMessage = " ";
  try {
    await fetch("/api/authentication/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        city,
        country,
        dateOfBirth,
        gender,
      }),
    }).then((res) => {
      status = res.status;
      if (status === 201) {
        dispatch(
          openToaster(
            "Registered successfully!",
            "Your account has been registered!",
            TOASTER_TYPE_CONSTANTS.SUCCESS
          )
        );
        setTimeout(() => {
          dispatch(closeToaster());
        }, 5000);
      } else {
        if (res.headers.get("Application-Error")) {
          errorMessage = res.headers.get("Application-Error");

          dispatch(
            openToaster(
              "Registered Failed!",
              errorMessage,
              TOASTER_TYPE_CONSTANTS.DANGER
            )
          );
        }
        res.json().then((data) => {
          const errorList = Object.values(data.errors).map(
            (errorArr) => errorArr[errorArr.length - 1]
          );
          errorList.map((err) => (errorMessage = errorMessage + " " + err));
          dispatch(
            openToaster(
              "Registered Failed!",
              errorMessage,
              TOASTER_TYPE_CONSTANTS.DANGER
            )
          );
        });

        dispatch(
          openToaster(
            "Registered Failed!",
            errorMessage,
            TOASTER_TYPE_CONSTANTS.DANGER
          )
        );
        setTimeout(() => {
          dispatch(closeToaster());
        }, 5000);
      }
    });
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
  return status;
};

export const setUser = (user) => ({
  type: AUTHENICATION_CONSTANTS.SET_USER,
  user,
});

export const setLogout = () => ({
  type: AUTHENICATION_CONSTANTS.LOGOUT,
});

export const AUTHENICATION_CONSTANTS = {
  SET_USER: "SET_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};
