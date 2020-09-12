import { toggleLoading } from "../LoadingActions";
import Cookies from "js-cookie";

export const fetchValues = (values) => ({
  type: VALUES_CONSTANTS.FETCH_VALUES,
  values,
});

export const VALUES_CONSTANTS = {
  FETCH_VALUES: "FETCH_VALUES",
  GET_VALUES: "GET_VALUES",
};

export const getValues = () => async (dispatch) => {
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
    const data = await fetch("/api/values", requestOptions).then((res) =>
      res.json()
    );
    dispatch(fetchValues(data));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};
