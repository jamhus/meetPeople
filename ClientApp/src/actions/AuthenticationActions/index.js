import { toggleLoading } from "../LoadingActions";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const handleLogin = (username, password) => async (dispatch) => {
  dispatch(toggleLoading(true));

  try {
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
      .then((res) => res.json())
      .then((token) => {
        const claims = jwt_decode(token.token);
        if (claims.unique_name) {
          dispatch(setUser({ username: claims.unique_name }));
        }
        dispatch(toggleLoading(false));
        Cookies.set("token", token.token, { expires: claims.exp });
      });
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};

export const handleRegister = (username, password) => async (dispatch) => {
  dispatch(toggleLoading(true));

  let status;
  try {
    await fetch("/api/authentication/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      status = res.status;
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
