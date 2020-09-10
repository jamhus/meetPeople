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
